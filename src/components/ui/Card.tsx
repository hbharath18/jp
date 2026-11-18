import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  interactive = false,
  padding = 'lg',
  className = '',
  ...props
}) => {
  const paddingClasses = {
    sm: 'p-6 sm:p-7',
    md: 'p-7 sm:p-8',
    lg: 'p-8 sm:p-10'
  }[padding];

  return (
    <div
      className={`glass-card ${interactive ? 'glass-card-hover cursor-pointer' : ''} ${paddingClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
