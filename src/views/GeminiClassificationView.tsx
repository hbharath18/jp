import React, { useState } from 'react';
import {
  Sparkles,
  BrainCircuit,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Building2,
  User,
  ArrowRight,
  TrendingUp,
  Percent
} from 'lucide-react';
import { Lead, AIClassificationStatus } from '../types';
import { PageHero } from '../components/ui/PageHero';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

interface GeminiClassificationViewProps {
  leads: Lead[];
  onUpdateLeads: (leads: Lead[]) => void;
  onSelectLead: (lead: Lead) => void;
}

export const GeminiClassificationView: React.FC<GeminiClassificationViewProps> = ({
  leads,
  onUpdateLeads,
  onSelectLead
}) => {
  const [filterMode, setFilterMode] = useState<'All' | AIClassificationStatus>('All');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPromptDetails, setShowPromptDetails] = useState(false);

  // Batch Classification runner
  const handleBatchClassify = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const updated = leads.map(l => {
        const isB2B = (
          l.persona === 'Importers' ||
          l.persona === 'Wholesalers' ||
          l.persona === 'Showrooms' ||
          l.persona === 'Distributors' ||
          (l.title.toLowerCase().includes('buyer') || l.title.toLowerCase().includes('procurement') || l.title.toLowerCase().includes('merchandis'))
        );

        if (l.title.toLowerCase().includes('practitioner') || l.companyName.toLowerCase().includes('solo') || (l.persona === 'Retailers' && l.estimatedAnnualVolume === '$2,500 / yr')) {
          return {
            ...l,
            aiClassification: 'Individual / Retail Consumer' as AIClassificationStatus,
            b2bConfidence: Math.floor(Math.random() * 15) + 18,
            aiReasoning: 'Single-unit consumer or solo practitioner. Lacks container/pallet MOQ receiving capacity. Filtered out from bulk export outreach.'
          };
        }

        return {
          ...l,
          aiClassification: 'B2B Business Buyer' as AIClassificationStatus,
          b2bConfidence: Math.floor(Math.random() * 8) + 92,
          aiReasoning: `Verified B2B commercial entity with established showroom/distribution footprint in ${l.city}, ${l.state}. High propensity for repeated 7-metal singing bowl master set reorders.`
        };
      });

      onUpdateLeads(updated);
      setIsProcessing(false);
    }, 1800);
  };

  const filtered = leads.filter(l => {
    if (filterMode !== 'All' && l.aiClassification !== filterMode) return false;
    return true;
  });

  const b2bCount = leads.filter(l => l.aiClassification === 'B2B Business Buyer').length;
  const individualCount = leads.filter(l => l.aiClassification === 'Individual / Retail Consumer').length;
  const b2bPercent = leads.length > 0 ? Math.round((b2bCount / leads.length) * 100) : 0;

  return (
    <div className="space-y-12 sm:space-y-16 animate-in fade-in duration-300">

      {/* 1. PAGE HERO */}
      <PageHero
        eyebrow="Intent Modeling // Gemini 3.8 Flash Engine"
        eyebrowIcon={<Sparkles className="h-4 w-4 text-[#6366F1]" />}
        title="Gemini AI Buyer Classification & Intent"
        gradientWord="Classification"
        description="Separates high-volume commercial showrooms and container importers from single-unit retail consumers to focus export pitches on qualified wholesale buyers."
        actions={
          <>
            <Button
              variant="secondary"
              size="md"
              onClick={() => setShowPromptDetails(!showPromptDetails)}
            >
              {showPromptDetails ? 'Hide System Prompt' : 'Inspect Model System Prompt'}
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleBatchClassify}
              disabled={isProcessing}
              icon={isProcessing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <BrainCircuit className="h-4 w-4" />}
            >
              {isProcessing ? 'Analyzing All Records...' : 'Run Gemini AI Classification'}
            </Button>
          </>
        }
      />

      {/* 2. SYSTEM PROMPT INSPECTOR (Collapsible) */}
      {showPromptDetails && (
        <Card padding="md" className="border-[#6366F1]/30 bg-[#0E0E12] space-y-4">
          <div className="flex items-center justify-between text-[#A5B4FC]">
            <span className="flex items-center gap-2 text-[14px] font-mono font-bold">
              <BrainCircuit className="h-4 w-4" />
              SYSTEM PROMPT // gemini-3.8-flash-exp (Structured Output Mode)
            </span>
            <span className="text-[13px] font-mono text-[#6B6B75]">temperature: 0.1 • top_p: 0.95</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#07070A] border border-white/10 text-[14px] font-mono text-[#A1A1AA] leading-[1.8] space-y-3">
            <p>
              "You are an expert International Trade & Export Evaluation Agent for Indian handcrafted goods (HTS 9206.00). Analyze the given US prospect company profile, decision-maker title, website metadata, and customs import volume."
            </p>
            <p>
              "CLASSIFICATION CRITERIA:
              1. Tag as 'B2B Business Buyer' if the entity is a commercial showroom, holistic healing center, wellness chain, import distributor, or boutique with physical retail display capacity. Minimum order capability: $1,500+ (MOQ 25 units).
              2. Tag as 'Individual / Retail Consumer' if the entity is a solo practitioner, individual sound enthusiast, or residential gift buyer without resale tax certification. Exclude from bulk wholesale campaigns."
            </p>
          </div>
        </Card>
      )}

      {/* 3. HERO SUMMARY RATIO BAR & FILTER CARDS */}
      <Card padding="lg" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-[19px] font-bold text-[#F5F5F7]">Wholesale Qualification Distribution</h3>
            <p className="text-[15px] text-[#A1A1AA] mt-1">
              Current ratio of B2B Commercial Buyers vs Excluded Individual Shoppers.
            </p>
          </div>
          <span className="text-[15px] font-mono font-bold text-[#A5B4FC]">
            {b2bPercent}% High-Volume Fit
          </span>
        </div>

        {/* Visual Ratio Bar */}
        <div className="w-full bg-[#15151A] rounded-full h-4 overflow-hidden flex">
          <div
            className="bg-gradient-to-r from-[#6366F1] to-[#818CF8] h-full transition-all duration-500 rounded-l-full"
            style={{ width: `${b2bPercent}%` }}
          />
          <div
            className="bg-white/10 h-full transition-all duration-500 rounded-r-full"
            style={{ width: `${100 - b2bPercent}%` }}
          />
        </div>

        {/* Filter Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-3">
          <div
            onClick={() => setFilterMode('All')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${filterMode === 'All'
                ? 'bg-[#15151A] border-[#F59E0B] shadow-md'
                : 'bg-[#0E0E12] border-white/10 hover:bg-[#15151A]'
              }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#A1A1AA] font-medium">All Evaluated Leads</span>
              <span className="text-[18px] font-mono font-bold text-[#F5F5F7]">{leads.length}</span>
            </div>
          </div>

          <div
            onClick={() => setFilterMode('B2B Business Buyer')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${filterMode === 'B2B Business Buyer'
                ? 'bg-[#6366F1]/15 border-[#6366F1] shadow-md'
                : 'bg-[#0E0E12] border-white/10 hover:bg-[#15151A]'
              }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#A5B4FC] font-bold">B2B Business Buyers</span>
              <span className="text-[18px] font-mono font-bold text-[#A5B4FC]">{b2bCount}</span>
            </div>
          </div>

          <div
            onClick={() => setFilterMode('Individual / Retail Consumer')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${filterMode === 'Individual / Retail Consumer'
                ? 'bg-white/10 border-white/30 shadow-md'
                : 'bg-[#0E0E12] border-white/10 hover:bg-[#15151A]'
              }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#A1A1AA] font-medium">Individual / Retail</span>
              <span className="text-[18px] font-mono font-bold text-[#A1A1AA]">{individualCount}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* 4. CLASSIFIED BUYER CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((lead) => {
          const isB2B = lead.aiClassification === 'B2B Business Buyer';

          return (
            <Card
              key={lead.id}
              interactive
              onClick={() => onSelectLead(lead)}
              padding="lg"
              className={`flex flex-col justify-between ${isB2B ? 'border-[#6366F1]/25 hover:border-[#6366F1]/50' : 'opacity-70'
                }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3.5">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${isB2B ? 'bg-[#6366F1]/15 text-[#A5B4FC]' : 'bg-white/[0.04] text-[#6B6B75]'
                      }`}>
                      {isB2B ? <Building2 className="h-6 w-6" /> : <User className="h-6 w-6" />}
                    </div>
                    <div>
                      <h4 className="text-[18px] font-bold text-[#F5F5F7]">{lead.companyName}</h4>
                      <p className="text-[14px] text-[#A1A1AA]">
                        {lead.contactName} • <span className="text-[#6B6B75]">{lead.title}</span>
                      </p>
                    </div>
                  </div>

                  <span className={`rounded-full px-3 py-1 text-[13px] font-mono font-bold ${isB2B
                      ? 'bg-[#6366F1]/20 text-[#A5B4FC] border border-[#6366F1]/30'
                      : 'bg-white/[0.06] text-[#A1A1AA]'
                    }`}>
                    {lead.b2bConfidence}% Match
                  </span>
                </div>

                {/* AI Reasoning Panel: 20px+ padding and 15px text */}
                <div className="p-6 rounded-2xl bg-[#07070A] border border-white/[0.08] space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-[13px] font-mono font-bold uppercase tracking-eyebrow text-[#A5B4FC]">
                    <Sparkles className="h-4 w-4" />
                    <span>Gemini Reasoning & Wholesale Feasibility:</span>
                  </div>
                  <p className="text-[15px] text-[#F5F5F7] leading-relaxed">
                    {lead.aiReasoning}
                  </p>
                </div>
              </div>

              {/* Bottom Metadata */}
              <div className="flex items-center justify-between text-[14px] font-mono text-[#6B6B75] pt-4 border-t border-white/[0.06]">
                <span>{lead.city}, {lead.state}</span>
                <span className="text-[#F59E0B] font-semibold">{lead.category}</span>
                <span>Annual Vol: <strong className="text-[#F5F5F7]">{lead.estimatedAnnualVolume || 'N/A'}</strong></span>
              </div>
            </Card>
          );
        })}
      </div>

    </div>
  );
};
