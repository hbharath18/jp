import React from 'react';
import { 
  Users, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  CopyX, 
  MapPin, 
  Building2, 
  Activity, 
  PhoneCall, 
  FileText, 
  ArrowRight,
  Compass
} from 'lucide-react';
import { Lead, SentEmailLog, ColdCallLog } from '../types';
import { PipelineFunnel } from '../components/PipelineFunnel';
import { NavTab } from '../components/Sidebar';
import { PageHero } from '../components/ui/PageHero';
import { StatCard } from '../components/ui/StatCard';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

interface OverviewViewProps {
  leads: Lead[];
  emailLogs: SentEmailLog[];
  callLogs: ColdCallLog[];
  onNavigate: (tab: NavTab) => void;
  onOpenCatalog: () => void;
  onSelectLead: (lead: Lead) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  leads,
  emailLogs,
  callLogs,
  onNavigate,
  onOpenCatalog,
  onSelectLead
}) => {
  const totalLeads = leads.length;
  const duplicateLeads = leads.filter(l => l.isDuplicate);
  const cleanLeads = leads.filter(l => !l.isDuplicate);
  
  const validEmails = cleanLeads.filter(l => l.emailStatus === 'Valid').length;
  const validEmailPct = cleanLeads.length > 0 ? Math.round((validEmails / cleanLeads.length) * 100) : 0;
  
  const b2bQualified = cleanLeads.filter(l => l.aiClassification === 'B2B Business Buyer').length;
  const b2bPct = cleanLeads.length > 0 ? Math.round((b2bQualified / cleanLeads.length) * 100) : 0;
  
  const outreachSent = cleanLeads.filter(l => l.outreachStatus !== 'Not Contacted').length;
  const phoneOnlyLeads = cleanLeads.filter(l => !l.email && l.phone).length;
  const repliesReceived = emailLogs.filter(e => e.deliveryStatus === 'Replied').length;

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      
      {/* 1. PAGE HERO (Max 1 short sentence, text-4xl) */}
      <PageHero
        eyebrow="Corridor Pipeline // India ➔ US"
        eyebrowIcon={<Compass className="h-3.5 w-3.5 text-[#2FBF8F]" />}
        title="Singing Bowls & Home Decor Export Engine"
        gradientWord="Export"
        description="Autonomous buyer discovery, deliverability verification, and outreach pipeline for handcrafted Indian goods."
        actions={
          <>
            <Button
              variant="secondary"
              size="md"
              onClick={onOpenCatalog}
              icon={<FileText className="h-4 w-4 text-[#2FBF8F]" />}
            >
              Catalog Deck
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('discovery')}
              icon={<Activity className="h-4 w-4" />}
            >
              Discovery Scan
            </Button>
          </>
        }
      />

      {/* 2. DEDICATED TRADE ROUTE CARD */}
      <Card padding="sm" className="border-[rgba(148,163,184,0.12)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(47,191,143,0.12)] text-[#2FBF8F]">
              <Compass className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-[15px] font-bold text-[#E5E9F0] truncate">
                Jaipur / Moradabad Guild ➔ Port of Houston & Los Angeles
              </h3>
              <p className="text-[13px] text-[#9AA4B2] truncate">
                HTS 9206.00 • 26–28 days ocean container transit • SGS inspection certified
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[13px] font-mono shrink-0">
            <span className="px-3 py-1 rounded-control bg-[#161C25] text-[#E5E9F0]">Jaipur (IN)</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#667085]" />
            <span className="px-3 py-1 rounded-control bg-[rgba(47,191,143,0.12)] text-[#2FBF8F] font-bold">
              TX, CA, AZ, NY
            </span>
          </div>
        </div>
      </Card>

      {/* 3. BENTO KPI CARDS (28-32px padding, clean typography) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        
        <StatCard
          isHero
          title="Discovered Leads"
          value={totalLeads}
          subValue="Verified US Prospects"
          badge={{ text: '+5 Today', variant: 'success' }}
          icon={<Users className="h-5 w-5" />}
          iconVariant="emerald"
          description="Aggregated and cross-checked across Google Places, Apollo, and ImportYeti."
          onClick={() => onNavigate('datamaster')}
        />

        <StatCard
          title="Deliverable Emails"
          value={validEmails}
          subValue={`(${validEmailPct}%)`}
          badge={{ text: 'Zero Bounce', variant: 'success' }}
          icon={<CheckCircle2 className="h-5 w-5" />}
          iconVariant="emerald"
          description="MX DNS verified deliverable addresses."
          onClick={() => onNavigate('datamaster')}
        />

        <StatCard
          title="B2B Qualified"
          value={b2bQualified}
          subValue={`(${b2bPct}%)`}
          badge={{ text: 'Gemini 3.8', variant: 'slate' }}
          icon={<Sparkles className="h-5 w-5" />}
          iconVariant="slate"
          description="Commercial showrooms and wholesale distributors."
          onClick={() => onNavigate('gemini')}
        />

        <StatCard
          title="Outreach Sent"
          value={outreachSent}
          subValue={`${repliesReceived} Replied`}
          badge={{ text: 'Active Throttle', variant: 'neutral' }}
          icon={<Send className="h-5 w-5" />}
          iconVariant="slate"
          description="Gmail API proposals with catalog attached."
          onClick={() => onNavigate('outreach')}
        />

        <StatCard
          title="Duplicates Blocked"
          value={duplicateLeads.length}
          subValue="Protected"
          badge={{ text: 'Domain Guard', variant: 'neutral' }}
          icon={<CopyX className="h-5 w-5" />}
          iconVariant="danger"
          description="Prevents duplicate pitches to the same business."
          onClick={() => onNavigate('datamaster')}
        />

      </div>

      {/* 4. WORKFLOW FUNNEL */}
      <PipelineFunnel
        onSelectStage={onNavigate}
        stats={{
          totalRaw: totalLeads,
          deduped: cleanLeads.length,
          validEmails: validEmails,
          b2bQualified: b2bQualified,
          outreachSent: outreachSent,
          conversions: outreachSent + emailLogs.filter(e => e.deliveryStatus === 'Opened' || e.deliveryStatus === 'Replied').length
        }}
      />

      {/* 5. GEOGRAPHY & PRIORITY LEADS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: US Metro Clusters (5 COLS) */}
        <div className="lg:col-span-5">
          <Card padding="md" className="h-full flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(148,163,184,0.1)] mb-4">
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-[#2FBF8F]" />
                  <h3 className="text-[16px] font-bold text-[#E5E9F0]">
                    US Metro Target Hubs
                  </h3>
                </div>
              </div>

              <div className="space-y-2.5">
                {[
                  { state: 'Texas', cities: 'Houston, Austin, Dallas', leads: 7, flag: 'Port of Houston' },
                  { state: 'California', cities: 'Los Angeles, San Francisco', leads: 4, flag: 'Port of Long Beach' },
                  { state: 'Arizona', cities: 'Sedona, Phoenix', leads: 2, flag: 'Vortex Sound Capital' },
                  { state: 'New York', cities: 'New York City, Brooklyn', leads: 2, flag: 'Port of Newark' },
                  { state: 'Colorado', cities: 'Denver, Boulder', leads: 1, flag: 'Rocky Mtn Hub' },
                ].map((loc, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-panel bg-[#161C25] flex items-center justify-between text-[13px]"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#E5E9F0]">{loc.state}</span>
                        <span className="text-[11px] font-mono text-[#667085]">({loc.flag})</span>
                      </div>
                      <p className="text-[12px] text-[#9AA4B2]">{loc.cities}</p>
                    </div>

                    <span className="font-mono font-bold text-[#2FBF8F]">{loc.leads} leads</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="secondary"
              size="sm"
              className="w-full mt-2"
              onClick={() => onNavigate('discovery')}
              icon={<ArrowRight className="h-3.5 w-3.5" />}
              iconPosition="right"
            >
              Configure in Discovery
            </Button>
          </Card>
        </div>

        {/* Right: High-Intent Showrooms (7 COLS) */}
        <div className="lg:col-span-7">
          <Card padding="md" className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(148,163,184,0.1)]">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-[#7C8DB5]" />
                <h3 className="text-[16px] font-bold text-[#E5E9F0]">
                  High-Intent B2B Showrooms
                </h3>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('outreach')}
                icon={<ArrowRight className="h-3.5 w-3.5" />}
                iconPosition="right"
              >
                Compose Campaign
              </Button>
            </div>

            <div className="space-y-2.5">
              {cleanLeads.filter(l => l.aiClassification === 'B2B Business Buyer').slice(0, 5).map((buyer) => (
                <div
                  key={buyer.id}
                  onClick={() => onSelectLead(buyer)}
                  className="p-3.5 rounded-panel bg-[#161C25] hover:bg-[#1B222D] border border-[rgba(148,163,184,0.08)] hover:border-[rgba(148,163,184,0.2)] flex items-center justify-between gap-3 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[rgba(47,191,143,0.1)] text-[#2FBF8F]">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-[14px] font-bold text-[#E5E9F0] truncate">
                          {buyer.companyName}
                        </h4>
                        <span className="rounded-full bg-[rgba(124,141,181,0.15)] px-2 py-0.2 text-[11px] font-mono font-bold text-[#7C8DB5] whitespace-nowrap shrink-0">
                          {buyer.b2bConfidence}%
                        </span>
                      </div>
                      <p className="text-[12px] text-[#9AA4B2] truncate">
                        {buyer.contactName} • {buyer.city}, {buyer.state}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      variant={buyer.emailStatus === 'Valid' ? 'success' : 'warning'}
                      size="sm"
                    >
                      {buyer.emailStatus}
                    </Badge>
                    <ArrowRight className="h-3.5 w-3.5 text-[#667085]" />
                  </div>
                </div>
              ))}
            </div>

            {phoneOnlyLeads > 0 && (
              <div className="p-3.5 rounded-panel bg-[#161C25] border border-[rgba(201,166,107,0.25)] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-[13px] text-[#E5E9F0]">
                  <PhoneCall className="h-4 w-4 text-[#C9A66B] shrink-0" />
                  <span>
                    <strong>{phoneOnlyLeads} phone leads</strong> in queue for direct calling.
                  </span>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onNavigate('dialer')}
                  className="shrink-0"
                >
                  Dialer Queue
                </Button>
              </div>
            )}
          </Card>
        </div>

      </div>

    </div>
  );
};
