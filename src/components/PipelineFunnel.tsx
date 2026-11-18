import React from 'react';
import {
  Radar,
  CopyX,
  CheckCircle2,
  Sparkles,
  Send,
  PhoneForwarded,
  ArrowRight,
  TrendingUp
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
      unit: 'Discovered',
      targetTab: 'discovery' as NavTab,
      icon: Radar,
      color: 'from-[#F59E0B]/15 to-transparent',
      borderColor: 'border-[#F59E0B]/30',
      badgeColor: 'text-[#F59E0B] bg-[#F59E0B]/15'
    },
    {
      id: 2,
      name: 'Deduplication',
      sub: 'Domain & Phone Guard',
      count: stats.deduped,
      unit: 'Unique Clean',
      targetTab: 'datamaster' as NavTab,
      icon: CopyX,
      color: 'from-orange-500/15 to-transparent',
      borderColor: 'border-orange-500/30',
      badgeColor: 'text-orange-400 bg-orange-500/15'
    },
    {
      id: 3,
      name: 'Email Validation',
      sub: 'DNS MX Deliverability',
      count: stats.validEmails,
      unit: 'Deliverable',
      targetTab: 'datamaster' as NavTab,
      icon: CheckCircle2,
      color: 'from-[#34D399]/15 to-transparent',
      borderColor: 'border-[#34D399]/30',
      badgeColor: 'text-[#34D399] bg-[#34D399]/15'
    },
    {
      id: 4,
      name: 'Gemini 3.8 AI',
      sub: 'B2B Wholesale Fit',
      count: stats.b2bQualified,
      unit: 'Qualified',
      targetTab: 'gemini' as NavTab,
      icon: Sparkles,
      color: 'from-[#6366F1]/15 to-transparent',
      borderColor: 'border-[#6366F1]/30',
      badgeColor: 'text-[#A5B4FC] bg-[#6366F1]/15'
    },
    {
      id: 5,
      name: 'Gmail Outreach',
      sub: '2026 Catalog Pitch',
      count: stats.outreachSent,
      unit: 'Sent Pitches',
      targetTab: 'outreach' as NavTab,
      icon: Send,
      color: 'from-cyan-500/15 to-transparent',
      borderColor: 'border-cyan-500/30',
      badgeColor: 'text-cyan-400 bg-cyan-500/15'
    },
    {
      id: 6,
      name: 'Engagement',
      sub: 'Opens & Call Desk',
      count: stats.conversions,
      unit: 'Active Engaged',
      targetTab: 'audit' as NavTab,
      icon: PhoneForwarded,
      color: 'from-violet-500/15 to-transparent',
      borderColor: 'border-violet-500/30',
      badgeColor: 'text-violet-400 bg-violet-500/15'
    }
  ];

  return (
    <Card padding="lg" className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#F59E0B] shadow-[0_0_10px_#F59E0B] animate-pulse" />
            <h3 className="text-[17px] sm:text-[19px] font-bold font-display text-[#F5F5F7] tracking-tight">
              Export Workflow Pipeline Funnel
            </h3>
          </div>
          <p className="text-[15px] text-[#A1A1AA] mt-1.5 leading-relaxed">
            Click on any pipeline milestone to jump straight to that operational module.
          </p>
        </div>

        <div className="flex items-center gap-2.5 h-11 px-4 rounded-full bg-[#0E0E12] border border-white/10 text-[14px]">
          <TrendingUp className="h-4 w-4 text-[#34D399]" />
          <span className="text-[#A1A1AA]">Corridor Efficiency:</span>
          <span className="text-[#34D399] font-mono font-bold">88.2%</span>
        </div>
      </div>

      {/* Spacious Horizontal Stepper Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 overflow-x-auto pb-2">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              onClick={() => onSelectStage(step.targetTab)}
              className={`group relative flex flex-col justify-between min-w-[190px] rounded-panel bg-gradient-to-b ${step.color} border ${step.borderColor} p-6 cursor-pointer transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl ${step.badgeColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[12px] font-mono text-[#6B6B75] font-bold">
                    STEP 0{step.id}
                  </span>
                </div>

                <h4 className="text-[16px] font-bold text-[#F5F5F7] group-hover:text-[#F59E0B] transition-colors">
                  {step.name}
                </h4>
                <p className="text-[13px] text-[#A1A1AA] mt-1">
                  {step.sub}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-bold font-mono text-[#F5F5F7] tracking-tight">
                    {step.count}
                  </span>
                  <span className="text-[13px] text-[#6B6B75] ml-1.5">
                    {step.unit}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-[#6B6B75] group-hover:text-[#F59E0B] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
