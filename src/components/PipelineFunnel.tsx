import React from 'react';
import { 
  Radar, 
  CopyX, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  PhoneForwarded, 
  ArrowRight
} from 'lucide-react';
import { NavTab } from './Sidebar';
import { Card } from './ui/Card';

interface PipelineFunnelProps {
  onSelectStage: (tab: NavTab) => void;
  stats: {
    totalRaw: number;
    deduped: number;
    validEmails: number;
    b2bQualified: number;
    outreachSent: number;
    conversions: number;
  };
}

export const PipelineFunnel: React.FC<PipelineFunnelProps> = ({ onSelectStage, stats }) => {
  const steps = [
    {
      id: 1,
      name: 'Discovery',
      sub: 'Multi-Source Leads',
      count: stats.totalRaw,
      unit: 'Found',
      targetTab: 'discovery' as NavTab,
      icon: Radar,
      badgeColor: 'text-[#2FBF8F] bg-[rgba(47,191,143,0.12)]'
    },
    {
      id: 2,
      name: 'Deduplication',
      sub: 'Cross-Check Guard',
      count: stats.deduped,
      unit: 'Clean',
      targetTab: 'datamaster' as NavTab,
      icon: CopyX,
      badgeColor: 'text-[#C9A66B] bg-[rgba(201,166,107,0.12)]'
    },
    {
      id: 3,
      name: 'Validation',
      sub: 'DNS MX Ping',
      count: stats.validEmails,
      unit: 'Valid',
      targetTab: 'datamaster' as NavTab,
      icon: CheckCircle2,
      badgeColor: 'text-[#2FBF8F] bg-[rgba(47,191,143,0.12)]'
    },
    {
      id: 4,
      name: 'Gemini AI',
      sub: 'Wholesale Fit',
      count: stats.b2bQualified,
      unit: 'B2B',
      targetTab: 'gemini' as NavTab,
      icon: Sparkles,
      badgeColor: 'text-[#7C8DB5] bg-[rgba(124,141,181,0.12)]'
    },
    {
      id: 5,
      name: 'Outreach',
      sub: 'Deck Pitch',
      count: stats.outreachSent,
      unit: 'Sent',
      targetTab: 'outreach' as NavTab,
      icon: Send,
      badgeColor: 'text-[#7C8DB5] bg-[rgba(124,141,181,0.12)]'
    },
    {
      id: 6,
      name: 'Engaged',
      sub: 'Replies & Calls',
      count: stats.conversions,
      unit: 'Active',
      targetTab: 'audit' as NavTab,
      icon: PhoneForwarded,
      badgeColor: 'text-[#2FBF8F] bg-[rgba(47,191,143,0.12)]'
    }
  ];

  return (
    <Card padding="md" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-[17px] font-bold font-display text-[#E5E9F0]">
            Export Workflow Funnel
          </h3>
          <p className="text-[14px] text-[#9AA4B2] mt-0.5">
            Click any milestone to open that module.
          </p>
        </div>

        <div className="flex items-center gap-2 h-9 px-3 rounded-full bg-[#161C25] border border-[rgba(148,163,184,0.12)] text-[13px] whitespace-nowrap shrink-0">
          <span className="text-[#9AA4B2]">Efficiency:</span>
          <span className="text-[#2FBF8F] font-mono font-bold">88.2%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              onClick={() => onSelectStage(step.targetTab)}
              className="group flex flex-col justify-between rounded-panel bg-[#161C25] border border-[rgba(148,163,184,0.12)] hover:border-[rgba(148,163,184,0.25)] p-4 cursor-pointer transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-1.5 rounded-lg ${step.badgeColor}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[11px] font-mono text-[#667085] font-semibold">
                    0{step.id}
                  </span>
                </div>

                <h4 className="text-[14px] font-bold text-[#E5E9F0] group-hover:text-[#2FBF8F] transition-colors truncate">
                  {step.name}
                </h4>
                <p className="text-[12px] text-[#9AA4B2] mt-0.5 truncate">
                  {step.sub}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-[rgba(148,163,184,0.08)] flex items-baseline justify-between">
                <div>
                  <span className="text-xl font-bold font-mono text-[#E5E9F0]">
                    {step.count}
                  </span>
                  <span className="text-[12px] text-[#667085] ml-1">
                    {step.unit}
                  </span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-[#667085] group-hover:text-[#2FBF8F] group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
