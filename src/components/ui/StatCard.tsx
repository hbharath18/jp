import React from 'react';
import { Card } from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  badge?: {
    text: string;
    variant?: 'emerald' | 'slate' | 'success' | 'warning' | 'danger' | 'neutral';
  };
  icon: React.ReactNode;
  iconVariant?: 'emerald' | 'slate' | 'warning' | 'danger' | 'neutral';
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
  iconVariant = 'emerald',
  description,
  onClick,
  className = '',
  isHero = false
}) => {
  const iconVariantStyles = {
    emerald: 'bg-[rgba(47,191,143,0.12)] text-[#2FBF8F] border-[rgba(47,191,143,0.25)]',
    slate: 'bg-[rgba(124,141,181,0.12)] text-[#7C8DB5] border-[rgba(124,141,181,0.25)]',
    warning: 'bg-[rgba(201,166,107,0.12)] text-[#C9A66B] border-[rgba(201,166,107,0.25)]',
    danger: 'bg-[rgba(224,122,122,0.12)] text-[#E07A7A] border-[rgba(224,122,122,0.25)]',
    neutral: 'bg-[rgba(148,163,184,0.08)] text-[#9AA4B2] border-[rgba(148,163,184,0.18)]'
  }[iconVariant];

  return (
    <Card
      interactive={!!onClick}
      onClick={onClick}
      padding="md"
      className={`relative flex flex-col justify-between overflow-hidden transition-all group ${isHero ? 'lg:col-span-2' : ''
        } ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-panel border ${iconVariantStyles}`}
          >
            {icon}
          </div>

          {badge && (
            <span className="rounded-full bg-[rgba(148,163,184,0.08)] border border-[rgba(148,163,184,0.18)] px-2.5 py-0.5 text-[12px] font-mono font-medium text-[#9AA4B2] whitespace-nowrap shrink-0">
              {badge.text}
            </span>
          )}
        </div>

        <p className="text-[12px] uppercase tracking-eyebrow font-mono font-semibold text-[#9AA4B2]">
          {title}
        </p>

        <div className="flex items-baseline gap-2.5 mt-2">
          <span className="text-3xl sm:text-[38px] font-bold font-mono text-[#E5E9F0] tracking-tight">
            {value}
          </span>
          {subValue && (
            <span className="text-[14px] font-mono text-[#9AA4B2] font-normal whitespace-nowrap">
              {subValue}
            </span>
          )}
        </div>
      </div>

      {description && (
        <p className="text-[13px] text-[#667085] mt-4 pt-3 border-t border-[rgba(148,163,184,0.1)] leading-normal">
          {description}
        </p>
      )}
    </Card>
  );
};
