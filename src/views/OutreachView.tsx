import React, { useState } from 'react';
import { 
  Send, 
  FileText, 
  ShieldCheck, 
  Eye, 
  RefreshCw, 
  Users, 
  Mail, 
  Lock, 
  Check, 
  X 
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
    'Direct Wholesale Jaipur Exporter: Handcrafted 7-Metal Singing Bowls for {{Company_Name}}'
  );
  const [bodyTemplate, setBodyTemplate] = useState(
`Dear {{Buyer_Name}},

I am reaching out directly from our metalsmith artisan collective in Jaipur, India. We hand-forge certified 7-metal Tibetan Singing Bowls (HTS 9206.00) tuned to 432Hz Solfeggio frequencies for acoustic healing and wellness showrooms.

Key export parameters for {{Company_Name}}:
• 7-Metal Bronze (71.5% Copper, 27.8% Tin + planetary metals)
• 45+ second acoustic sustain with chakra tuning
• Direct Exporter FOB Nhava Sheva & DDP Houston / LA pricing (MOQ 25 units)
• Full Certificate of Origin and duty-free/low MFN customs clearance

Attached is our 2026 Collection Deck:
[Singing_Bowls_Catalog_2026.pdf - 4.2 MB]

Would you be open to receiving a complimentary master bowl sample shipped to {{City}}?

Best regards,

Rameshwar Sharma
Direct Export Mediation Desk
Jaipur Handcrafted Guild LLP
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
      .replace(/{{Custom_Hook}}/g, lead.aiReasoning.slice(0, 80));
  };

  const activePreviewLead = candidateLeads.find(l => l.id === previewRecipientId) || candidateLeads[0];

  const handleSendCampaign = () => {
    if (selectedLeadIds.length === 0) return;

    setIsSending(true);
    setSendProgress(20);

    setTimeout(() => setSendProgress(60), 1000);

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
          pdfName: 'Singing_Bowls_Catalog_2026.pdf',
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
      setSentNotice(`Dispatched ${selectedLeadIds.length} personalized pitches with catalog attached.`);
      setSelectedLeadIds([]);

      setTimeout(() => setSentNotice(null), 4000);
    }, 2500);
  };

  const insertToken = (token: string) => {
    setBodyTemplate(prev => prev + ` ${token}`);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      
      {sentNotice && (
        <div className="fixed bottom-6 right-6 z-50 rounded-panel bg-[#161C25] border border-[rgba(47,191,143,0.3)] p-4 text-[14px] text-[#E5E9F0] shadow-lg flex items-center gap-2.5 animate-in slide-in-from-bottom-2">
          <Check className="h-4 w-4 text-[#2FBF8F] shrink-0" />
          <span>{sentNotice}</span>
        </div>
      )}

      {/* 1. PAGE HERO (text-4xl, 1 sentence) */}
      <PageHero
        eyebrow="Automated Dispatch"
        eyebrowIcon={<Mail className="h-3.5 w-3.5 text-[#2FBF8F]" />}
        title="Gmail Outreach Engine & Deck Dispatch"
        gradientWord="Outreach"
        description="Automated wholesale export pitches with official PDF catalog deck and spam throttle guards."
        actions={
          <div className="flex items-center gap-2 h-10 px-3.5 rounded-full bg-[#10151C] border border-[rgba(148,163,184,0.12)] text-[13px] font-mono text-[#9AA4B2] whitespace-nowrap shrink-0">
            <span className="h-2 w-2 rounded-full bg-[#2FBF8F]" />
            <span>export@jaipurcrafts-india.com</span>
          </div>
        }
      />

      {/* 2. SPLIT VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recipients (5 COLS) */}
        <div className="lg:col-span-5">
          <Card padding="md" className="h-full flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(148,163,184,0.1)] mb-3">
                <h3 className="text-[16px] font-bold text-[#E5E9F0] flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#2FBF8F]" />
                  Select Buyers
                </h3>
                <span className="rounded-full bg-[rgba(47,191,143,0.12)] px-2.5 py-0.5 text-[12px] font-mono font-bold text-[#2FBF8F] whitespace-nowrap shrink-0">
                  {selectedLeadIds.length} Selected
                </span>
              </div>

              <div className="flex items-center justify-between text-[13px] mb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSelectAll}
                    className="text-[#2FBF8F] hover:underline"
                  >
                    Select Uncontacted ({candidateLeads.filter(l => l.outreachStatus === 'Not Contacted').length})
                  </button>
                  <span className="text-[#667085]">•</span>
                  <button
                    onClick={handleDeselectAll}
                    className="text-[#9AA4B2] hover:underline"
                  >
                    Clear
                  </button>
                </div>
                <span className="text-[12px] text-[#667085] font-mono">
                  {candidateLeads.length} Clean
                </span>
              </div>

              <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
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
                      className={`p-3 rounded-panel border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#161C25] border-[#2FBF8F]'
                          : 'bg-[#10151C] border-[rgba(148,163,184,0.1)] hover:bg-[#161C25]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="mt-1 h-3.5 w-3.5 rounded border-zinc-700 bg-zinc-900 text-[#2FBF8F] focus:ring-0 cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="text-[14px] font-semibold text-[#E5E9F0] truncate">
                              {lead.companyName}
                            </h4>
                            <span className="text-[12px] font-mono text-[#9AA4B2] shrink-0">
                              {lead.city}
                            </span>
                          </div>
                          <p className="text-[12px] text-[#9AA4B2] truncate">
                            {lead.contactName} ({lead.title})
                          </p>
                          <div className="mt-1 flex items-center justify-between text-[12px] font-mono">
                            <span className="text-[#667085] truncate">{lead.email}</span>
                            {isContacted && (
                              <span className="text-[#7C8DB5] font-semibold text-[11px]">
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

            <div className="pt-3 border-t border-[rgba(148,163,184,0.1)] flex items-center justify-between text-[13px] text-[#9AA4B2]">
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-[#2FBF8F]" />
                Exclude pitched leads
              </span>
              <input
                type="checkbox"
                checked={excludeContacted}
                onChange={(e) => setExcludeContacted(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-zinc-700 bg-zinc-900 text-[#2FBF8F] focus:ring-0 cursor-pointer"
              />
            </div>
          </Card>
        </div>

        {/* Composer (7 COLS) */}
        <div className="lg:col-span-7">
          <Card padding="md" className="space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(148,163,184,0.1)]">
              <h3 className="text-[16px] font-bold text-[#E5E9F0] flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#2FBF8F]" />
                Pitch Composer
              </h3>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowPreviewModal(true)}
                icon={<Eye className="h-3.5 w-3.5 text-[#7C8DB5]" />}
              >
                Preview
              </Button>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-eyebrow text-[#9AA4B2] font-semibold">
                Tokens
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['{{Buyer_Name}}', '{{Company_Name}}', '{{City}}', '{{Product_Category}}'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => insertToken(t)}
                    className="h-7 px-2.5 rounded bg-[#161C25] hover:bg-[#1B222D] text-[12px] font-mono text-[#2FBF8F] transition-colors whitespace-nowrap shrink-0"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-mono uppercase tracking-eyebrow text-[#9AA4B2] font-semibold">
                Subject
              </label>
              <input
                type="text"
                value={subjectTemplate}
                onChange={(e) => setSubjectTemplate(e.target.value)}
                className="w-full h-10 rounded-control bg-[#161C25] border border-[rgba(148,163,184,0.12)] px-3 text-[14px] text-[#E5E9F0] focus:outline-none focus:border-[#2FBF8F]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-mono uppercase tracking-eyebrow text-[#9AA4B2] font-semibold">
                Email Body
              </label>
              <textarea
                rows={9}
                value={bodyTemplate}
                onChange={(e) => setBodyTemplate(e.target.value)}
                className="w-full rounded-control bg-[#161C25] border border-[rgba(148,163,184,0.12)] p-3 text-[14px] text-[#E5E9F0] focus:outline-none focus:border-[#2FBF8F] font-mono leading-relaxed resize-none"
              />
            </div>

            {/* Catalog Deck Attachment Card */}
            <div className="p-3.5 rounded-panel bg-[#161C25] border border-[rgba(148,163,184,0.12)] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="h-5 w-5 text-[#2FBF8F] shrink-0" />
                <div className="min-w-0">
                  <p className="text-[14px] font-bold font-mono text-[#E5E9F0] truncate">
                    Singing_Bowls_Catalog_2026.pdf
                  </p>
                  <p className="text-[12px] text-[#9AA4B2] truncate">
                    Attached • 4.2 MB • FOB prices & HTS codes
                  </p>
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={onOpenCatalog}
              >
                Preview Deck
              </Button>
            </div>

            {/* Deliverability & Throttle Panel */}
            <div className="p-3.5 rounded-panel bg-[#161C25] border border-[rgba(148,163,184,0.12)] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#2FBF8F]" />
                  <span className="text-[13px] font-bold text-[#E5E9F0]">Anti-Spam Deliverability</span>
                </div>
                <span className="rounded-full bg-[rgba(47,191,143,0.12)] px-2.5 py-0.5 text-[12px] font-mono font-bold text-[#2FBF8F] whitespace-nowrap shrink-0">
                  98/100 Safe
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[13px] text-[#9AA4B2]">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Daily Limit:</span>
                    <strong className="text-[#E5E9F0]">{dailyThrottle} / day</strong>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={60}
                    value={dailyThrottle}
                    onChange={(e) => setDailyThrottle(Number(e.target.value))}
                    className="w-full accent-[#2FBF8F]"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Delay Jitter:</span>
                    <strong className="text-[#2FBF8F]">45s–90s</strong>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer mt-1">
                    <input
                      type="checkbox"
                      checked={randomDelay}
                      onChange={(e) => setRandomDelay(e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-zinc-700 bg-zinc-900 text-[#2FBF8F]"
                    />
                    <span className="text-[12px] text-[#E5E9F0]">Randomized intervals</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-[13px] text-[#9AA4B2]">
                Ready for <strong className="text-[#E5E9F0] font-mono">{selectedLeadIds.length}</strong> selected buyers.
              </p>

              <Button
                variant="primary"
                size="md"
                onClick={handleSendCampaign}
                disabled={isSending || selectedLeadIds.length === 0}
                icon={isSending ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              >
                {isSending ? `Sending (${sendProgress}%)...` : 'Send via Gmail API'}
              </Button>
            </div>

          </Card>
        </div>

      </div>

      {/* RENDERED PREVIEW MODAL */}
      {showPreviewModal && activePreviewLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative flex flex-col w-full max-w-2xl max-h-[85vh] rounded-card bg-[#10151C] border border-[rgba(148,163,184,0.18)] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-[rgba(148,163,184,0.12)]">
              <h4 className="text-[16px] font-bold text-[#E5E9F0]">
                Preview: {activePreviewLead.companyName}
              </h4>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-1 rounded text-[#9AA4B2] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#0A0D12] text-[13px] font-mono">
              <div className="p-3 rounded-panel bg-[#161C25] space-y-1">
                <p><span className="text-[#667085]">To:</span> {activePreviewLead.email}</p>
                <p><span className="text-[#667085]">Subject:</span> <strong className="text-[#2FBF8F]">{renderPersonalized(subjectTemplate, activePreviewLead)}</strong></p>
              </div>

              <div className="p-4 rounded-panel bg-[#161C25] text-[#E5E9F0] whitespace-pre-wrap leading-relaxed">
                {renderPersonalized(bodyTemplate, activePreviewLead)}
              </div>
            </div>

            <div className="flex items-center justify-end p-4 border-t border-[rgba(148,163,184,0.12)] bg-[#10151C]">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowPreviewModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="h-16" />

    </div>
  );
};
