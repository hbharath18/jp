import React, { useState } from 'react';
import { 
  Search, 
  Activity, 
  FileText, 
  Sparkles, 
  MailCheck, 
  Ship, 
  ChevronDown, 
  X
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
  activeTabTitle = 'Overview'
}) => {
  const [showIntegrations, setShowIntegrations] = useState(false);

  return (
    <header className="sticky top-0 z-40 h-[80px] w-full border-b border-[rgba(148,163,184,0.12)] bg-[#0A0D12]/90 backdrop-blur-md px-6 sm:px-10 flex items-center justify-between gap-6">
      
      {/* Left: Breadcrumb & Current Title (one line) */}
      <div className="flex items-center gap-3 min-w-0 shrink-0">
        <div className="flex items-center gap-1.5 text-[14px] font-mono text-[#667085] whitespace-nowrap">
          <span>Exports</span>
          <span>/</span>
        </div>
        <h2 className="text-xl font-bold font-display text-[#E5E9F0] tracking-tight whitespace-nowrap">
          {activeTabTitle}
        </h2>
      </div>

      {/* Center: Search box (flex-1 max-w-md) */}
      <div className="relative hidden md:block flex-1 max-w-md min-w-0">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085]" />
        <input
          type="text"
          placeholder="Search buyers, cities, emails..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-10 rounded-control bg-[#10151C] border border-[rgba(148,163,184,0.12)] pl-10 pr-4 text-[14px] text-[#E5E9F0] placeholder-[#667085] focus:outline-none focus:border-[#2FBF8F] focus:ring-1 focus:ring-[#2FBF8F]/30 transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#9AA4B2] hover:text-[#E5E9F0]"
          >
            Clear
          </button>
        )}
      </div>

      {/* Right: Integrations Popover + Catalog + Primary CTA */}
      <div className="flex items-center gap-3 shrink-0">
        
        {/* Integrations Popover Button */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowIntegrations(!showIntegrations)}
            className="flex items-center gap-2 h-10 px-3.5 rounded-control bg-[#10151C] hover:bg-[#161C25] border border-[rgba(148,163,184,0.12)] text-[13px] font-medium text-[#9AA4B2] hover:text-[#E5E9F0] transition-all whitespace-nowrap shrink-0"
          >
            <span className="h-2 w-2 rounded-full bg-[#2FBF8F]" />
            <span>Integrations</span>
            <ChevronDown className="h-3.5 w-3.5 text-[#667085]" />
          </button>

          {showIntegrations && (
            <div className="absolute right-0 top-12 w-72 rounded-panel bg-[#10151C] border border-[rgba(148,163,184,0.18)] shadow-lg p-4 z-50">
              <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(148,163,184,0.12)] mb-2.5">
                <span className="text-[12px] font-mono font-semibold uppercase tracking-eyebrow text-[#9AA4B2]">
                  Gateways
                </span>
                <button
                  onClick={() => setShowIntegrations(false)}
                  className="text-[#667085] hover:text-[#E5E9F0]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-2 text-[13px]">
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#161C25]">
                  <div className="flex items-center gap-2">
                    <MailCheck className="h-4 w-4 text-[#2FBF8F]" />
                    <span className="text-[#E5E9F0]">Gmail OAuth2</span>
                  </div>
                  <span className="text-[12px] font-mono text-[#2FBF8F]">Active</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-[#161C25]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#7C8DB5]" />
                    <span className="text-[#E5E9F0]">Gemini 3.8</span>
                  </div>
                  <span className="text-[12px] font-mono text-[#7C8DB5]">Online</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-[#161C25]">
                  <div className="flex items-center gap-2">
                    <Ship className="h-4 w-4 text-[#2FBF8F]" />
                    <span className="text-[#E5E9F0]">ImportYeti</span>
                  </div>
                  <span className="text-[12px] font-mono text-[#9AA4B2]">Sync</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Catalog Button */}
        <Button
          variant="secondary"
          size="sm"
          onClick={onOpenCatalog}
          icon={<FileText className="h-4 w-4 text-[#2FBF8F]" />}
          className="hidden sm:inline-flex"
        >
          Catalog Deck
        </Button>

        {/* Primary CTA */}
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
