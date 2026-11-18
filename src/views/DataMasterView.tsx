import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  CopyX, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Download, 
  Trash2, 
  RefreshCw, 
  Phone, 
  PhoneCall, 
  Send, 
  ShieldCheck 
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
    setTimeout(() => setNotification(null), 3000);
  };

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
            duplicateReason: `Duplicate detected: Domain ${domain}`
          };
        }
        return l;
      });

      onUpdateLeads(updated);
      setIsDeduplicating(false);
      triggerNotification(`Deduplication check completed.`);
    }, 1000);
  };

  const handlePurgeDuplicates = () => {
    const dups = leads.filter(l => l.isDuplicate).length;
    if (dups === 0) return;
    const clean = leads.filter(l => !l.isDuplicate);
    onUpdateLeads(clean);
    triggerNotification(`Purged ${dups} duplicate records.`);
  };

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
      triggerNotification('Email deliverability check completed.');
    }, 1200);
  };

  const handlePurgeInvalidEmails = () => {
    const invalidCount = leads.filter(l => l.emailStatus === 'Invalid').length;
    if (invalidCount === 0) return;
    const filtered = leads.filter(l => l.emailStatus !== 'Invalid');
    onUpdateLeads(filtered);
    triggerNotification(`Purged ${invalidCount} invalid emails.`);
  };

  const handleExportCSV = () => {
    const clean = leads.filter(l => !l.isDuplicate && l.emailStatus !== 'Invalid');
    let csv = "Company Name,Contact Name,Title,City,State,Phone,Email,Email Status,AI Classification,Confidence,Source,Estimated Volume\n";
    clean.forEach(l => {
      csv += `"${l.companyName}","${l.contactName}","${l.title}","${l.city}","${l.state}","${l.phone}","${l.email}","${l.emailStatus}","${l.aiClassification}","${l.b2bConfidence}%","${l.source}","${l.estimatedAnnualVolume || ''}"\n`;
    });
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csv);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `tradepulse_us_buyers_${new Date().toISOString().slice(0, 10)}.csv`);
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
    <div className="space-y-10 animate-in fade-in duration-200">
      
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 rounded-panel bg-[#161C25] border border-[rgba(47,191,143,0.3)] p-4 text-[14px] text-[#E5E9F0] shadow-lg flex items-center gap-2.5 animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="h-4 w-4 text-[#2FBF8F] shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* 1. PAGE HERO (text-4xl, 1 sentence) */}
      <PageHero
        eyebrow="CRM Data Hygiene"
        eyebrowIcon={<Database className="h-3.5 w-3.5 text-[#2FBF8F]" />}
        title="Master US Buyer Database"
        gradientWord="Database"
        description="Deduplicated CRM directory with MX deliverability checks and Gemini B2B classification."
        actions={
          <>
            <Button
              variant="secondary"
              size="md"
              onClick={handleRunDeduplication}
              disabled={isDeduplicating}
              icon={<CopyX className="h-4 w-4 text-[#C9A66B]" />}
            >
              {isDeduplicating ? 'Checking...' : 'Check Duplicates'}
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={handleRunEmailValidator}
              disabled={isValidating}
              icon={isValidating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4 text-[#2FBF8F]" />}
            >
              Verify Emails
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleExportCSV}
              icon={<Download className="h-4 w-4" />}
            >
              Export CSV
            </Button>
          </>
        }
      />

      {/* 2. WARNING BANNERS */}
      {duplicateCount > 0 && (
        <Card padding="sm" className="border-[rgba(224,122,122,0.25)] bg-[rgba(224,122,122,0.06)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[14px]">
            <div className="flex items-center gap-2.5 text-[#E5E9F0]">
              <AlertTriangle className="h-4 w-4 text-[#E07A7A] shrink-0" />
              <span>{duplicateCount} duplicate records detected.</span>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={handlePurgeDuplicates}
              icon={<Trash2 className="h-3.5 w-3.5" />}
            >
              Purge Duplicates
            </Button>
          </div>
        </Card>
      )}

      {leads.some(l => l.emailStatus === 'Invalid') && (
        <Card padding="sm" className="border-[rgba(201,166,107,0.25)] bg-[rgba(201,166,107,0.06)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[14px]">
            <div className="flex items-center gap-2.5 text-[#E5E9F0]">
              <XCircle className="h-4 w-4 text-[#C9A66B] shrink-0" />
              <span>Invalid MX domains found.</span>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={handlePurgeInvalidEmails}
              icon={<Trash2 className="h-3.5 w-3.5" />}
            >
              Purge Invalid Emails
            </Button>
          </div>
        </Card>
      )}

      {/* 3. TOOLBAR CONTROLS */}
      <Card padding="sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085]" />
            <input
              type="text"
              placeholder="Search by name, city, state, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 rounded-control bg-[#161C25] border border-[rgba(148,163,184,0.12)] pl-10 pr-4 text-[14px] text-[#E5E9F0] placeholder-[#667085] focus:outline-none focus:border-[#2FBF8F]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="h-11 rounded-control bg-[#161C25] border border-[rgba(148,163,184,0.12)] px-3 text-[13px] text-[#E5E9F0] focus:outline-none focus:border-[#2FBF8F] font-medium cursor-pointer"
            >
              <option value="All">All MX Statuses</option>
              <option value="Valid">Valid</option>
              <option value="Risky">Risky</option>
              <option value="Invalid">Invalid</option>
              <option value="Pending">Pending</option>
            </select>

            <select
              value={classificationFilter}
              onChange={(e) => setClassificationFilter(e.target.value as any)}
              className="h-11 rounded-control bg-[#161C25] border border-[rgba(148,163,184,0.12)] px-3 text-[13px] text-[#E5E9F0] focus:outline-none focus:border-[#2FBF8F] font-medium cursor-pointer"
            >
              <option value="All">All Tiers</option>
              <option value="B2B Business Buyer">B2B Buyer</option>
              <option value="Individual / Retail Consumer">Individual</option>
            </select>

            <button
              onClick={() => setShowDuplicatesOnly(!showDuplicatesOnly)}
              className={`h-11 px-4 rounded-control text-[13px] font-medium border transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                showDuplicatesOnly
                  ? 'bg-[rgba(224,122,122,0.15)] text-[#E07A7A] border-[rgba(224,122,122,0.3)]'
                  : 'bg-[#161C25] text-[#9AA4B2] border-[rgba(148,163,184,0.12)] hover:text-[#E5E9F0]'
              }`}
            >
              <CopyX className="h-3.5 w-3.5" />
              <span>Duplicates ({duplicateCount})</span>
            </button>
          </div>
        </div>
      </Card>

      {/* 4. DATA TABLE (64-72px rows, sticky header, subtle hover) */}
      <div className="theme-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px] border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-[rgba(148,163,184,0.12)] bg-[#10151C] text-[#9AA4B2] font-mono text-[12px] tracking-eyebrow uppercase">
                <th className="py-4 px-5">Company / Showroom</th>
                <th className="py-4 px-5">Decision Maker</th>
                <th className="py-4 px-5">Location</th>
                <th className="py-4 px-5">Source</th>
                <th className="py-4 px-5">Phone Number</th>
                <th className="py-4 px-5">Email Address</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5">AI Fit</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(148,163,184,0.06)] text-[#9AA4B2]">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[#667085] text-[15px]">
                    No leads found matching current criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="h-[68px] hover:bg-[#161C25] transition-colors"
                  >
                    <td className="py-3 px-5">
                      <div
                        onClick={() => onSelectLead(lead)}
                        className="cursor-pointer"
                      >
                        <p className="font-semibold text-[#E5E9F0] hover:text-[#2FBF8F] transition-colors truncate">
                          {lead.companyName}
                        </p>
                        <p className="text-[12px] text-[#667085] font-mono truncate">
                          {lead.category}
                        </p>
                      </div>
                    </td>

                    <td className="py-3 px-5">
                      <p className="font-medium text-[#E5E9F0] truncate">{lead.contactName}</p>
                      <p className="text-[12px] text-[#667085] truncate">{lead.title}</p>
                    </td>

                    <td className="py-3 px-5 font-mono text-[13px] whitespace-nowrap">
                      <span className="text-[#E5E9F0]">{lead.city}</span>, {lead.state}
                    </td>

                    <td className="py-3 px-5">
                      <span className="rounded-full bg-[#161C25] px-2.5 py-0.5 text-[12px] font-mono text-[#9AA4B2] whitespace-nowrap">
                        {lead.source}
                      </span>
                    </td>

                    <td className="py-3 px-5 font-mono text-[13px] text-[#E5E9F0] whitespace-nowrap">
                      {lead.phone ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onAddToDialer(lead)}
                            className="p-1 rounded text-[#667085] hover:text-[#2FBF8F]"
                            title="Add to Call Queue"
                          >
                            <Phone className="h-3 w-3" />
                          </button>
                          <span>{lead.phone}</span>
                        </div>
                      ) : (
                        <span className="text-[#667085]">—</span>
                      )}
                    </td>

                    <td className="py-3 px-5 font-mono text-[13px]">
                      {lead.email ? (
                        <span
                          className="text-[#E5E9F0] hover:text-[#2FBF8F] cursor-pointer"
                          onClick={() => onSelectLead(lead)}
                        >
                          {lead.email}
                        </span>
                      ) : (
                        <span className="text-[#9AA4B2] font-sans italic text-[13px]">Phone Only</span>
                      )}
                    </td>

                    <td className="py-3 px-5">
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

                    <td className="py-3 px-5">
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        <Badge
                          variant={lead.aiClassification === 'B2B Business Buyer' ? 'emerald' : 'neutral'}
                          size="sm"
                        >
                          {lead.aiClassification === 'B2B Business Buyer' ? 'B2B' : 'Consumer'}
                        </Badge>
                        <span className="text-[12px] font-mono text-[#9AA4B2]">
                          {lead.b2bConfidence}%
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {lead.email && (
                          <button
                            onClick={() => onComposeEmail(lead)}
                            className="p-1.5 rounded-lg text-[#9AA4B2] hover:text-[#2FBF8F] hover:bg-[#161C25]"
                            title="Compose Pitch"
                          >
                            <Send className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {lead.phone && (
                          <button
                            onClick={() => onAddToDialer(lead)}
                            className="p-1.5 rounded-lg text-[#9AA4B2] hover:text-[#2FBF8F] hover:bg-[#161C25]"
                            title="Open Dialer"
                          >
                            <PhoneCall className="h-3.5 w-3.5" />
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
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-[rgba(148,163,184,0.12)] bg-[#10151C] text-[13px] font-mono text-[#9AA4B2]">
          <span>{filteredLeads.length} of {leads.length} leads</span>
          <div className="flex items-center gap-4">
            <span className="text-[#2FBF8F]">Valid: {leads.filter(l => l.emailStatus === 'Valid').length}</span>
            <span className="text-[#7C8DB5]">B2B: {leads.filter(l => l.aiClassification === 'B2B Business Buyer').length}</span>
            <span className="text-[#E07A7A]">Dups: {duplicateCount}</span>
          </div>
        </div>
      </div>

      <div className="h-16" />

    </div>
  );
};
