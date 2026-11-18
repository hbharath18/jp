import React, { useState } from 'react';
import {
  History,
  Send,
  PhoneCall,
  Download,
  FileText,
  Eye,
  Lock
} from 'lucide-react';
import { SentEmailLog, ColdCallLog, Lead } from '../types';
import { PageHero } from '../components/ui/PageHero';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

interface AuditHistoryViewProps {
  emailLogs: SentEmailLog[];
  callLogs: ColdCallLog[];
  leads: Lead[];
  onOpenCatalog: () => void;
}

export const AuditHistoryView: React.FC<AuditHistoryViewProps> = ({
  emailLogs,
  callLogs,
  leads,
  onOpenCatalog
}) => {
  const [activeTab, setActiveTab] = useState<'emails' | 'calls'>('emails');
  const [filterQuery, setFilterQuery] = useState('');

  const handleDownloadCsv = () => {
    let csv = "Type,Timestamp,Recipient/Company,Contact,Subject/Outcome,PDF Attached,Status,Notes\n";
    emailLogs.forEach(e => {
      csv += `"Email","${e.timestamp}","${e.companyName}","${e.recipientName} (${e.recipientEmail})","${e.subject}","${e.pdfAttached ? 'Yes' : 'No'}","${e.deliveryStatus}","Opened ${e.openCount} times"\n`;
    });
    callLogs.forEach(c => {
      csv += `"Call","${c.timestamp}","${c.companyName}","${c.contactName} (${c.phone})","${c.outcome}","N/A","Logged","${c.notes || ''}"\n`;
    });

    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csv);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `tradepulse_audit_log_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJson = () => {
    const data = {
      exportMetadata: {
        engine: "TradePulse AI v2.8",
        tradeRoute: "Jaipur/Moradabad (IN) to US Metro Ports",
        generatedAt: new Date().toISOString()
      },
      sentEmails: emailLogs,
      callLogs: callLogs,
      leads: leads
    };
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", jsonStr);
    link.setAttribute("download", `tradepulse_export_dossier.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredEmails = emailLogs.filter(e =>
    e.companyName.toLowerCase().includes(filterQuery.toLowerCase()) ||
    e.recipientEmail.toLowerCase().includes(filterQuery.toLowerCase()) ||
    e.subject.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const filteredCalls = callLogs.filter(c =>
    c.companyName.toLowerCase().includes(filterQuery.toLowerCase()) ||
    c.phone.toLowerCase().includes(filterQuery.toLowerCase()) ||
    c.outcome.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-200">

      {/* 1. PAGE HERO (text-4xl, 1 sentence) */}
      <PageHero
        eyebrow="Communications Ledger"
        eyebrowIcon={<History className="h-3.5 w-3.5 text-[#2FBF8F]" />}
        title="Outreach Audit & Communication Logs"
        gradientWord="Audit"
        description="Permanent record of every dispatched email proposal and cold call outcome."
        actions={
          <>
            <Button
              variant="secondary"
              size="md"
              onClick={handleDownloadCsv}
              icon={<Download className="h-4 w-4 text-[#2FBF8F]" />}
            >
              Export CSV
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={handleDownloadJson}
              icon={<Download className="h-4 w-4 text-[#7C8DB5]" />}
            >
              Export JSON
            </Button>
          </>
        }
      />

      {/* 2. TABS & SEARCH */}
      <Card padding="sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActiveTab('emails')}
              className={`h-10 px-4 rounded-control text-[14px] font-semibold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${activeTab === 'emails'
                  ? 'bg-[rgba(47,191,143,0.15)] text-[#2FBF8F] border border-[rgba(47,191,143,0.3)]'
                  : 'bg-[#161C25] text-[#9AA4B2] border border-[rgba(148,163,184,0.12)] hover:text-[#E5E9F0]'
                }`}
            >
              <Send className="h-3.5 w-3.5 text-[#2FBF8F]" />
              <span>Sent Pitches ({emailLogs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('calls')}
              className={`h-10 px-4 rounded-control text-[14px] font-semibold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${activeTab === 'calls'
                  ? 'bg-[rgba(124,141,181,0.15)] text-[#7C8DB5] border border-[rgba(124,141,181,0.3)]'
                  : 'bg-[#161C25] text-[#9AA4B2] border border-[rgba(148,163,184,0.12)] hover:text-[#E5E9F0]'
                }`}
            >
              <PhoneCall className="h-3.5 w-3.5 text-[#7C8DB5]" />
              <span>Call Logs ({callLogs.length})</span>
            </button>
          </div>

          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="Search audit trail..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full h-10 rounded-control bg-[#161C25] border border-[rgba(148,163,184,0.12)] px-3 text-[13px] text-[#E5E9F0] placeholder-[#667085] focus:outline-none focus:border-[#2FBF8F]"
            />
          </div>
        </div>
      </Card>

      {/* 3. SENT EMAILS TABLE (64-72px rows) */}
      {activeTab === 'emails' && (
        <div className="theme-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px] border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-[rgba(148,163,184,0.12)] bg-[#10151C] text-[#9AA4B2] font-mono text-[12px] tracking-eyebrow uppercase">
                  <th className="py-4 px-5">Timestamp</th>
                  <th className="py-4 px-5">Recipient / Company</th>
                  <th className="py-4 px-5">Email Address</th>
                  <th className="py-4 px-5">Subject Line</th>
                  <th className="py-4 px-5">Deck</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-right">Guard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(148,163,184,0.06)] text-[#9AA4B2]">
                {filteredEmails.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-[#667085]">
                      No sent emails found.
                    </td>
                  </tr>
                ) : (
                  filteredEmails.map((item) => (
                    <tr key={item.id} className="h-[68px] hover:bg-[#161C25] transition-colors">
                      <td className="py-3 px-5 font-mono text-[13px] text-[#667085] whitespace-nowrap">
                        {item.timestamp}
                      </td>
                      <td className="py-3 px-5">
                        <p className="font-semibold text-[#E5E9F0]">{item.companyName}</p>
                        <p className="text-[12px] text-[#9AA4B2]">{item.recipientName}</p>
                      </td>
                      <td className="py-3 px-5 font-mono text-[13px] text-[#E5E9F0]">
                        {item.recipientEmail}
                      </td>
                      <td className="py-3 px-5 max-w-xs truncate text-[#E5E9F0]">
                        {item.subject}
                      </td>
                      <td className="py-3 px-5">
                        <button
                          onClick={onOpenCatalog}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[rgba(47,191,143,0.12)] text-[#2FBF8F] text-[12px] font-mono whitespace-nowrap shrink-0"
                        >
                          <FileText className="h-3 w-3" />
                          <span>PDF</span>
                        </button>
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
                          <Badge
                            variant={
                              item.deliveryStatus === 'Replied' ? 'success' :
                                item.deliveryStatus === 'Opened' ? 'slate' : 'neutral'
                            }
                            size="sm"
                          >
                            {item.deliveryStatus}
                          </Badge>
                          {item.openCount > 0 && (
                            <span className="text-[12px] font-mono text-[#9AA4B2] flex items-center gap-1">
                              <Eye className="h-3 w-3 text-[#667085]" /> {item.openCount}x
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-5 text-right">
                        <span className="inline-flex items-center gap-1 text-[12px] font-mono text-[#2FBF8F] bg-[rgba(47,191,143,0.12)] px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
                          <Lock className="h-2.5 w-2.5" />
                          <span>Protected</span>
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. COLD CALLS TABLE (64-72px rows) */}
      {activeTab === 'calls' && (
        <div className="theme-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px] border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-[rgba(148,163,184,0.12)] bg-[#10151C] text-[#9AA4B2] font-mono text-[12px] tracking-eyebrow uppercase">
                  <th className="py-4 px-5">Timestamp</th>
                  <th className="py-4 px-5">Company</th>
                  <th className="py-4 px-5">Phone</th>
                  <th className="py-4 px-5">Outcome</th>
                  <th className="py-4 px-5">Captured Email</th>
                  <th className="py-4 px-5">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(148,163,184,0.06)] text-[#9AA4B2]">
                {filteredCalls.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#667085]">
                      No call logs found.
                    </td>
                  </tr>
                ) : (
                  filteredCalls.map((item) => (
                    <tr key={item.id} className="h-[68px] hover:bg-[#161C25] transition-colors">
                      <td className="py-3 px-5 font-mono text-[13px] text-[#667085] whitespace-nowrap">
                        {item.timestamp}
                      </td>
                      <td className="py-3 px-5 font-semibold text-[#E5E9F0]">
                        {item.companyName}
                        <p className="text-[12px] text-[#667085] font-normal">{item.contactName}</p>
                      </td>
                      <td className="py-3 px-5 font-mono text-[13px] text-[#2FBF8F] font-semibold whitespace-nowrap">
                        {item.phone}
                      </td>
                      <td className="py-3 px-5 whitespace-nowrap shrink-0">
                        <Badge
                          variant={
                            item.outcome === 'Interested - Requested Email' ? 'success' :
                              item.outcome === 'Follow-up Scheduled' ? 'slate' :
                                item.outcome === 'Voicemail Left' ? 'warning' : 'danger'
                          }
                          size="sm"
                        >
                          {item.outcome}
                        </Badge>
                      </td>
                      <td className="py-3 px-5 font-mono text-[13px] text-[#2FBF8F]">
                        {item.convertedEmail || <span className="text-[#667085]">—</span>}
                      </td>
                      <td className="py-3 px-5 text-[#E5E9F0] text-[13px] max-w-sm truncate">
                        {item.notes}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="h-16" />

    </div>
  );
};
