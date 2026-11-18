import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'slate' | 'success' | 'warning' | 'danger' | 'neutral';
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
    sm: 'h-6 px-2.5 text-[12px]',
    md: 'h-7 px-3 text-[13px]'
  }[size];

  const variantStyles = {
    emerald: {
      bg: 'bg-[rgba(47,191,143,0.12)] border-[rgba(47,191,143,0.25)] text-[#2FBF8F]',
      dot: 'bg-[#2FBF8F]'
    },
    success: {
      bg: 'bg-[rgba(47,191,143,0.12)] border-[rgba(47,191,143,0.25)] text-[#2FBF8F]',
      dot: 'bg-[#2FBF8F]'
    },
    slate: {
      bg: 'bg-[rgba(124,141,181,0.12)] border-[rgba(124,141,181,0.25)] text-[#7C8DB5]',
      dot: 'bg-[#7C8DB5]'
    },
    warning: {
      bg: 'bg-[rgba(201,166,107,0.12)] border-[rgba(201,166,107,0.25)] text-[#C9A66B]',
      dot: 'bg-[#C9A66B]'
    },
    danger: {
      bg: 'bg-[rgba(224,122,122,0.12)] border-[rgba(224,122,122,0.25)] text-[#E07A7A]',
      dot: 'bg-[#E07A7A]'
    },
    neutral: {
      bg: 'bg-[rgba(148,163,184,0.08)] border-[rgba(148,163,184,0.18)] text-[#9AA4B2]',
      dot: 'bg-[#9AA4B2]'
    }
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono font-medium tracking-tight select-none whitespace-nowrap shrink-0 ${sizeClasses} ${variantStyles.bg} ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${variantStyles.dot}`} />}
      <span className="whitespace-nowrap">{children}</span>
    </span>
  );
};
