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
        <label className="block text-[12px] font-mono uppercase tracking-eyebrow text-[#9AA4B2] font-semibold">
          {label}
        </label>
      )}
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`w-full h-[52px] rounded-control bg-[#10151C] border border-[rgba(148,163,184,0.12)] ${
            icon ? 'pl-11' : 'pl-4'
          } pr-4 text-[15px] text-[#E5E9F0] placeholder-[#667085] transition-all duration-200 focus:outline-none focus:border-[#2FBF8F] focus:ring-1 focus:ring-[#2FBF8F]/30 ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};
