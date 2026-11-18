import React, { useState } from 'react';
import {
  PhoneCall,
  Clock,
  CheckCircle2,
  Sparkles,
  Headphones,
  Check
} from 'lucide-react';
import { Lead, ColdCallLog, CallOutcome } from '../types';
import { PageHero } from '../components/ui/PageHero';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

interface ColdCallingViewProps {
  leads: Lead[];
  callLogs: ColdCallLog[];
  onUpdateLeads: (leads: Lead[]) => void;
  onAddCallLog: (log: ColdCallLog) => void;
  onSelectLead: (lead: Lead) => void;
}

export const ColdCallingView: React.FC<ColdCallingViewProps> = ({
  leads,
  callLogs,
  onUpdateLeads,
  onAddCallLog,
  onSelectLead
}) => {
  const phoneLeads = leads.filter(l => l.phone && !l.isDuplicate);
  const phoneFirstLeads = phoneLeads.filter(l => !l.email || l.callStatus === 'Pending');

  const [activeLeadId, setActiveLeadId] = useState<string>(
    phoneFirstLeads[0]?.id || phoneLeads[0]?.id || ''
  );

  const [capturedEmail, setCapturedEmail] = useState('');
  const [callNotes, setCallNotes] = useState('');
  const [isDialing, setIsDialing] = useState(false);
  const [dialDuration, setDialDuration] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);

  const activeLead = phoneLeads.find(l => l.id === activeLeadId) || phoneLeads[0];

  const handleStartCall = () => {
    setIsDialing(true);
    setDialDuration(1);
    const timer = setInterval(() => {
      setDialDuration(d => {
        if (d >= 45) {
          clearInterval(timer);
          return d;
        }
        return d + 1;
      });
    }, 1000);
  };

  const handleEndCall = (outcome: CallOutcome) => {
    if (!activeLead) return;
    setIsDialing(false);

    const newLog: ColdCallLog = {
      id: `call-log-${Date.now()}`,
      leadId: activeLead.id,
      companyName: activeLead.companyName,
      contactName: activeLead.contactName || 'Front Desk',
      phone: activeLead.phone,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }),
      outcome: outcome,
      notes: callNotes || `Logged outcome: ${outcome}`,
      convertedEmail: capturedEmail || undefined
    };

    const updated = leads.map(l => {
      if (l.id === activeLead.id) {
        return {
          ...l,
          callStatus: outcome,
          email: capturedEmail ? capturedEmail : l.email,
          emailStatus: capturedEmail ? 'Valid' as const : l.emailStatus,
          notes: callNotes ? `${l.notes || ''} | Call Note: ${callNotes}` : l.notes
        };
      }
      return l;
    });

    onUpdateLeads(updated);
    onAddCallLog(newLog);

    setNotification(
      capturedEmail
        ? `Upgraded with email ${capturedEmail} & added to Outreach!`
        : `Call logged: ${outcome}`
    );

    setCapturedEmail('');
    setCallNotes('');
    setDialDuration(0);

    setTimeout(() => setNotification(null), 3000);
  };

  const getTimezoneInfo = (state: string) => {
    if (state === 'Texas') return { zone: 'CST', current: '10:42 AM' };
    if (state === 'California') return { zone: 'PST', current: '08:42 AM' };
    if (state === 'New York') return { zone: 'EST', current: '11:42 AM' };
    if (state === 'Arizona') return { zone: 'MST', current: '09:42 AM' };
    return { zone: 'EST', current: '11:42 AM' };
  };

  const tz = activeLead ? getTimezoneInfo(activeLead.state) : getTimezoneInfo('Texas');

  return (
    <div className="space-y-10 animate-in fade-in duration-200">

      {notification && (
        <div className="fixed bottom-6 right-6 z-50 rounded-panel bg-[#161C25] border border-[rgba(47,191,143,0.3)] p-4 text-[14px] text-[#E5E9F0] shadow-lg flex items-center gap-2.5 animate-in slide-in-from-bottom-2">
          <Check className="h-4 w-4 text-[#2FBF8F] shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* 1. PAGE HERO (text-4xl, 1 sentence) */}
      <PageHero
        eyebrow="Voice Qualification"
        eyebrowIcon={<PhoneCall className="h-3.5 w-3.5 text-[#2FBF8F]" />}
        title="Showroom Cold Calling Queue"
        gradientWord="Calling"
        description="Dedicated calling desk for phone-first showroom leads with teleprompter script and instant email conversion."
        actions={
          <div className="flex items-center gap-2 h-10 px-3.5 rounded-full bg-[#10151C] border border-[rgba(148,163,184,0.12)] text-[13px] font-mono text-[#2FBF8F] whitespace-nowrap shrink-0">
            <span>{phoneLeads.length} Phone Leads in Queue</span>
          </div>
        }
      />

      {/* 2. SPLIT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Cards Queue (5 COLS) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-[15px] font-bold text-[#E5E9F0]">Lead Cards</h3>
            <span className="text-[12px] font-mono text-[#667085]">Click card to load</span>
          </div>

          <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
            {phoneLeads.map((lead) => {
              const isActive = lead.id === activeLeadId;
              const isPhoneOnly = !lead.email;

              return (
                <Card
                  key={lead.id}
                  interactive
                  padding="sm"
                  onClick={() => {
                    setActiveLeadId(lead.id);
                    setCapturedEmail('');
                    setCallNotes('');
                  }}
                  className={`border transition-all ${isActive
                      ? 'border-[#2FBF8F] bg-[#161C25]'
                      : 'border-[rgba(148,163,184,0.12)] hover:border-[rgba(148,163,184,0.22)]'
                    }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-[15px] font-semibold text-[#E5E9F0] truncate">
                          {lead.companyName}
                        </h4>
                        {isPhoneOnly && (
                          <span className="rounded-full bg-[rgba(201,166,107,0.12)] px-2 py-0.2 text-[10px] font-mono font-bold text-[#C9A66B] whitespace-nowrap shrink-0">
                            Phone Only
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] text-[#9AA4B2] truncate">
                        {lead.contactName} ({lead.title})
                      </p>
                    </div>

                    <Badge
                      variant={
                        lead.callStatus === 'Interested - Requested Email' ? 'success' :
                          lead.callStatus === 'Follow-up Scheduled' ? 'slate' :
                            lead.callStatus === 'Voicemail Left' ? 'warning' : 'neutral'
                      }
                      size="sm"
                    >
                      {lead.callStatus}
                    </Badge>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[rgba(148,163,184,0.08)] flex items-center justify-between text-[13px] font-mono">
                    <span className="text-[#2FBF8F] font-semibold">{lead.phone}</span>
                    <span className="text-[#667085]">{lead.city}, {lead.state}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Active Dialer & Teleprompter (7 COLS) */}
        {activeLead && (
          <div className="lg:col-span-7">
            <Card padding="md" className="space-y-6">

              {/* Target & Timezone */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[rgba(148,163,184,0.1)] gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[rgba(47,191,143,0.12)] text-[#2FBF8F]">
                    <Headphones className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[17px] font-bold text-[#E5E9F0] truncate">{activeLead.companyName}</h3>
                    <p className="text-[13px] text-[#9AA4B2] truncate">
                      {activeLead.contactName} ({activeLead.title}) • {activeLead.city}, {activeLead.state}
                    </p>
                  </div>
                </div>

                <div className="px-3.5 py-2 rounded-panel bg-[#161C25] flex items-center gap-2 text-[13px] shrink-0">
                  <Clock className="h-4 w-4 text-[#2FBF8F]" />
                  <span className="font-mono text-[#E5E9F0]">{tz.current} {tz.zone}</span>
                </div>
              </div>

              {/* Direct Phone & Dial Button */}
              <div className="p-4 rounded-panel bg-[#161C25] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-eyebrow text-[#667085]">
                    Direct Telephone
                  </span>
                  <p className="text-2xl font-bold font-mono text-[#2FBF8F] mt-0.5">
                    {activeLead.phone}
                  </p>
                </div>

                {isDialing ? (
                  <div className="flex items-center gap-2 h-10 px-4 rounded-control bg-[rgba(47,191,143,0.15)] text-[#2FBF8F] text-[13px] font-mono font-bold">
                    <span className="h-2 w-2 rounded-full bg-[#2FBF8F] animate-ping" />
                    <span>In Call: 00:{dialDuration < 10 ? `0${dialDuration}` : dialDuration}</span>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleStartCall}
                    icon={<PhoneCall className="h-4 w-4" />}
                  >
                    Start Phone Call
                  </Button>
                )}
              </div>

              {/* Teleprompter Script */}
              <div className="p-4 rounded-panel bg-[#07090C] border border-[rgba(124,141,181,0.2)] space-y-2.5 text-[14px]">
                <div className="flex items-center gap-1.5 text-[12px] font-mono font-bold uppercase tracking-eyebrow text-[#7C8DB5]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Teleprompter Script</span>
                </div>

                <div className="space-y-2 text-[#E5E9F0] leading-relaxed">
                  <p className="p-2.5 rounded-lg bg-[#10151C]">
                    <strong className="text-[#2FBF8F]">Opener:</strong> "Hello, my name is Rameshwar, calling from the Jaipur Artisan Collective in India. I was hoping to speak briefly with {activeLead.contactName} regarding your sound therapy inventory."
                  </p>
                  <p className="p-2.5 rounded-lg bg-[#10151C]">
                    <strong className="text-[#7C8DB5]">Pitch:</strong> "We supply handcrafted 7-metal Tibetan bowls tuned to 432Hz directly to showrooms across {activeLead.state} at 35% below US distributor rates with low 25-unit MOQ."
                  </p>
                  <p className="p-2.5 rounded-lg bg-[#10151C]">
                    <strong className="text-[#2FBF8F]">Email Ask:</strong> "What is the best procurement email to forward our 2026 Wholesale Export Catalog PDF with FOB pricing?"
                  </p>
                </div>
              </div>

              {/* Instant Email Capture */}
              <div className="p-4 rounded-panel bg-[#161C25] space-y-2.5">
                <span className="text-[12px] font-mono uppercase tracking-eyebrow text-[#2FBF8F] font-semibold">
                  Convert Phone Lead ➔ Verified Email Lead
                </span>

                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <input
                    type="email"
                    placeholder="Enter buyer email address..."
                    value={capturedEmail}
                    onChange={(e) => setCapturedEmail(e.target.value)}
                    className="w-full sm:flex-1 h-10 rounded-control bg-[#10151C] border border-[rgba(148,163,184,0.12)] px-3 text-[13px] font-mono text-[#E5E9F0] focus:outline-none focus:border-[#2FBF8F]"
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleEndCall('Interested - Requested Email')}
                    disabled={!capturedEmail}
                    className="shrink-0 w-full sm:w-auto"
                  >
                    Save & Promote Lead
                  </Button>
                </div>
              </div>

              {/* Call Notes & 44px Buttons */}
              <div className="space-y-3">
                <textarea
                  rows={2}
                  placeholder="Record call notes, bowl sizes discussed..."
                  value={callNotes}
                  onChange={(e) => setCallNotes(e.target.value)}
                  className="w-full rounded-control bg-[#161C25] border border-[rgba(148,163,184,0.12)] p-3 text-[13px] text-[#E5E9F0] placeholder-[#667085] focus:outline-none focus:border-[#2FBF8F] resize-none"
                />

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-11 px-4 border-[rgba(47,191,143,0.3)] text-[#2FBF8F] hover:bg-[rgba(47,191,143,0.1)]"
                    onClick={() => handleEndCall('Interested - Requested Email')}
                  >
                    Interested (Email Req)
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-11 px-4"
                    onClick={() => handleEndCall('Voicemail Left')}
                  >
                    Voicemail
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-11 px-4 border-[rgba(124,141,181,0.3)] text-[#7C8DB5]"
                    onClick={() => handleEndCall('Follow-up Scheduled')}
                  >
                    Follow-up
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-11 px-4 text-[#9AA4B2]"
                    onClick={() => handleEndCall('Gatekeeper Blocked')}
                  >
                    Gatekeeper
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="h-11 px-4"
                    onClick={() => handleEndCall('Not Interested')}
                  >
                    Not Interested
                  </Button>
                </div>
              </div>

            </Card>
          </div>
        )}

      </div>

      <div className="h-16" />

    </div>
  );
};
