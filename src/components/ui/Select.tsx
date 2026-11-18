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
        <select
          className={`w-full h-[54px] appearance-none rounded-control bg-[#0E0E12] border border-white/10 ${
            icon ? 'pl-12' : 'pl-5'
          } pr-12 text-[16px] font-medium text-[#F5F5F7] transition-all duration-200 focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/30 cursor-pointer ${className}`}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A1A1AA] pointer-events-none transition-transform" />
      </div>
    </div>
  );
};
