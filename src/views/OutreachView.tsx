import React, { useState } from 'react';
import {
  Send,
  FileText,
  ShieldCheck,
  Eye,
  RefreshCw,
  Users,
  Mail,
  Paperclip,
  Lock,
  Check,
  X,
  Sparkles,
  Sliders
} from 'lucide-react';
import { Lead, SentEmailLog } from '../types';
import { PageHero } from '../components/ui/PageHero';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

interface OutreachViewProps {
  leads: Lead[];
  onUpdateLeads: (leads: Lead[]) => void;
  onAddEmailLogs: (logs: SentEmailLog[]) => void;
  onOpenCatalog: () => void;
  initialLead?: Lead | null;
}

export const OutreachView: React.FC<OutreachViewProps> = ({
  leads,
  onUpdateLeads,
  onAddEmailLogs,
  onOpenCatalog,
  initialLead
}) => {
  const candidateLeads = leads.filter(l => !l.isDuplicate && l.emailStatus === 'Valid');

  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>(() => {
    if (initialLead && initialLead.emailStatus === 'Valid') return [initialLead.id];
    return candidateLeads
      .filter(l => l.aiClassification === 'B2B Business Buyer' && l.outreachStatus === 'Not Contacted')
      .slice(0, 3)
      .map(l => l.id);
  });

  const [dailyThrottle, setDailyThrottle] = useState<number>(35);
  const [randomDelay, setRandomDelay] = useState<boolean>(true);
  const [excludeContacted, setExcludeContacted] = useState<boolean>(true);

  const [subjectTemplate, setSubjectTemplate] = useState(
    'Direct Jaipur Exporter Pitch: Handcrafted 7-Metal Singing Bowls for {{Company_Name}}'
  );
  const [bodyTemplate, setBodyTemplate] = useState(
    `Dear {{Buyer_Name}},

I hope you are having an inspired week in {{City}}.

I am writing directly from our master metalsmith guild in Jaipur & Moradabad, India. We hand-forge sacred 7-metal Tibetan Singing Bowls (HTS 9206.00) tuned to 432Hz Solfeggio frequencies for acoustic healing sanctuaries, sound bath instructors, and premier US wellness boutiques.

We noticed {{Company_Name}}'s dedication to high-vibrational wellness instruments. By sourcing directly from our artisan collective:
• Genuine 7-Metal Bronze Formulation (71% Copper, 28% Tin + Sacred Planetary Metals)
• Tested 45+ second acoustic sustain & chakra tuning
• Direct Exporter FOB Nhava Sheva & DDP Port of Houston / LA pricing (MOQ only 25 units)
• Full Certificate of Origin and duty-free/low MFN US customs clearance

Attached to this email is our complete 2026 Export Collection Presentation Deck:
📄 [India_Handcrafted_Singing_Bowls_Catalog_2026.pdf - 4.2 MB]

Would you be open to a brief 5-minute introductory call or receiving a complimentary sample master bowl shipped to {{City}}?

Warm regards from Rajasthan,

Rameshwar Sharma
Direct Export Mediation Desk
Jaipur Handcrafted Guild LLP
WhatsApp / Cell: +91 98290 41188
export@jaipurcrafts-india.com`
  );

  const [previewRecipientId, setPreviewRecipientId] = useState<string>(
    selectedLeadIds[0] || (candidateLeads[0]?.id ?? '')
  );
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);

  const [isSending, setIsSending] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);
  const [sentNotice, setSentNotice] = useState<string | null>(null);

  const toggleSelectLead = (id: string) => {
    if (selectedLeadIds.includes(id)) {
      setSelectedLeadIds(selectedLeadIds.filter(item => item !== id));
    } else {
      setSelectedLeadIds([...selectedLeadIds, id]);
    }
  };

  const handleSelectAll = () => {
    const ids = candidateLeads
      .filter(l => !excludeContacted || l.outreachStatus === 'Not Contacted')
      .map(l => l.id);
    setSelectedLeadIds(ids);
  };

  const handleDeselectAll = () => {
    setSelectedLeadIds([]);
  };

  const renderPersonalized = (template: string, lead?: Lead) => {
    if (!lead) return template;
    return template
      .replace(/{{Buyer_Name}}/g, lead.contactName || 'Procurement Team')
      .replace(/{{Company_Name}}/g, lead.companyName)
      .replace(/{{City}}/g, lead.city)
      .replace(/{{Product_Category}}/g, lead.category)
      .replace(/{{Custom_Hook}}/g, lead.aiReasoning.slice(0, 100));
  };

  const activePreviewLead = candidateLeads.find(l => l.id === previewRecipientId) || candidateLeads[0];

  const handleSendCampaign = () => {
    if (selectedLeadIds.length === 0) {
      alert('Please select at least one recipient lead to send the campaign.');
      return;
    }

    setIsSending(true);
    setSendProgress(15);

    setTimeout(() => {
      setSendProgress(50);
    }, 1200);

    setTimeout(() => {
      setSendProgress(85);
    }, 2400);

    setTimeout(() => {
      setSendProgress(100);
      setIsSending(false);

      const newLogs: SentEmailLog[] = selectedLeadIds.map((id, index) => {
        const lead = leads.find(l => l.id === id);
        return {
          id: `email-log-${Date.now()}-${index}`,
          leadId: id,
          recipientEmail: lead?.email || 'buyer@example.com',
          recipientName: lead?.contactName || 'Buyer',
          companyName: lead?.companyName || 'US Buyer',
          subject: renderPersonalized(subjectTemplate, lead),
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }),
          pdfAttached: true,
          pdfName: 'India_Handcrafted_Singing_Bowls_Catalog_2026.pdf',
          deliveryStatus: 'Sent',
          openCount: 0
        };
      });

      const updatedLeads = leads.map(l => {
        if (selectedLeadIds.includes(l.id)) {
          return {
            ...l,
            outreachStatus: 'Sent' as const,
            lastContactedAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
          };
        }
        return l;
      });

      onUpdateLeads(updatedLeads);
      onAddEmailLogs(newLogs);
      setSentNotice(`Success! Dispatched ${selectedLeadIds.length} personalized export pitches via Gmail API with 2026 Catalog attached.`);
      setSelectedLeadIds([]);

      setTimeout(() => setSentNotice(null), 5000);
    }, 3500);
  };

  const insertToken = (token: string) => {
    setBodyTemplate(prev => prev + ` ${token}`);
  };

  return (
    <div className="space-y-12 sm:space-y-16 animate-in fade-in duration-300">

      {/* Toast Alert */}
      {sentNotice && (
        <div className="fixed bottom-8 right-8 z-50 rounded-2xl bg-[#0E0E12] border border-[#34D399]/40 p-5 text-[15px] text-[#F5F5F7] shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-3">
          <Check className="h-5 w-5 text-[#34D399] shrink-0" />
          <span>{sentNotice}</span>
        </div>
      )}

      {/* 1. PAGE HERO */}
      <PageHero
        eyebrow="Deliverability & Outreach Engine // Gmail API"
        eyebrowIcon={<Mail className="h-4 w-4 text-[#F59E0B]" />}
        title="Automated Gmail Outreach & Catalog Pitch"
        gradientWord="Outreach"
        description="Personalize and dispatch wholesale export proposals to verified US showrooms, backed by automated anti-spam jitter delays, daily rate throttle limits, and deck attachments."
        actions={
          <div className="flex items-center gap-3">
            <div className="h-11 px-4 rounded-full bg-[#0E0E12] border border-white/10 flex items-center gap-2.5 text-[14px] font-mono text-[#A1A1AA]">
              <span className="h-2 w-2 rounded-full bg-[#34D399]" />
              <span>export@jaipurcrafts-india.com</span>
            </div>
          </div>
        }
      />

      {/* 2. SPLIT VIEW: RECIPIENTS (40%) + COMPOSER (60%) WITH 32PX GUTTER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT COLUMN: RECIPIENT SELECTION (40% ~ 5 COLS) */}
        <div className="lg:col-span-5">
          <Card padding="lg" className="h-full flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
                <div>
                  <h3 className="text-[18px] font-bold text-[#F5F5F7] flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#F59E0B]" />
                    Select Target Buyers
                  </h3>
                  <p className="text-[13px] text-[#A1A1AA] mt-0.5">
                    Pre-filtered to deliverable B2B showrooms
                  </p>
                </div>
                <span className="rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 px-3 py-1 text-[13px] font-mono font-bold text-[#F59E0B]">
                  {selectedLeadIds.length} Selected
                </span>
              </div>

              {/* Quick Select Buttons */}
              <div className="flex items-center justify-between text-[14px] mb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSelectAll}
                    className="text-[#F59E0B] hover:underline font-medium text-[13px]"
                  >
                    Select All Uncontacted ({candidateLeads.filter(l => l.outreachStatus === 'Not Contacted').length})
                  </button>
                  <span className="text-[#6B6B75]">•</span>
                  <button
                    onClick={handleDeselectAll}
                    className="text-[#A1A1AA] hover:underline text-[13px]"
                  >
                    Clear All
                  </button>
                </div>
                <span className="text-[13px] text-[#6B6B75] font-mono">
                  {candidateLeads.length} Clean
                </span>
              </div>

              {/* Candidate List */}
              <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                {candidateLeads.map((lead) => {
                  const isSelected = selectedLeadIds.includes(lead.id);
                  const isContacted = lead.outreachStatus !== 'Not Contacted';

                  return (
                    <div
                      key={lead.id}
                      onClick={() => {
                        toggleSelectLead(lead.id);
                        setPreviewRecipientId(lead.id);
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${isSelected
                          ? 'bg-[#F59E0B]/15 border-[#F59E0B]/40 shadow-md'
                          : 'bg-[#0E0E12] border-white/10 hover:bg-[#15151A]'
                        }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => { }}
                          className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-[#F59E0B] focus:ring-0 cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-[15px] font-bold text-[#F5F5F7] truncate">
                              {lead.companyName}
                            </h4>
                            <span className="text-[13px] font-mono text-[#A1A1AA] shrink-0">
                              {lead.city}, {lead.state}
                            </span>
                          </div>
                          <p className="text-[13px] text-[#A1A1AA] mt-0.5 truncate">
                            {lead.contactName} ({lead.title})
                          </p>
                          <div className="mt-1.5 flex items-center justify-between text-[13px] font-mono">
                            <span className="text-[#6B6B75] truncate">{lead.email}</span>
                            {isContacted && (
                              <span className="text-[#A5B4FC] font-semibold bg-[#6366F1]/15 px-2 py-0.5 rounded text-[11px]">
                                {lead.outreachStatus}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Exclude Toggle */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-[14px] text-[#A1A1AA]">
              <span className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-[#34D399]" />
                Auto-exclude previously pitched leads
              </span>
              <input
                type="checkbox"
                checked={excludeContacted}
                onChange={(e) => setExcludeContacted(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-[#F59E0B] focus:ring-0 cursor-pointer"
              />
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: COMPOSER (60% ~ 7 COLS) */}
        <div className="lg:col-span-7">
          <Card padding="lg" className="space-y-6">

            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#F59E0B]/12 text-[#F59E0B]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-[#F5F5F7]">Campaign Pitch Composer</h3>
                  <p className="text-[13px] text-[#A1A1AA]">Supports dynamic buyer personalization tokens</p>
                </div>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowPreviewModal(true)}
                icon={<Eye className="h-4 w-4 text-[#A5B4FC]" />}
              >
                Live Preview
              </Button>
            </div>

            {/* Variable Tokens Toolbar */}
            <div className="space-y-2">
              <label className="block text-[13px] font-mono uppercase tracking-eyebrow text-[#A1A1AA] font-semibold">
                Insert Personalization Tokens
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { token: '{{Buyer_Name}}', desc: 'Buyer Full Name' },
                  { token: '{{Company_Name}}', desc: 'Showroom / Entity' },
                  { token: '{{City}}', desc: 'US City' },
                  { token: '{{Product_Category}}', desc: 'Category' },
                  { token: '{{Custom_Hook}}', desc: 'AI Custom Sourcing Hook' },
                ].map((item) => (
                  <button
                    key={item.token}
                    type="button"
                    onClick={() => insertToken(item.token)}
                    className="h-9 px-3.5 rounded-lg bg-[#0E0E12] hover:bg-[#15151A] border border-white/10 text-[13px] font-mono text-[#F59E0B] hover:text-[#FBBF24] transition-colors"
                  >
                    {item.token}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Line */}
            <div className="space-y-2">
              <label className="block text-[13px] font-mono uppercase tracking-eyebrow text-[#A1A1AA] font-semibold">
                Subject Line
              </label>
              <input
                type="text"
                value={subjectTemplate}
                onChange={(e) => setSubjectTemplate(e.target.value)}
                className="w-full h-[52px] rounded-control bg-[#0E0E12] border border-white/10 px-5 text-[15px] font-medium text-[#F5F5F7] focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/30"
              />
            </div>

            {/* Body Editor: 16px font */}
            <div className="space-y-2">
              <label className="block text-[13px] font-mono uppercase tracking-eyebrow text-[#A1A1AA] font-semibold">
                Email Pitch Copy
              </label>
              <textarea
                rows={10}
                value={bodyTemplate}
                onChange={(e) => setBodyTemplate(e.target.value)}
                className="w-full rounded-2xl bg-[#0E0E12] border border-white/10 p-5 text-[15px] sm:text-[16px] text-[#F5F5F7] focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/30 font-mono leading-[1.8] resize-none"
              />
            </div>

            {/* Product Presentation PDF Attachment Card (24px padding) */}
            <div className="p-6 rounded-2xl bg-[#0E0E12] border border-[#F59E0B]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B]">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <p className="text-[16px] font-bold font-mono text-[#F5F5F7]">
                      India_Handcrafted_Singing_Bowls_Catalog_2026.pdf
                    </p>
                    <span className="rounded-full bg-[#F59E0B]/15 px-3 py-0.5 text-[12px] font-mono text-[#F59E0B] font-bold">
                      Attached • 4.2 MB
                    </span>
                  </div>
                  <p className="text-[14px] text-[#A1A1AA] mt-1">
                    Includes 7-metal specs, 432Hz Solfeggio charts, wholesale FOB prices & US HTS 9206 codes.
                  </p>
                </div>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={onOpenCatalog}
                className="shrink-0"
              >
                Preview Deck
              </Button>
            </div>

            {/* DELIVERABILITY PANEL WITH CIRCULAR SCORE */}
            <div className="p-6 rounded-2xl bg-[#0E0E12] border border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-[#34D399]" />
                  <div>
                    <h4 className="text-[16px] font-bold text-[#F5F5F7]">
                      Anti-Spam & Deliverability Guardrails
                    </h4>
                    <p className="text-[13px] text-[#A1A1AA]">
                      Safeguarding your domain reputation on Google Workspace
                    </p>
                  </div>
                </div>

                {/* Big Circular Score */}
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#34D399]/12 border border-[#34D399]/30">
                  <span className="text-[18px] font-mono font-extrabold text-[#34D399]">98/100</span>
                  <span className="text-[13px] font-medium text-[#34D399]">Safe</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between text-[14px] text-[#A1A1AA] mb-2 font-mono">
                    <span>Daily Sending Throttle:</span>
                    <strong className="text-[#F5F5F7]">{dailyThrottle} / day</strong>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={60}
                    value={dailyThrottle}
                    onChange={(e) => setDailyThrottle(Number(e.target.value))}
                    className="w-full accent-[#F59E0B] cursor-pointer"
                  />
                  <p className="text-[13px] text-[#6B6B75] mt-1">Warm-up rate safe limit</p>
                </div>

                <div>
                  <div className="flex justify-between text-[14px] text-[#A1A1AA] mb-2 font-mono">
                    <span>Randomized Delay Interval:</span>
                    <strong className="text-[#34D399]">45s – 90s</strong>
                  </div>
                  <label className="flex items-center gap-2.5 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={randomDelay}
                      onChange={(e) => setRandomDelay(e.target.checked)}
                      className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-[#F59E0B]"
                    />
                    <span className="text-[14px] text-[#F5F5F7]">Human-simulated jitter sending</span>
                  </label>
                </div>
              </div>
            </div>

            {/* SEND BUTTON */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-[15px] text-[#A1A1AA]">
                Ready to dispatch to <strong className="text-[#F5F5F7] font-mono">{selectedLeadIds.length}</strong> selected buyers.
              </p>

              <Button
                variant="primary"
                size="lg"
                onClick={handleSendCampaign}
                disabled={isSending || selectedLeadIds.length === 0}
                icon={isSending ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              >
                {isSending ? `Dispatching (${sendProgress}%)...` : 'Send Campaign via Gmail API'}
              </Button>
            </div>

          </Card>
        </div>

      </div>

      {/* RENDERED PREVIEW MODAL */}
      {showPreviewModal && activePreviewLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative flex flex-col w-full max-w-3xl max-h-[85vh] rounded-card bg-[#0E0E12] border border-white/15 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-[#F59E0B]" />
                <h3 className="text-[18px] font-bold text-[#F5F5F7]">
                  Rendered Email Pitch for {activePreviewLead.companyName}
                </h3>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-2 rounded-xl text-[#A1A1AA] hover:text-white hover:bg-white/[0.06]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#07070A]">
              <div className="p-4 rounded-xl bg-[#0E0E12] text-[14px] font-mono space-y-1.5">
                <p><span className="text-[#6B6B75]">From:</span> export@jaipurcrafts-india.com</p>
                <p><span className="text-[#6B6B75]">To:</span> {activePreviewLead.email} ({activePreviewLead.contactName})</p>
                <p><span className="text-[#6B6B75]">Subject:</span> <strong className="text-[#F59E0B]">{renderPersonalized(subjectTemplate, activePreviewLead)}</strong></p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0E0E12] border border-white/10 text-[15px] text-[#F5F5F7] font-mono whitespace-pre-wrap leading-[1.8]">
                {renderPersonalized(bodyTemplate, activePreviewLead)}
              </div>
            </div>

            <div className="flex items-center justify-end p-6 border-t border-white/[0.08] bg-[#0E0E12]">
              <Button
                variant="secondary"
                size="md"
                onClick={() => setShowPreviewModal(false)}
              >
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
