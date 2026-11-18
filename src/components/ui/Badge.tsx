import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'amber' | 'indigo' | 'success' | 'warning' | 'danger' | 'neutral';
  dot?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  dot = true,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-7 px-3 text-[13px]',
    md: 'h-8 px-3.5 text-[14px]'
  }[size];

  const variantStyles = {
    amber: {
      bg: 'bg-[#F59E0B]/12 border-[#F59E0B]/25 text-[#F59E0B]',
      dot: 'bg-[#F59E0B]'
    },
    indigo: {
      bg: 'bg-[#6366F1]/12 border-[#6366F1]/25 text-[#A5B4FC]',
      dot: 'bg-[#6366F1]'
    },
    success: {
      bg: 'bg-[#34D399]/12 border-[#34D399]/25 text-[#34D399]',
      dot: 'bg-[#34D399]'
    },
    warning: {
      bg: 'bg-[#FBBF24]/12 border-[#FBBF24]/25 text-[#FBBF24]',
      dot: 'bg-[#FBBF24]'
    },
    danger: {
      bg: 'bg-[#F87171]/12 border-[#F87171]/25 text-[#F87171]',
      dot: 'bg-[#F87171]'
    },
    neutral: {
      bg: 'bg-white/[0.06] border-white/[0.12] text-[#A1A1AA]',
      dot: 'bg-[#A1A1AA]'
    }
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border font-mono font-medium tracking-tight select-none ${sizeClasses} ${variantStyles.bg} ${className}`}
    >
      {dot && <span className={`h-2 w-2 rounded-full shrink-0 ${variantStyles.dot}`} />}
      <span className="truncate">{children}</span>
    </span>
  );
};
