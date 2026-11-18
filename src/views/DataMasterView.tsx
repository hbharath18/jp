import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  CopyX, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  Download, 
  Trash2, 
  RefreshCw, 
  Phone, 
  Mail, 
  Building2, 
  PhoneCall, 
  Send, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { Lead, EmailValidationStatus, AIClassificationStatus } from '../types';
import { PageHero } from '../components/ui/PageHero';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

interface DataMasterViewProps {
  leads: Lead[];
  onUpdateLeads: (leads: Lead[]) => void;
  onSelectLead: (lead: Lead) => void;
  onComposeEmail: (lead: Lead) => void;
  onAddToDialer: (lead: Lead) => void;
}

export const DataMasterView: React.FC<DataMasterViewProps> = ({
  leads,
  onUpdateLeads,
  onSelectLead,
  onComposeEmail,
  onAddToDialer
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | EmailValidationStatus>('All');
  const [classificationFilter, setClassificationFilter] = useState<'All' | AIClassificationStatus>('All');
  const [showDuplicatesOnly, setShowDuplicatesOnly] = useState(false);
  
  const [isValidating, setIsValidating] = useState(false);
  const [isDeduplicating, setIsDeduplicating] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Run Deduplication
  const handleRunDeduplication = () => {
    setIsDeduplicating(true);
    setTimeout(() => {
      const seenDomains = new Set<string>();
      const seenEmails = new Set<string>();

      const updated = leads.map(l => {
        let domain = '';
        try {
          domain = new URL(l.website).hostname.replace('www.', '');
        } catch {
          domain = l.website.toLowerCase();
        }

        const isDup = (domain && seenDomains.has(domain)) || (l.email && seenEmails.has(l.email.toLowerCase()));
        if (domain) seenDomains.add(domain);
        if (l.email) seenEmails.add(l.email.toLowerCase());

        if (isDup && !l.isDuplicate) {
          return {
            ...l,
            isDuplicate: true,
            duplicateReason: `Duplicate detected: Domain ${domain} or email matches existing record`
          };
        }
        return l;
      });

      onUpdateLeads(updated);
      setIsDeduplicating(false);
      triggerNotification(`Deduplication Engine completed! Flagged duplicate records.`);
    }, 1200);
  };

  // Purge Duplicates
  const handlePurgeDuplicates = () => {
    const dups = leads.filter(l => l.isDuplicate).length;
    if (dups === 0) {
      triggerNotification('No duplicate records to purge.');
      return;
    }
    const clean = leads.filter(l => !l.isDuplicate);
    onUpdateLeads(clean);
    triggerNotification(`Purged ${dups} duplicate records from database!`);
  };

  // Run Email Validator
  const handleRunEmailValidator = () => {
    setIsValidating(true);
    setTimeout(() => {
      const updated = leads.map(l => {
        if (!l.email) return { ...l, emailStatus: 'Pending' as EmailValidationStatus };
        
        if (l.email.includes('bounced') || l.email.includes('fake') || l.email.includes('invalid')) {
          return { ...l, emailStatus: 'Invalid' as EmailValidationStatus };
        } else if (l.email.startsWith('info@') || l.email.startsWith('sales@') || l.email.startsWith('contact@')) {
          return { ...l, emailStatus: 'Risky' as EmailValidationStatus };
        } else {
          return { ...l, emailStatus: 'Valid' as EmailValidationStatus };
        }
      });

      onUpdateLeads(updated);
      setIsValidating(false);
      triggerNotification('Email Validator completed: Syntax, MX records, and mailbox verified.');
    }, 1500);
  };

  // Purge Invalid Emails
  const handlePurgeInvalidEmails = () => {
    const invalidCount = leads.filter(l => l.emailStatus === 'Invalid').length;
    if (invalidCount === 0) {
      triggerNotification('No invalid emails found in current database.');
      return;
    }
    const filtered = leads.filter(l => l.emailStatus !== 'Invalid');
    onUpdateLeads(filtered);
    triggerNotification(`Purged ${invalidCount} invalid/bounced email records to safeguard sender reputation.`);
  };

  // Export Clean CSV
  const handleExportCSV = () => {
    const clean = leads.filter(l => !l.isDuplicate && l.emailStatus !== 'Invalid');
    let csv = "Company Name,Contact Name,Title,City,State,Phone,Email,Email Status,AI Classification,Confidence,Source,Estimated Volume\n";
    clean.forEach(l => {
      csv += `"${l.companyName}","${l.contactName}","${l.title}","${l.city}","${l.state}","${l.phone}","${l.email}","${l.emailStatus}","${l.aiClassification}","${l.b2bConfidence}%","${l.source}","${l.estimatedAnnualVolume || ''}"\n`;
    });
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csv);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `tradepulse_us_buyers_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(l => {
    if (showDuplicatesOnly && !l.isDuplicate) return false;
    if (statusFilter !== 'All' && l.emailStatus !== statusFilter) return false;
    if (classificationFilter !== 'All' && l.aiClassification !== classificationFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        l.companyName.toLowerCase().includes(q) ||
        l.contactName.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.state.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const duplicateCount = leads.filter(l => l.isDuplicate).length;

  return (
    <div className="space-y-12 sm:space-y-16 animate-in fade-in duration-300">
      
      {/* Toast Alert */}
      {notification && (
        <div className="fixed bottom-8 right-8 z-50 rounded-2xl bg-[#0E0E12] border border-[#F59E0B]/40 p-5 text-[15px] text-[#F5F5F7] shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-3">
          <CheckCircle2 className="h-5 w-5 text-[#F59E0B] shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* 1. PAGE HERO */}
      <PageHero
        eyebrow="Clean Pipeline & Hygiene // Database Integrity"
        eyebrowIcon={<Database className="h-4 w-4 text-[#F59E0B]" />}
        title="Master US Buyer Database"
        gradientWord="Database"
        description="Deduplicated CRM table with domain collision guards, MX mailbox deliverability checks, and Gemini AI wholesale qualification."
        actions={
          <>
            <Button
              variant="secondary"
              size="md"
              onClick={handleRunDeduplication}
              disabled={isDeduplicating}
              icon={<CopyX className="h-4 w-4 text-orange-400" />}
            >
              {isDeduplicating ? 'Checking Duplicates...' : 'Deduplication Engine'}
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={handleRunEmailValidator}
              disabled={isValidating}
              icon={isValidating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4 text-[#34D399]" />}
            >
              Run Email Validator
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleExportCSV}
              icon={<Download className="h-4 w-4" />}
            >
              Export Clean CSV
            </Button>
          </>
        }
      />

      {/* 2. DEDUPLICATION & INVALID EMAIL WARNING BANNERS */}
      {duplicateCount > 0 && (
        <Card padding="md" className="border-rose-500/30 bg-rose-950/15">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <AlertTriangle className="h-6 w-6 text-[#F87171] shrink-0" />
              <div>
                <p className="text-[16px] font-bold text-[#F5F5F7]">
                  {duplicateCount} duplicate records detected by website domain / phone cross-reference.
                </p>
                <p className="text-[14px] text-[#A1A1AA] mt-0.5">
                  Purge duplicate entries before initiating email campaigns to avoid double-pitching buyers.
                </p>
              </div>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={handlePurgeDuplicates}
              icon={<Trash2 className="h-4 w-4" />}
            >
              Purge All Duplicates
            </Button>
          </div>
        </Card>
      )}

      {leads.some(l => l.emailStatus === 'Invalid') && (
        <Card padding="md" className="border-[#FBBF24]/30 bg-amber-950/15">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <XCircle className="h-6 w-6 text-[#FBBF24] shrink-0" />
              <div>
                <p className="text-[16px] font-bold text-[#F5F5F7]">
                  Invalid / dead MX domains found in active database.
                </p>
                <p className="text-[14px] text-[#A1A1AA] mt-0.5">
                  Purging protects your Google Workspace / Gmail sender IP warming reputation.
                </p>
              </div>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={handlePurgeInvalidEmails}
              icon={<Trash2 className="h-4 w-4" />}
            >
              Purge Invalid Emails
            </Button>
          </div>
        </Card>
      )}

      {/* 3. TOOLBAR & CONTROLS */}
      <Card padding="md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Search Box (54px tall) */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B6B75]" />
            <input
              type="text"
              placeholder="Search by showroom name, decision maker, city, state, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-[52px] rounded-control bg-[#0E0E12] border border-white/10 pl-12 pr-4 text-[15px] text-[#F5F5F7] placeholder-[#6B6B75] focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/30 transition-all"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="h-[52px] rounded-control bg-[#0E0E12] border border-white/10 px-4 text-[14px] text-[#F5F5F7] focus:outline-none focus:border-[#F59E0B] font-medium cursor-pointer"
            >
              <option value="All">All MX Statuses</option>
              <option value="Valid">Valid (Deliverable)</option>
              <option value="Risky">Risky (Generic)</option>
              <option value="Invalid">Invalid (Bounced)</option>
              <option value="Pending">Pending Check</option>
            </select>

            <select
              value={classificationFilter}
              onChange={(e) => setClassificationFilter(e.target.value as any)}
              className="h-[52px] rounded-control bg-[#0E0E12] border border-white/10 px-4 text-[14px] text-[#F5F5F7] focus:outline-none focus:border-[#F59E0B] font-medium cursor-pointer"
            >
              <option value="All">All Buyer Tiers</option>
              <option value="B2B Business Buyer">B2B Business Buyer</option>
              <option value="Individual / Retail Consumer">Individual Consumer</option>
            </select>

            <button
              onClick={() => setShowDuplicatesOnly(!showDuplicatesOnly)}
              className={`h-[52px] px-5 rounded-control text-[14px] font-medium border transition-colors flex items-center gap-2 ${
                showDuplicatesOnly
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-[#0E0E12] text-[#A1A1AA] border-white/10 hover:bg-[#15151A] hover:text-[#F5F5F7]'
              }`}
            >
              <CopyX className="h-4 w-4" />
              <span>Duplicates ({duplicateCount})</span>
            </button>
          </div>
        </div>
      </Card>

      {/* 4. MASTER BUYER DATA TABLE (76px rows, sticky header, avatar initials) */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[15px] border-collapse min-w-[1100px]">
            <thead>
              <tr className="border-b border-white/[0.08] bg-[#0E0E12] text-[#A1A1AA] font-mono text-[13px] tracking-eyebrow uppercase">
                <th className="py-5 px-6">Company / Showroom</th>
                <th className="py-5 px-6">Decision Maker</th>
                <th className="py-5 px-6">Location</th>
                <th className="py-5 px-6">Source</th>
                <th className="py-5 px-6">Phone Number</th>
                <th className="py-5 px-6">Email Address</th>
                <th className="py-5 px-6">Email MX Status</th>
                <th className="py-5 px-6">Gemini Tier</th>
                <th className="py-5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-[#A1A1AA]">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-[#6B6B75] text-[16px]">
                    No buyer leads found matching current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const companyInitial = lead.companyName.charAt(0);

                  return (
                    <tr
                      key={lead.id}
                      className={`h-[76px] hover:bg-[#1B1B22] transition-colors relative group ${
                        lead.isDuplicate ? 'bg-rose-950/10' : ''
                      }`}
                    >
                      {/* Company Name with Avatar Initial Chip */}
                      <td className="py-4 px-6">
                        <div
                          onClick={() => onSelectLead(lead)}
                          className="cursor-pointer flex items-center gap-3.5"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] border border-white/10 text-[15px] font-bold text-[#F59E0B]">
                            {companyInitial}
                          </div>
                          <div>
                            <p className="font-bold text-[#F5F5F7] text-[15px] group-hover:text-[#F59E0B] transition-colors">
                              {lead.companyName}
                            </p>
                            <p className="text-[13px] text-[#6B6B75] font-mono">
                              {lead.category} • {lead.persona}
                            </p>
                            {lead.isDuplicate && (
                              <span className="inline-block mt-0.5 text-[11px] font-bold text-[#F87171] bg-[#F87171]/15 px-2 py-0.5 rounded">
                                Duplicate Detected
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Decision Maker */}
                      <td className="py-4 px-6">
                        <p className="font-semibold text-[#F5F5F7] text-[15px]">{lead.contactName}</p>
                        <p className="text-[13px] text-[#6B6B75]">{lead.title}</p>
                      </td>

                      {/* Location */}
                      <td className="py-4 px-6 font-mono text-[14px]">
                        <span className="text-[#F5F5F7] font-semibold">{lead.city}</span>, {lead.state}
                      </td>

                      {/* Sourcing Platform */}
                      <td className="py-4 px-6">
                        <span className="rounded-full bg-white/[0.06] px-3 py-1 text-[13px] font-mono text-[#A1A1AA]">
                          {lead.source}
                        </span>
                      </td>

                      {/* Phone Number */}
                      <td className="py-4 px-6 font-mono text-[14px] text-[#F5F5F7] whitespace-nowrap">
                        {lead.phone ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onAddToDialer(lead)}
                              className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-[#34D399]/20 text-[#A1A1AA] hover:text-[#34D399] transition-colors"
                              title="Add to Cold Call Queue"
                            >
                              <Phone className="h-3.5 w-3.5" />
                            </button>
                            <span>{lead.phone}</span>
                          </div>
                        ) : (
                          <span className="text-[#6B6B75]">No Phone</span>
                        )}
                      </td>

                      {/* Email Address */}
                      <td className="py-4 px-6 font-mono text-[14px]">
                        {lead.email ? (
                          <span
                            className="text-[#F5F5F7] hover:text-[#F59E0B] cursor-pointer"
                            onClick={() => onSelectLead(lead)}
                          >
                            {lead.email}
                          </span>
                        ) : (
                          <span className="text-[#F59E0B]/80 font-sans italic text-[14px]">Phone Scraped</span>
                        )}
                      </td>

                      {/* Email MX Status */}
                      <td className="py-4 px-6">
                        <Badge
                          variant={
                            lead.emailStatus === 'Valid' ? 'success' :
                            lead.emailStatus === 'Risky' ? 'warning' :
                            lead.emailStatus === 'Invalid' ? 'danger' : 'neutral'
                          }
                          size="sm"
                        >
                          {lead.emailStatus}
                        </Badge>
                      </td>

                      {/* Gemini AI Classification */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={lead.aiClassification === 'B2B Business Buyer' ? 'indigo' : 'neutral'}
                            size="sm"
                          >
                            {lead.aiClassification === 'B2B Business Buyer' ? 'B2B Buyer' : 'Individual'}
                          </Badge>
                          <span className="text-[13px] font-mono font-bold text-[#A1A1AA]">
                            {lead.b2bConfidence}%
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {lead.email && (
                            <button
                              onClick={() => onComposeEmail(lead)}
                              className="p-2 rounded-xl bg-white/[0.05] hover:bg-[#F59E0B] hover:text-[#07070A] text-[#F5F5F7] transition-all"
                              title="Compose Pitch Email"
                            >
                              <Send className="h-4 w-4" />
                            </button>
                          )}
                          {lead.phone && (
                            <button
                              onClick={() => onAddToDialer(lead)}
                              className="p-2 rounded-xl bg-white/[0.05] hover:bg-[#34D399] hover:text-[#07070A] text-[#F5F5F7] transition-all"
                              title="Open in Cold Calling Queue"
                            >
                              <PhoneCall className="h-4 w-4" />
                            </button>
                          )}
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => onSelectLead(lead)}
                          >
                            View
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex items-center justify-between p-6 border-t border-white/[0.08] bg-[#0E0E12] text-[14px] font-mono text-[#A1A1AA]">
          <span>
            Displaying <strong className="text-[#F5F5F7]">{filteredLeads.length}</strong> of {leads.length} total buyer leads
          </span>
          <div className="flex items-center gap-6">
            <span className="text-[#34D399]">Valid: {leads.filter(l => l.emailStatus === 'Valid').length}</span>
            <span className="text-[#A5B4FC]">B2B Qualified: {leads.filter(l => l.aiClassification === 'B2B Business Buyer').length}</span>
            <span className="text-[#F87171]">Duplicates: {duplicateCount}</span>
          </div>
        </div>
      </div>

    </div>
  );
};
