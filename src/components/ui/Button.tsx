import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'h-11 px-5 text-[14px]',
    md: 'h-[52px] px-7 text-[15px]',
    lg: 'h-[56px] px-8 text-[16px]'
  }[size];

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#07070A] font-bold shadow-glow-amber hover:shadow-glow-amber-lg hover:from-[#FBBF24] hover:to-[#F59E0B] hover:-translate-y-0.5 active:scale-[0.98]',
    secondary:
      'bg-[#0E0E12]/80 hover:bg-[#1B1B22] text-[#F5F5F7] border border-white/10 hover:border-white/20 active:scale-[0.98]',
    danger:
      'bg-[#F87171]/15 hover:bg-[#F87171]/25 text-[#F87171] border border-[#F87171]/30 active:scale-[0.98]',
    ghost:
      'bg-transparent hover:bg-white/[0.06] text-[#A1A1AA] hover:text-[#F5F5F7]'
  }[variant];

  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2.5 rounded-control font-sans font-medium transition-all duration-200 select-none disabled:opacity-40 disabled:pointer-events-none ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
