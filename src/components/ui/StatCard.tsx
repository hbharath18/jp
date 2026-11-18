import React from 'react';
import { Card } from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  badge?: {
    text: string;
    variant?: 'amber' | 'indigo' | 'success' | 'warning' | 'danger' | 'neutral';
  };
  icon: React.ReactNode;
  iconVariant?: 'amber' | 'indigo' | 'emerald' | 'cyan' | 'rose';
  description?: string;
  onClick?: () => void;
  className?: string;
  isHero?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subValue,
  badge,
  icon,
  iconVariant = 'amber',
  description,
  onClick,
  className = '',
  isHero = false
}) => {
  const iconVariantStyles = {
    amber: 'bg-[#F59E0B]/12 text-[#F59E0B] border-[#F59E0B]/25',
    indigo: 'bg-[#6366F1]/12 text-[#A5B4FC] border-[#6366F1]/25',
    emerald: 'bg-[#34D399]/12 text-[#34D399] border-[#34D399]/25',
    cyan: 'bg-cyan-500/12 text-cyan-300 border-cyan-500/25',
    rose: 'bg-[#F87171]/12 text-[#F87171] border-[#F87171]/25'
  }[iconVariant];

  return (
    <Card
      interactive={!!onClick}
      onClick={onClick}
      padding="lg"
      className={`relative flex flex-col justify-between overflow-hidden transition-all group ${
        isHero ? 'lg:col-span-2' : ''
      } ${className}`}
    >
      <div>
        {/* Top bar: 48px rounded square icon + badge */}
        <div className="flex items-center justify-between mb-6">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${iconVariantStyles} transition-transform group-hover:scale-105`}
          >
            {icon}
          </div>

          {badge && (
            <span className="rounded-full bg-white/[0.06] border border-white/10 px-3 py-1 text-[13px] font-mono font-medium text-[#A1A1AA]">
              {badge.text}
            </span>
          )}
        </div>

        {/* Title */}
        <p className="text-[14px] uppercase tracking-eyebrow font-mono font-semibold text-[#A1A1AA]">
          {title}
        </p>

        {/* Metric Value: 40-48px mono */}
        <div className="flex items-baseline gap-3 mt-3">
          <span className="text-4xl sm:text-[44px] font-extrabold font-mono text-[#F5F5F7] tracking-tight">
            {value}
          </span>
          {subValue && (
            <span className="text-[15px] font-mono text-[#A1A1AA] font-normal">
              {subValue}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-[14px] text-[#6B6B75] mt-5 pt-4 border-t border-white/[0.06] leading-relaxed">
          {description}
        </p>
      )}
    </Card>
  );
};
