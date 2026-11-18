import React from 'react';
import { 
  LayoutDashboard, 
  Radar, 
  Database, 
  Sparkles, 
  Send, 
  PhoneCall, 
  History, 
  ChevronLeft, 
  ChevronRight,
  Compass,
  Building2,
  ShieldCheck
} from 'lucide-react';

export type NavTab = 
  | 'overview' 
  | 'discovery' 
  | 'datamaster' 
  | 'gemini' 
  | 'outreach' 
  | 'dialer' 
  | 'audit';

interface NavItem {
  id: NavTab;
  label: string;
  icon: any;
  badge: string | null;
  accent?: boolean;
  warning?: boolean;
}

interface NavSection {
  group: string;
  items: NavItem[];
}

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  counts: {
    total: number;
    validated: number;
    b2bCount: number;
    sentCount: number;
    dialerQueue: number;
    duplicates: number;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  counts
}) => {
  const sections: NavSection[] = [
    {
      group: 'WORKFLOW',
      items: [
        {
          id: 'overview',
          label: 'Overview',
          icon: LayoutDashboard,
          badge: null
        },
        {
          id: 'discovery',
          label: 'Discovery',
          icon: Radar,
          badge: 'Live'
        },
        {
          id: 'datamaster',
          label: 'Buyers',
          icon: Database,
          badge: `${counts.total}`
        }
      ]
    },
    {
      group: 'OUTREACH',
      items: [
        {
          id: 'gemini',
          label: 'AI Classifier',
          icon: Sparkles,
          badge: `${counts.b2bCount}`,
          accent: true
        },
        {
          id: 'outreach',
          label: 'Outreach',
          icon: Send,
          badge: `${counts.sentCount}`
        },
        {
          id: 'dialer',
          label: 'Cold Calls',
          icon: PhoneCall,
          badge: `${counts.dialerQueue}`,
          warning: counts.dialerQueue > 0
        }
      ]
    },
    {
      group: 'RECORDS',
      items: [
        {
          id: 'audit',
          label: 'Logs',
          icon: History,
          badge: null
        }
      ]
    }
  ];

  return (
    <aside
      className={`relative flex flex-col border-r border-[rgba(148,163,184,0.12)] bg-[#0A0D12] transition-all duration-200 z-30 select-none shrink-0 ${
        collapsed ? 'w-[76px]' : 'w-[280px]'
      }`}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-7 z-40 flex h-6 w-6 items-center justify-center rounded-full bg-[#161C25] border border-[rgba(148,163,184,0.2)] text-[#9AA4B2] hover:text-[#E5E9F0] shadow-md transition-all"
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
      </button>

      {/* Brand Header */}
      <div className={`p-6 border-b border-[rgba(148,163,184,0.12)] ${collapsed ? 'px-4 py-5 text-center' : ''}`}>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[rgba(47,191,143,0.15)] border border-[rgba(47,191,143,0.3)] text-[#2FBF8F]">
            <Compass className="h-5 w-5" />
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <span className="text-[17px] font-bold font-display tracking-tight text-[#E5E9F0]">
                TradePulse <span className="text-[#2FBF8F]">AI</span>
              </span>
              <p className="text-[12px] font-mono text-[#667085] truncate">
                India ➔ US Export
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-6 space-y-6">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1.5">
            {!collapsed && (
              <p className="px-3 text-[11px] font-mono font-semibold uppercase tracking-eyebrow text-[#667085]">
                {section.group}
              </p>
            )}

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`group relative flex w-full h-11 items-center rounded-control px-3 text-[14px] font-medium transition-all ${
                      isActive
                        ? 'bg-[rgba(47,191,143,0.12)] text-[#E5E9F0] font-semibold'
                        : 'text-[#9AA4B2] hover:bg-[#161C25] hover:text-[#E5E9F0]'
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r bg-[#2FBF8F]" />
                    )}

                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <Icon
                        className={`h-4 w-4 shrink-0 transition-colors ${
                          isActive ? 'text-[#2FBF8F]' : 'text-[#667085] group-hover:text-[#E5E9F0]'
                        }`}
                      />

                      {!collapsed && (
                        <span className="truncate text-left whitespace-nowrap">{item.label}</span>
                      )}
                    </div>

                    {!collapsed && item.badge && (
                      <span
                        className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-[11px] font-mono font-medium whitespace-nowrap ${
                          item.accent
                            ? 'bg-[rgba(124,141,181,0.15)] text-[#7C8DB5]'
                            : item.warning
                            ? 'bg-[rgba(201,166,107,0.15)] text-[#C9A66B]'
                            : 'bg-[#161C25] text-[#9AA4B2]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Profile Card */}
      {!collapsed ? (
        <div className="p-4 m-3 rounded-panel bg-[#10151C] border border-[rgba(148,163,184,0.12)] text-[13px]">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="h-3.5 w-3.5 text-[#2FBF8F]" />
            <span className="font-semibold text-[#E5E9F0] truncate">Jaipur Artisan Guild</span>
          </div>
          <div className="flex items-center justify-between text-[12px] text-[#667085]">
            <span>IND-EXP-7729</span>
            <span className="text-[#2FBF8F] font-mono">{counts.duplicates} Blocked</span>
          </div>
        </div>
      ) : (
        <div className="p-3 text-center">
          <ShieldCheck className="h-5 w-5 text-[#2FBF8F] mx-auto" />
        </div>
      )}
    </aside>
  );
};
