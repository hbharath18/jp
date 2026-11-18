import React, { useState } from 'react';
import {
  Search,
  Activity,
  FileText,
  Sparkles,
  MailCheck,
  Ship,
  ChevronDown,
  CheckCircle2,
  X,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import { Button } from './ui/Button';

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onOpenDiscovery: () => void;
  onOpenCatalog: () => void;
  activeTabTitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchTerm,
  setSearchTerm,
  onOpenDiscovery,
  onOpenCatalog,
  activeTabTitle = 'Pipeline Overview'
}) => {
  const [showIntegrations, setShowIntegrations] = useState(false);

  return (
    <header className="sticky top-0 z-40 h-[88px] w-full border-b border-white/[0.06] bg-[#07070A]/85 backdrop-blur-2xl px-8 sm:px-12 flex items-center justify-between">

      {/* Left: Breadcrumb & Current View Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-[14px] font-mono text-[#6B6B75]">
          <span>US Corridor</span>
          <span>/</span>
          <span className="text-[#A1A1AA]">Exports</span>
          <span>/</span>
        </div>
        <h2 className="text-[19px] sm:text-[21px] font-bold font-display text-[#F5F5F7] tracking-tight">
          {activeTabTitle}
        </h2>
      </div>

      {/* Right: Search + Integrations Popover + Catalog + Primary CTA */}
      <div className="flex items-center gap-4">

        {/* Search Input */}
        <div className="relative hidden md:block w-72 lg:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B6B75]" />
          <input
            type="text"
            placeholder="Search buyers, cities, emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 rounded-control bg-[#0E0E12] border border-white/10 pl-11 pr-4 text-[14px] text-[#F5F5F7] placeholder-[#6B6B75] focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/30 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[13px] text-[#A1A1AA] hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Compact Integrations Popover Button */}
        <div className="relative">
          <button
            onClick={() => setShowIntegrations(!showIntegrations)}
            className="flex items-center gap-2.5 h-11 px-4 rounded-control bg-[#0E0E12] hover:bg-[#15151A] border border-white/10 text-[14px] font-medium text-[#A1A1AA] hover:text-[#F5F5F7] transition-all"
          >
            <span className="h-2 w-2 rounded-full bg-[#34D399]" />
            <span>Integrations</span>
            <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-[12px] font-mono text-[#F5F5F7]">
              3 Active
            </span>
            <ChevronDown className="h-4 w-4 text-[#6B6B75]" />
          </button>

          {/* Integrations Popover Dropdown */}
          {showIntegrations && (
            <div className="absolute right-0 top-14 w-80 rounded-2xl bg-[#0E0E12] border border-white/10 shadow-2xl p-5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
                <span className="text-[13px] font-mono font-semibold uppercase tracking-eyebrow text-[#A1A1AA]">
                  Connected Gateways
                </span>
                <button
                  onClick={() => setShowIntegrations(false)}
                  className="text-[#6B6B75] hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03]">
                  <div className="flex items-center gap-2.5">
                    <MailCheck className="h-4 w-4 text-[#34D399]" />
                    <span className="text-[14px] font-medium text-[#F5F5F7]">Gmail OAuth2 API</span>
                  </div>
                  <span className="text-[13px] font-mono text-[#34D399]">Connected</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03]">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="h-4 w-4 text-[#A5B4FC]" />
                    <span className="text-[14px] font-medium text-[#F5F5F7]">Gemini 3.8 Flash</span>
                  </div>
                  <span className="text-[13px] font-mono text-[#A5B4FC]">Online</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03]">
                  <div className="flex items-center gap-2.5">
                    <Ship className="h-4 w-4 text-[#F59E0B]" />
                    <span className="text-[14px] font-medium text-[#F5F5F7]">ImportYeti Customs</span>
                  </div>
                  <span className="text-[13px] font-mono text-[#F59E0B]">Daily Sync</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Catalog Deck Trigger */}
        <Button
          variant="secondary"
          size="sm"
          onClick={onOpenCatalog}
          icon={<FileText className="h-4 w-4 text-[#F59E0B]" />}
          className="hidden sm:inline-flex"
        >
          2026 Catalog Deck
        </Button>

        {/* Discovery Scan CTA */}
        <Button
          variant="primary"
          size="sm"
          onClick={onOpenDiscovery}
          icon={<Activity className="h-4 w-4" />}
        >
          Discovery Scan
        </Button>

      </div>
    </header>
  );
};
