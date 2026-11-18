import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  icon,
  label,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-[13px] font-mono uppercase tracking-eyebrow text-[#A1A1AA] font-semibold">
          {label}
        </label>
      )}
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B75] pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`w-full h-[54px] rounded-control bg-[#0E0E12] border border-white/10 ${
            icon ? 'pl-12' : 'pl-5'
          } pr-5 text-[16px] text-[#F5F5F7] placeholder-[#6B6B75] transition-all duration-200 focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/30 ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};
