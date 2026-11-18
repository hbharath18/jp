import React, { useState } from 'react';
import {
  PhoneCall,
  PhoneForwarded,
  Clock,
  Building2,
  CheckCircle2,
  Sparkles,
  Headphones,
  Send,
  Calendar,
  MessageSquare,
  ShieldCheck,
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
        ? `Lead successfully upgraded with email ${capturedEmail} & added to Gmail Outreach!`
        : `Call logged: ${outcome}`
    );

    setCapturedEmail('');
    setCallNotes('');
    setDialDuration(0);

    setTimeout(() => setNotification(null), 4000);
  };

  const getTimezoneInfo = (state: string) => {
    if (state === 'Texas') return { zone: 'CST (UTC-6)', city: 'Houston / Austin', current: '10:42 AM' };
    if (state === 'California') return { zone: 'PST (UTC-8)', city: 'Los Angeles / SF', current: '08:42 AM' };
    if (state === 'New York') return { zone: 'EST (UTC-5)', city: 'New York City', current: '11:42 AM' };
    if (state === 'Arizona') return { zone: 'MST (UTC-7)', city: 'Sedona (No DST)', current: '09:42 AM' };
    return { zone: 'EST (UTC-5)', city: 'US Metro', current: '11:42 AM' };
  };

  const tz = activeLead ? getTimezoneInfo(activeLead.state) : getTimezoneInfo('Texas');

  return (
    <div className="space-y-12 sm:space-y-16 animate-in fade-in duration-300">

      {/* Toast Alert */}
      {notification && (
        <div className="fixed bottom-8 right-8 z-50 rounded-2xl bg-[#0E0E12] border border-[#34D399]/40 p-5 text-[15px] text-[#F5F5F7] shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-3">
          <Check className="h-5 w-5 text-[#34D399] shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* 1. PAGE HERO */}
      <PageHero
        eyebrow="Voice Conversion // Cold Calling Queue"
        eyebrowIcon={<PhoneCall className="h-4 w-4 text-[#34D399]" />}
        title="Showroom Cold Calling & Email Capture Desk"
        gradientWord="Calling"
        description="Dedicated calling station for phone-only Google Maps showroom leads. Includes teleprompter scripts, local US timezone clocks, and 1-click email capture."
        actions={
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#34D399]/15 border border-[#34D399]/30 px-4 py-2 text-[14px] font-mono font-bold text-[#34D399]">
              Queue: {phoneLeads.length} Phone Leads
            </span>
          </div>
        }
      />

      {/* 2. SPLIT LAYOUT: QUEUE CARDS (5 COLS) + ACTIVE STATION (7 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT COLUMN: CARD-BASED QUEUE (NOT A DENSE TABLE) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-[17px] font-bold text-[#F5F5F7]">Prospect Call Cards</h3>
            <span className="text-[13px] font-mono text-[#6B6B75]">Select card to dial</span>
          </div>

          <div className="space-y-4 max-h-[720px] overflow-y-auto pr-1">
            {phoneLeads.map((lead) => {
              const isActive = lead.id === activeLeadId;
              const isPhoneOnly = !lead.email;

              return (
                <Card
                  key={lead.id}
                  interactive
                  padding="md"
                  onClick={() => {
                    setActiveLeadId(lead.id);
                    setCapturedEmail('');
                    setCallNotes('');
                  }}
                  className={`border transition-all ${isActive
                      ? 'border-[#34D399] bg-[#0E0E12] shadow-[0_0_30px_-8px_rgba(52,211,153,0.3)]'
                      : 'border-white/10 hover:border-white/20'
                    }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-[16px] font-bold text-[#F5F5F7]">
                          {lead.companyName}
                        </h4>
                        {isPhoneOnly && (
                          <span className="rounded-full bg-[#F59E0B]/15 px-2.5 py-0.5 text-[11px] font-mono font-bold text-[#F59E0B]">
                            Phone Only
                          </span>
                        )}
                      </div>
                      <p className="text-[14px] text-[#A1A1AA] mt-0.5">
                        {lead.contactName} ({lead.title})
                      </p>
                    </div>

                    <Badge
                      variant={
                        lead.callStatus === 'Interested - Requested Email' ? 'success' :
                          lead.callStatus === 'Follow-up Scheduled' ? 'indigo' :
                            lead.callStatus === 'Voicemail Left' ? 'warning' : 'neutral'
                      }
                      size="sm"
                    >
                      {lead.callStatus}
                    </Badge>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[14px] font-mono">
                    <span className="text-[#34D399] font-bold">{lead.phone}</span>
                    <span className="text-[#6B6B75]">{lead.city}, {lead.state}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE DIALER & TELEPROMPTER STATION */}
        {activeLead && (
          <div className="lg:col-span-7">
            <Card padding="lg" className="space-y-8">

              {/* Active Target Header & Timezone */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#34D399]/15 border border-[#34D399]/30 text-[#34D399]">
                    <Headphones className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-[20px] font-bold text-[#F5F5F7]">{activeLead.companyName}</h3>
                    <p className="text-[14px] text-[#A1A1AA] mt-0.5">
                      Contact: <strong className="text-[#F5F5F7]">{activeLead.contactName}</strong> ({activeLead.title}) • {activeLead.city}, {activeLead.state}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0E0E12] border border-white/10 flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[#F59E0B]" />
                  <div>
                    <p className="font-mono font-bold text-[#F5F5F7] text-[15px]">{tz.current} {tz.zone}</p>
                    <p className="text-[12px] text-[#34D399] font-semibold">Calling Window Open</p>
                  </div>
                </div>
              </div>

              {/* Direct Dialing Box & Live Simulated Call Button */}
              <div className="p-6 rounded-2xl bg-[#0E0E12] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="text-[13px] font-mono uppercase tracking-eyebrow text-[#6B6B75]">
                    US Telephone Direct Line
                  </span>
                  <p className="text-2xl sm:text-3xl font-extrabold font-mono text-[#34D399] mt-1">
                    {activeLead.phone}
                  </p>
                  <p className="text-[14px] text-[#A1A1AA] mt-1">
                    Persona: {activeLead.persona} Showroom Desk
                  </p>
                </div>

                {isDialing ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 h-[52px] px-6 rounded-control bg-[#34D399]/20 border border-[#34D399]/40 text-[#34D399] text-[15px] font-mono font-bold">
                      <span className="h-3 w-3 rounded-full bg-[#34D399] animate-ping" />
                      <span>In Call: 00:{dialDuration < 10 ? `0${dialDuration}` : dialDuration}</span>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleStartCall}
                    icon={<PhoneCall className="h-4 w-4" />}
                  >
                    Start Phone Call
                  </Button>
                )}
              </div>

              {/* TELEPROMPTER SCRIPT */}
              <div className="p-6 rounded-2xl bg-[#07070A] border border-[#6366F1]/30 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-mono font-bold uppercase tracking-eyebrow text-[#A5B4FC] flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Teleprompter Pitch Script // Jaipur Artisan Guild
                  </span>
                </div>

                <div className="space-y-3 text-[15px] text-[#F5F5F7] leading-[1.8] font-sans">
                  <p className="p-4 rounded-xl bg-[#0E0E12] border border-white/[0.06]">
                    <strong className="text-[#F59E0B]">Opener:</strong> "Hello, good morning! My name is Rameshwar, calling from the Jaipur Artisan Guild in India. I was hoping to speak briefly with {activeLead.contactName} or whoever oversees your sound healing and singing bowl inventory."
                  </p>
                  <p className="p-4 rounded-xl bg-[#0E0E12] border border-white/[0.06]">
                    <strong className="text-[#34D399]">Value Pitch:</strong> "We supply handcrafted 7-metal Tibetan sound bowls tuned to 432Hz directly to showrooms across {activeLead.state}. Because we forge them in our own artisan collective, our wholesale prices are 35-40% below US distributors, with low MOQ of just 25 units."
                  </p>
                  <p className="p-4 rounded-xl bg-[#0E0E12] border border-white/[0.06]">
                    <strong className="text-[#A5B4FC]">The Email Capture:</strong> "I’d love to send you our 2026 Wholesale Export Catalog PDF with FOB & DDP pricing to {activeLead.city}. What is the best direct email address to forward the catalog to?"
                  </p>
                </div>
              </div>

              {/* INSTANT EMAIL CAPTURE & CONVERSION */}
              <div className="p-6 rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 space-y-4">
                <div>
                  <h4 className="text-[16px] font-bold text-[#F59E0B] font-display">
                    Convert Phone Lead ➔ Verified Email Lead
                  </h4>
                  <p className="text-[14px] text-[#A1A1AA] mt-0.5">
                    Save the captured email to immediately upgrade this prospect and dispatch the catalog deck.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="email"
                    placeholder="Enter captured buyer email (e.g. buyer@showroom.com)..."
                    value={capturedEmail}
                    onChange={(e) => setCapturedEmail(e.target.value)}
                    className="w-full sm:flex-1 h-[52px] rounded-control bg-[#0E0E12] border border-white/10 px-5 text-[15px] font-mono text-[#F5F5F7] placeholder-[#6B6B75] focus:outline-none focus:border-[#F59E0B]"
                  />
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => handleEndCall('Interested - Requested Email')}
                    disabled={!capturedEmail}
                    className="shrink-0 w-full sm:w-auto"
                  >
                    Save & Promote Lead
                  </Button>
                </div>
              </div>

              {/* Notes & 44px Outcome Action Button Group */}
              <div className="space-y-4">
                <label className="block text-[13px] font-mono uppercase tracking-eyebrow text-[#A1A1AA] font-semibold">
                  Call Notes / Outcome Logging
                </label>
                <textarea
                  rows={3}
                  placeholder="Record bowl sizes requested (7-inch chakra, 12-inch gong), follow-up timelines..."
                  value={callNotes}
                  onChange={(e) => setCallNotes(e.target.value)}
                  className="w-full rounded-2xl bg-[#0E0E12] border border-white/10 p-4 text-[15px] text-[#F5F5F7] placeholder-[#6B6B75] focus:outline-none focus:border-[#F59E0B] resize-none leading-relaxed font-sans"
                />

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-11 px-5 border-[#34D399]/40 text-[#34D399] hover:bg-[#34D399]/15"
                    onClick={() => handleEndCall('Interested - Requested Email')}
                  >
                    Interested (Requested Email)
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-11 px-5"
                    onClick={() => handleEndCall('Voicemail Left')}
                  >
                    Voicemail Left
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-11 px-5 border-[#6366F1]/40 text-[#A5B4FC] hover:bg-[#6366F1]/15"
                    onClick={() => handleEndCall('Follow-up Scheduled')}
                  >
                    Follow-up Scheduled
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-11 px-5 text-[#A1A1AA]"
                    onClick={() => handleEndCall('Gatekeeper Blocked')}
                  >
                    Gatekeeper Blocked
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="h-11 px-5"
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

    </div>
  );
};
