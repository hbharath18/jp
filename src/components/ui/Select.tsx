import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  icon,
  children,
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
        <select
          className={`w-full h-[52px] appearance-none rounded-control bg-[#10151C] border border-[rgba(148,163,184,0.12)] ${icon ? 'pl-11' : 'pl-4'
            } pr-10 text-[15px] font-medium text-[#E5E9F0] transition-all duration-200 focus:outline-none focus:border-[#2FBF8F] focus:ring-1 focus:ring-[#2FBF8F]/30 cursor-pointer ${className}`}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9AA4B2] pointer-events-none" />
      </div>
    </div>
  );
};
