import React from 'react';

interface PageHeroProps {
  eyebrow?: string;
  eyebrowIcon?: React.ReactNode;
  title: string;
  gradientWord?: string;
  description: string;
  actions?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  eyebrowIcon,
  title,
  gradientWord,
  description,
  actions
}) => {
  const renderTitle = () => {
    if (!gradientWord || !title.includes(gradientWord)) {
      return title;
    }
    const parts = title.split(gradientWord);
    return (
      <>
        {parts[0]}
        <span className="bg-gradient-to-r from-[#2FBF8F] to-[#7C8DB5] bg-clip-text text-transparent">
          {gradientWord}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className="pb-8 border-b border-[rgba(148,163,184,0.12)]">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="max-w-3xl space-y-3">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(47,191,143,0.12)] border border-[rgba(47,191,143,0.25)] px-3 py-1 text-[12px] font-mono font-semibold uppercase tracking-eyebrow text-[#2FBF8F]">
              {eyebrowIcon}
              <span>{eyebrow}</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold font-display text-[#E5E9F0] tracking-tight leading-tight">
            {renderTitle()}
          </h1>

          <p className="text-[15px] sm:text-[16px] text-[#9AA4B2] leading-normal max-w-2xl font-normal">
            {description}
          </p>
        </div>

        {actions && (
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
