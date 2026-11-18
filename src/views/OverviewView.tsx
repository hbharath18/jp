import React from 'react';
import {
  Users,
  CheckCircle2,
  Sparkles,
  Send,
  CopyX,
  MapPin,
  Building2,
  Flame,
  Activity,
  PhoneCall,
  FileText,
  Globe2,
  ArrowRight,
  TrendingUp,
  Ship,
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
  // Metrics
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
    <div className="space-y-12 sm:space-y-16 animate-in fade-in duration-300">

      {/* 1. PAGE HERO */}
      <PageHero
        eyebrow="Active Export Corridor // India ➔ United States"
        eyebrowIcon={<Flame className="h-4 w-4 text-[#F59E0B]" />}
        title="Singing Bowls & Home Decor Export Engine"
        gradientWord="Export"
        description="Configured for an Indian Export Mediator sourcing authentic 7-metal Tibetan acoustic bowls from Jaipur & Moradabad, discovering high-intent B2B showrooms, holistic distributors, and wellness chains across key US metro areas."
        actions={
          <>
            <Button
              variant="secondary"
              size="md"
              onClick={onOpenCatalog}
              icon={<FileText className="h-4 w-4 text-[#F59E0B]" />}
            >
              2026 Catalog Deck (4.2 MB)
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('discovery')}
              icon={<Activity className="h-4 w-4" />}
            >
              Launch Discovery Scan
            </Button>
          </>
        }
      />

      {/* 2. DEDICATED TRADE ROUTE & CORRIDOR CARD */}
      <Card padding="md" className="border-[#F59E0B]/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F59E0B]/12 border border-[#F59E0B]/25 text-[#F59E0B]">
              <Compass className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-[18px] font-bold text-[#F5F5F7]">
                  Jaipur & Moradabad Guild ➔ Port of Houston & Los Angeles
                </h3>
                <span className="hidden sm:inline-block rounded-full bg-white/[0.08] px-3 py-0.5 text-[13px] font-mono text-[#A1A1AA]">
                  HTS 9206.00
                </span>
              </div>
              <p className="text-[15px] text-[#A1A1AA] mt-1">
                LCL & FCL Ocean freight schedule: 26–28 days to US Gulf & West Coast ports. SGS inspected.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[14px] font-mono">
            <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#F5F5F7]">
              <span className="text-[#6B6B75]">Origin:</span> Jaipur, IN
            </div>
            <ArrowRight className="h-4 w-4 text-[#6B6B75] hidden sm:block" />
            <div className="px-4 py-2 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/25 text-[#F59E0B] font-bold">
              <span className="text-[#A1A1AA] font-normal">Destinations:</span> TX, CA, AZ, NY
            </div>
          </div>
        </div>
      </Card>

      {/* 3. BENTO GRID KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

        {/* Card 1: 2x1 Hero Card */}
        <StatCard
          isHero
          title="Total Discovered Leads"
          value={totalLeads}
          subValue="Verified US Prospects"
          badge={{ text: '+5 Today', variant: 'success' }}
          icon={<Users className="h-6 w-6" />}
          iconVariant="amber"
          description="Aggregated and cross-checked across Google Maps Places, Apollo LinkedIn buyers, and ImportYeti customs manifests."
          onClick={() => onNavigate('datamaster')}
        />

        {/* Card 2: Deliverable Emails */}
        <StatCard
          title="Validated Deliverable"
          value={validEmails}
          subValue={`(${validEmailPct}%)`}
          badge={{ text: 'Zero Bounce', variant: 'success' }}
          icon={<CheckCircle2 className="h-6 w-6" />}
          iconVariant="emerald"
          description="MX DNS pinged and syntax-checked with zero disposable address risk."
          onClick={() => onNavigate('datamaster')}
        />

        {/* Card 3: B2B Qualified (Gemini AI) */}
        <StatCard
          title="B2B Qualified Buyers"
          value={b2bQualified}
          subValue={`(${b2bPct}%)`}
          badge={{ text: 'Gemini 3.8', variant: 'indigo' }}
          icon={<Sparkles className="h-6 w-6" />}
          iconVariant="indigo"
          description="Commercial showrooms, wellness chains, and high-volume importers."
          onClick={() => onNavigate('gemini')}
        />

        {/* Card 4: Outreach Sent */}
        <StatCard
          title="Outreach Pitches Sent"
          value={outreachSent}
          subValue={`${repliesReceived} Replied`}
          badge={{ text: 'Active Throttle', variant: 'amber' }}
          icon={<Send className="h-6 w-6" />}
          iconVariant="cyan"
          description="Dispatched via Gmail API with 2026 Catalog attached."
          onClick={() => onNavigate('outreach')}
        />

        {/* Card 5: Duplicate Blocked */}
        <StatCard
          title="Duplicates Blocked"
          value={duplicateLeads.length}
          subValue="Flagged Records"
          badge={{ text: 'Domain Guard', variant: 'neutral' }}
          icon={<CopyX className="h-6 w-6" />}
          iconVariant="rose"
          description="Prevents double-email spamming to the same showroom domain or phone."
          onClick={() => onNavigate('datamaster')}
        />

      </div>

      {/* 4. STEPPER FUNNEL */}
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

      {/* 5. LOWER DUAL BENTO: GEOGRAPHY & HIGH-INTENT SHOWROOMS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left: US Geographic Clusters (5 COLS) */}
        <div className="lg:col-span-5">
          <Card padding="lg" className="h-full flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#F59E0B]/12 text-[#F59E0B]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#F5F5F7]">
                      Target Geographic Clusters
                    </h3>
                    <p className="text-[13px] text-[#A1A1AA] mt-0.5">
                      Country ➔ State ➔ City Narrowing Strategy
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { state: 'Texas', cities: 'Houston, Austin, Dallas', leads: 7, pct: '44%', flag: 'Port of Houston' },
                  { state: 'California', cities: 'Los Angeles, San Francisco, San Diego', leads: 4, pct: '25%', flag: 'Port of Long Beach' },
                  { state: 'Arizona', cities: 'Sedona, Phoenix', leads: 2, pct: '13%', flag: 'Vortex Sound Capital' },
                  { state: 'New York', cities: 'New York City, Brooklyn', leads: 2, pct: '13%', flag: 'Port of Newark' },
                  { state: 'Colorado', cities: 'Denver, Boulder', leads: 1, pct: '6%', flag: 'Rocky Mtn Distributor' },
                ].map((loc, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[#0E0E12] border border-white/[0.06] flex items-center justify-between hover:border-white/15 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-bold text-[#F5F5F7]">{loc.state}</span>
                        <span className="text-[13px] font-mono text-[#6B6B75]">({loc.flag})</span>
                      </div>
                      <p className="text-[13px] text-[#A1A1AA] mt-0.5">{loc.cities}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-[15px] font-bold text-[#F59E0B] font-mono">{loc.leads} leads</span>
                      <p className="text-[13px] text-[#6B6B75] font-mono">{loc.pct}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="secondary"
              size="md"
              className="w-full mt-4"
              onClick={() => onNavigate('discovery')}
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
            >
              Explore Drill-Down in Discovery
            </Button>
          </Card>
        </div>

        {/* Right: High-Intent B2B Showrooms (7 COLS) */}
        <div className="lg:col-span-7">
          <Card padding="lg" className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#6366F1]/12 text-[#A5B4FC]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-[#F5F5F7]">
                    High-Intent B2B Showrooms Ready for Pitch
                  </h3>
                  <p className="text-[13px] text-[#A1A1AA] mt-0.5">
                    Pre-cleared by Gemini 3.8 Flash for commercial wholesale volume
                  </p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('outreach')}
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              >
                Compose Campaign
              </Button>
            </div>

            <div className="space-y-3.5">
              {cleanLeads.filter(l => l.aiClassification === 'B2B Business Buyer').slice(0, 5).map((buyer) => (
                <div
                  key={buyer.id}
                  onClick={() => onSelectLead(buyer)}
                  className="group p-5 rounded-2xl bg-[#0E0E12] hover:bg-[#15151A] border border-white/[0.08] hover:border-[#F59E0B]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 text-[#F59E0B]">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h4 className="text-[16px] font-bold text-[#F5F5F7] group-hover:text-[#F59E0B] transition-colors">
                          {buyer.companyName}
                        </h4>
                        <span className="rounded-full bg-[#6366F1]/15 px-2.5 py-0.5 text-[12px] font-mono font-bold text-[#A5B4FC]">
                          {buyer.b2bConfidence}% Match
                        </span>
                      </div>
                      <p className="text-[14px] text-[#A1A1AA] mt-1">
                        {buyer.contactName} ({buyer.title}) • <span className="text-[#F5F5F7] font-medium">{buyer.city}, {buyer.state}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <Badge
                      variant={buyer.emailStatus === 'Valid' ? 'success' : 'warning'}
                      size="sm"
                    >
                      {buyer.emailStatus}
                    </Badge>
                    <ArrowRight className="h-4 w-4 text-[#6B6B75] group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>

            {/* Cold Call Alert Bar */}
            {phoneOnlyLeads > 0 && (
              <div className="p-5 rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <PhoneCall className="h-5 w-5 text-[#F59E0B] shrink-0" />
                  <p className="text-[14px] text-[#F5F5F7]">
                    <strong>{phoneOnlyLeads} Google Maps Showrooms</strong> currently have verified phone numbers awaiting cold call email capture.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onNavigate('dialer')}
                  className="shrink-0"
                >
                  Open Dialer Queue
                </Button>
              </div>
            )}
          </Card>
        </div>

      </div>

    </div>
  );
};
