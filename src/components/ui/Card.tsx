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
    sm: 'p-5 sm:p-6',
    md: 'p-6 sm:p-7',
    lg: 'p-7 sm:p-8'
  }[padding];

  return (
    <div
      className={`theme-card ${interactive ? 'theme-card-hover cursor-pointer' : ''} ${paddingClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
