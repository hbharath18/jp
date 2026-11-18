import React, { useState } from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  RefreshCw, 
  Building2, 
  User 
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

  const handleBatchClassify = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const updated = leads.map(l => {
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
    }, 1500);
  };

  const filtered = leads.filter(l => {
    if (filterMode !== 'All' && l.aiClassification !== filterMode) return false;
    return true;
  });

  const b2bCount = leads.filter(l => l.aiClassification === 'B2B Business Buyer').length;
  const individualCount = leads.filter(l => l.aiClassification === 'Individual / Retail Consumer').length;
  const b2bPercent = leads.length > 0 ? Math.round((b2bCount / leads.length) * 100) : 0;

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      
      {/* 1. PAGE HERO (text-4xl, 1 sentence) */}
      <PageHero
        eyebrow="Gemini 3.8 Flash Classifier"
        eyebrowIcon={<Sparkles className="h-3.5 w-3.5 text-[#2FBF8F]" />}
        title="AI Buyer Intent Classification"
        gradientWord="Classification"
        description="Separates high-volume commercial showrooms from single-unit retail consumers."
        actions={
          <>
            <Button
              variant="secondary"
              size="md"
              onClick={() => setShowPromptDetails(!showPromptDetails)}
            >
              {showPromptDetails ? 'Hide Prompt' : 'Inspect Prompt'}
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleBatchClassify}
              disabled={isProcessing}
              icon={isProcessing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <BrainCircuit className="h-4 w-4" />}
            >
              {isProcessing ? 'Analyzing...' : 'Re-Run Classification'}
            </Button>
          </>
        }
      />

      {/* 2. SYSTEM PROMPT (Collapsible) */}
      {showPromptDetails && (
        <Card padding="sm" className="bg-[#10151C] border-[rgba(124,141,181,0.25)] space-y-2 text-[13px] font-mono">
          <div className="flex items-center justify-between text-[#7C8DB5]">
            <span>SYSTEM PROMPT // gemini-3.8-flash-exp</span>
            <span className="text-[#667085]">temperature: 0.1</span>
          </div>
          <p className="text-[#9AA4B2] leading-relaxed">
            "Classify US prospect into 'B2B Business Buyer' (showrooms, wellness centers, distributors with $1,500+ MOQ capability) vs 'Individual / Retail Consumer' (solo practitioners or retail consumers)."
          </p>
        </Card>
      )}

      {/* 3. RATIO BAR & FILTERS */}
      <Card padding="md" className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-bold text-[#E5E9F0]">Wholesale Fit Distribution</h3>
          <span className="text-[14px] font-mono font-bold text-[#2FBF8F]">
            {b2bPercent}% B2B Commercial
          </span>
        </div>

        <div className="w-full bg-[#161C25] rounded-full h-3 overflow-hidden flex">
          <div
            className="bg-[#2FBF8F] h-full transition-all duration-300 rounded-l-full"
            style={{ width: `${b2bPercent}%` }}
          />
          <div
            className="bg-[#161C25] h-full transition-all duration-300 rounded-r-full"
            style={{ width: `${100 - b2bPercent}%` }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div
            onClick={() => setFilterMode('All')}
            className={`p-3.5 rounded-panel border cursor-pointer transition-all ${
              filterMode === 'All'
                ? 'bg-[#161C25] border-[#2FBF8F]'
                : 'bg-[#10151C] border-[rgba(148,163,184,0.12)]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#9AA4B2]">All Evaluated</span>
              <span className="font-mono font-bold text-[#E5E9F0]">{leads.length}</span>
            </div>
          </div>

          <div
            onClick={() => setFilterMode('B2B Business Buyer')}
            className={`p-3.5 rounded-panel border cursor-pointer transition-all ${
              filterMode === 'B2B Business Buyer'
                ? 'bg-[rgba(47,191,143,0.12)] border-[#2FBF8F]'
                : 'bg-[#10151C] border-[rgba(148,163,184,0.12)]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#2FBF8F] font-semibold">B2B Showrooms</span>
              <span className="font-mono font-bold text-[#2FBF8F]">{b2bCount}</span>
            </div>
          </div>

          <div
            onClick={() => setFilterMode('Individual / Retail Consumer')}
            className={`p-3.5 rounded-panel border cursor-pointer transition-all ${
              filterMode === 'Individual / Retail Consumer'
                ? 'bg-[#161C25] border-[rgba(148,163,184,0.3)]'
                : 'bg-[#10151C] border-[rgba(148,163,184,0.12)]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#9AA4B2]">Individual / Retail</span>
              <span className="font-mono font-bold text-[#9AA4B2]">{individualCount}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* 4. RESULTS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((lead) => {
          const isB2B = lead.aiClassification === 'B2B Business Buyer';

          return (
            <Card
              key={lead.id}
              interactive
              onClick={() => onSelectLead(lead)}
              padding="sm"
              className={`flex flex-col justify-between ${
                isB2B ? 'border-[rgba(47,191,143,0.2)]' : 'opacity-60'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      isB2B ? 'bg-[rgba(47,191,143,0.12)] text-[#2FBF8F]' : 'bg-[#161C25] text-[#667085]'
                    }`}>
                      {isB2B ? <Building2 className="h-5 w-5" /> : <User className="h-5 w-5" />}
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-[#E5E9F0]">{lead.companyName}</h4>
                      <p className="text-[12px] text-[#9AA4B2]">
                        {lead.contactName} • {lead.title}
                      </p>
                    </div>
                  </div>

                  <Badge
                    variant={isB2B ? 'emerald' : 'neutral'}
                    size="sm"
                  >
                    {lead.b2bConfidence}% Match
                  </Badge>
                </div>

                <div className="p-3.5 rounded-panel bg-[#07090C] text-[13px] text-[#E5E9F0] leading-relaxed mb-3">
                  {lead.aiReasoning}
                </div>
              </div>

              <div className="flex items-center justify-between text-[12px] font-mono text-[#667085] pt-2.5 border-t border-[rgba(148,163,184,0.08)]">
                <span>{lead.city}, {lead.state}</span>
                <span className="text-[#2FBF8F] font-semibold">{lead.category}</span>
                <span>Vol: <strong className="text-[#E5E9F0]">{lead.estimatedAnnualVolume || 'N/A'}</strong></span>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="h-16" />

    </div>
  );
};
