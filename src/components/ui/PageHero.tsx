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
  // If gradientWord is provided, split the title and style the word
  const renderTitle = () => {
    if (!gradientWord || !title.includes(gradientWord)) {
      return title;
    }
    const parts = title.split(gradientWord);
    return (
      <>
        {parts[0]}
        <span className="bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#FCD34D] bg-clip-text text-transparent">
          {gradientWord}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className="pt-2 sm:pt-6 pb-10 border-b border-white/[0.06]">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        
        {/* Left: Eyebrow, H1, Description */}
        <div className="max-w-3xl space-y-4">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 px-3.5 py-1 text-[13px] font-mono font-semibold uppercase tracking-eyebrow text-[#F59E0B]">
              {eyebrowIcon}
              <span>{eyebrow}</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold font-display text-[#F5F5F7] tracking-tight leading-[1.12]">
            {renderTitle()}
          </h1>

          <p className="text-[17px] sm:text-[18px] text-[#A1A1AA] leading-[1.65] max-w-2xl font-normal">
            {description}
          </p>
        </div>

        {/* Right: Actions */}
        {actions && (
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
