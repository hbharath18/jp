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
    link.setAttribute("download", `tradepulse_outreach_audit_log_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJson = () => {
    const data = {
      exportMetadata: {
        engine: "TradePulse AI v2.8",
        tradeRoute: "Jaipur/Moradabad (IN) to US Metro Ports",
        generatedAt: new Date().toISOString(),
        productCategory: "Handcrafted 7-Metal Tibetan Singing Bowls (HTS 9206.00)"
      },
      sentEmails: emailLogs,
      callLogs: callLogs,
      leads: leads
    };
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", jsonStr);
    link.setAttribute("download", `tradepulse_complete_export_dossier.json`);
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
    <div className="space-y-12 sm:space-y-16 animate-in fade-in duration-300">

      {/* 1. PAGE HERO */}
      <PageHero
        eyebrow="Permanent Audit Trail // Zero Duplicate Protection"
        eyebrowIcon={<History className="h-4 w-4 text-[#A5B4FC]" />}
        title="Outreach Audit Logs & Communications Ledger"
        gradientWord="Audit"
        description="Every dispatched proposal and phone consultation is permanently logged with timestamps, catalog attachment verifications, and delivery statuses."
        actions={
          <>
            <Button
              variant="secondary"
              size="md"
              onClick={handleDownloadCsv}
              icon={<Download className="h-4 w-4 text-[#F59E0B]" />}
            >
              Export Audit CSV
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={handleDownloadJson}
              icon={<Download className="h-4 w-4 text-[#A5B4FC]" />}
            >
              Download JSON Dossier
            </Button>
          </>
        }
      />

      {/* 2. TABS & SEARCH BAR */}
      <Card padding="md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('emails')}
              className={`h-12 px-6 rounded-control text-[15px] font-bold transition-all flex items-center gap-2.5 ${activeTab === 'emails'
                  ? 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30 shadow-md'
                  : 'bg-[#0E0E12] text-[#A1A1AA] border border-white/10 hover:bg-[#15151A] hover:text-[#F5F5F7]'
                }`}
            >
              <Send className="h-4 w-4 text-[#F59E0B]" />
              <span>Sent Gmail Pitches ({emailLogs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('calls')}
              className={`h-12 px-6 rounded-control text-[15px] font-bold transition-all flex items-center gap-2.5 ${activeTab === 'calls'
                  ? 'bg-[#34D399]/15 text-[#34D399] border border-[#34D399]/30 shadow-md'
                  : 'bg-[#0E0E12] text-[#A1A1AA] border border-white/10 hover:bg-[#15151A] hover:text-[#F5F5F7]'
                }`}
            >
              <PhoneCall className="h-4 w-4 text-[#34D399]" />
              <span>Cold Calling Logs ({callLogs.length})</span>
            </button>
          </div>

          <div className="w-full sm:w-80">
            <input
              type="text"
              placeholder="Search audit trail..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full h-12 rounded-control bg-[#0E0E12] border border-white/10 px-4 text-[14px] text-[#F5F5F7] placeholder-[#6B6B75] focus:outline-none focus:border-[#F59E0B]"
            />
          </div>
        </div>
      </Card>

      {/* 3. SENT EMAILS TABLE (72px rows) */}
      {activeTab === 'emails' && (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[15px] border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-white/[0.08] bg-[#0E0E12] text-[#A1A1AA] font-mono text-[13px] tracking-eyebrow uppercase">
                  <th className="py-5 px-6">Timestamp</th>
                  <th className="py-5 px-6">Recipient & Company</th>
                  <th className="py-5 px-6">Email Address</th>
                  <th className="py-5 px-6">Subject Line</th>
                  <th className="py-5 px-6">Catalog Deck</th>
                  <th className="py-5 px-6">Status & Opens</th>
                  <th className="py-5 px-6 text-right">Duplicate Guard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-[#A1A1AA]">
                {filteredEmails.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-[#6B6B75]">
                      No sent emails found matching query.
                    </td>
                  </tr>
                ) : (
                  filteredEmails.map((item) => (
                    <tr key={item.id} className="h-[72px] hover:bg-[#1B1B22] transition-colors">
                      <td className="py-4 px-6 font-mono text-[14px] text-[#6B6B75] whitespace-nowrap">
                        {item.timestamp}
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-[#F5F5F7] text-[15px]">{item.companyName}</p>
                        <p className="text-[13px] text-[#A1A1AA]">{item.recipientName}</p>
                      </td>
                      <td className="py-4 px-6 font-mono text-[14px] text-[#F5F5F7]">
                        {item.recipientEmail}
                      </td>
                      <td className="py-4 px-6 max-w-xs truncate text-[#F5F5F7] text-[14px]">
                        {item.subject}
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={onOpenCatalog}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F59E0B]/12 border border-[#F59E0B]/25 text-[#F59E0B] text-[13px] font-mono hover:bg-[#F59E0B]/20 transition-colors"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          <span>2026_Deck.pdf</span>
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2.5">
                          <Badge
                            variant={
                              item.deliveryStatus === 'Replied' ? 'success' :
                                item.deliveryStatus === 'Opened' ? 'indigo' : 'neutral'
                            }
                            size="sm"
                          >
                            {item.deliveryStatus}
                          </Badge>
                          {item.openCount > 0 && (
                            <span className="text-[13px] font-mono text-[#A1A1AA] flex items-center gap-1">
                              <Eye className="h-3.5 w-3.5 text-[#6B6B75]" /> {item.openCount}x
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className="inline-flex items-center gap-1.5 text-[13px] font-mono text-[#34D399] bg-[#34D399]/12 px-3 py-1 rounded-full">
                          <Lock className="h-3 w-3" />
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

      {/* 4. COLD CALLS TABLE (72px rows) */}
      {activeTab === 'calls' && (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[15px] border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-white/[0.08] bg-[#0E0E12] text-[#A1A1AA] font-mono text-[13px] tracking-eyebrow uppercase">
                  <th className="py-5 px-6">Timestamp</th>
                  <th className="py-5 px-6">Showroom Company</th>
                  <th className="py-5 px-6">US Phone Number</th>
                  <th className="py-5 px-6">Call Outcome</th>
                  <th className="py-5 px-6">Captured Email</th>
                  <th className="py-5 px-6">Discussion Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-[#A1A1AA]">
                {filteredCalls.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-[#6B6B75]">
                      No call records logged yet.
                    </td>
                  </tr>
                ) : (
                  filteredCalls.map((item) => (
                    <tr key={item.id} className="h-[72px] hover:bg-[#1B1B22] transition-colors">
                      <td className="py-4 px-6 font-mono text-[14px] text-[#6B6B75] whitespace-nowrap">
                        {item.timestamp}
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-[#F5F5F7] text-[15px]">{item.companyName}</p>
                        <p className="text-[13px] text-[#6B6B75]">{item.contactName}</p>
                      </td>
                      <td className="py-4 px-6 font-mono text-[14px] text-[#34D399] font-bold">
                        {item.phone}
                      </td>
                      <td className="py-4 px-6">
                        <Badge
                          variant={
                            item.outcome === 'Interested - Requested Email' ? 'success' :
                              item.outcome === 'Follow-up Scheduled' ? 'indigo' :
                                item.outcome === 'Voicemail Left' ? 'warning' : 'danger'
                          }
                          size="sm"
                        >
                          {item.outcome}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 font-mono text-[14px] text-[#F59E0B]">
                        {item.convertedEmail || <span className="text-[#6B6B75]">—</span>}
                      </td>
                      <td className="py-4 px-6 text-[#F5F5F7] text-[14px] max-w-sm truncate">
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

    </div>
  );
};
