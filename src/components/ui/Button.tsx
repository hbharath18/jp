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
    sm: 'h-10 px-4 text-[14px]',
    md: 'h-11 px-5 text-[14px]',
    lg: 'h-[48px] px-6 text-[15px]'
  }[size];

  const variantClasses = {
    primary:
      'bg-[#2FBF8F] hover:bg-[#249E76] text-[#07130F] font-semibold shadow-subtle active:scale-[0.98]',
    secondary:
      'bg-transparent hover:bg-[#1B222D] text-[#E5E9F0] border border-[rgba(148,163,184,0.12)] hover:border-[rgba(148,163,184,0.22)] active:scale-[0.98]',
    danger:
      'bg-[rgba(224,122,122,0.12)] hover:bg-[rgba(224,122,122,0.18)] text-[#E07A7A] border border-[rgba(224,122,122,0.25)] active:scale-[0.98]',
    ghost:
      'bg-transparent hover:bg-[#1B222D] text-[#9AA4B2] hover:text-[#E5E9F0]'
  }[variant];

  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-control font-sans transition-all duration-200 select-none whitespace-nowrap shrink-0 disabled:opacity-40 disabled:pointer-events-none ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span className="whitespace-nowrap">{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
