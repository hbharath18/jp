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
  Flame,
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
          id: 'overview' as NavTab,
          label: 'Pipeline Overview',
          icon: LayoutDashboard,
          badge: null
        },
        {
          id: 'discovery' as NavTab,
          label: 'Multi-Source Discovery',
          icon: Radar,
          badge: 'Live'
        },
        {
          id: 'datamaster' as NavTab,
          label: 'Master Buyer Data',
          icon: Database,
          badge: `${counts.total}`
        }
      ]
    },
    {
      group: 'OUTREACH',
      items: [
        {
          id: 'gemini' as NavTab,
          label: 'Gemini AI Classifier',
          icon: Sparkles,
          badge: `${counts.b2bCount} B2B`,
          accent: true
        },
        {
          id: 'outreach' as NavTab,
          label: 'Gmail Outreach Engine',
          icon: Send,
          badge: `${counts.sentCount} Sent`
        },
        {
          id: 'dialer' as NavTab,
          label: 'Cold Calling Queue',
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
          id: 'audit' as NavTab,
          label: 'Audit & Sent Logs',
          icon: History,
          badge: null
        }
      ]
    }
  ];

  return (
    <aside
      className={`relative flex flex-col border-r border-white/[0.06] bg-[#07070A]/95 backdrop-blur-2xl transition-all duration-300 z-30 select-none shrink-0 ${collapsed ? 'w-[88px]' : 'w-[296px]'
        }`}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-9 z-40 flex h-7 w-7 items-center justify-center rounded-full bg-[#15151A] border border-white/10 text-[#A1A1AA] hover:text-[#F5F5F7] shadow-xl hover:scale-105 transition-all"
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      {/* Brand Header */}
      <div className={`p-8 border-b border-white/[0.06] ${collapsed ? 'px-5 py-7 text-center' : ''}`}>
        <div className="flex items-center gap-3.5">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] shadow-glow-amber">
            <Flame className="h-6 w-6 text-[#07070A] fill-[#07070A]" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FBBF24] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#FBBF24]"></span>
            </span>
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[20px] font-extrabold font-display tracking-tight text-[#F5F5F7]">
                  TradePulse <span className="bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] bg-clip-text text-transparent">AI</span>
                </span>
              </div>
              <p className="text-[13px] font-mono text-[#6B6B75] mt-0.5 truncate">
                India ➔ US Export Engine
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-4 py-8 space-y-8">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-2">
            {!collapsed && (
              <p className="px-4 text-[12px] font-mono font-bold uppercase tracking-eyebrow text-[#6B6B75]">
                {section.group}
              </p>
            )}

            <div className="space-y-1.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`group relative flex w-full h-[52px] items-center rounded-control px-4 text-[15px] sm:text-[16px] font-medium transition-all ${isActive
                        ? 'bg-[#F59E0B]/12 text-[#F5F5F7] border border-[#F59E0B]/25 font-semibold'
                        : 'text-[#A1A1AA] hover:bg-[#15151A] hover:text-[#F5F5F7] border border-transparent'
                      }`}
                    title={collapsed ? item.label : undefined}
                  >
                    {/* Active Left Indicator Bar */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-[#F59E0B] shadow-[0_0_12px_#F59E0B]" />
                    )}

                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <Icon
                        className={`h-5 w-5 shrink-0 transition-colors ${isActive ? 'text-[#F59E0B]' : 'text-[#6B6B75] group-hover:text-[#F5F5F7]'
                          }`}
                      />

                      {!collapsed && (
                        <span className="truncate text-left">{item.label}</span>
                      )}
                    </div>

                    {!collapsed && item.badge && (
                      <span
                        className={`ml-auto shrink-0 rounded-full px-2.5 py-0.5 text-[13px] font-mono font-medium ${item.accent
                            ? 'bg-[#6366F1]/15 text-[#A5B4FC] border border-[#6366F1]/25'
                            : item.warning
                              ? 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/25'
                              : 'bg-white/[0.06] text-[#A1A1AA]'
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

      {/* Bottom Exporter Mediation Profile Card */}
      {!collapsed ? (
        <div className="p-6 m-4 rounded-card bg-[#0E0E12] border border-white/10 text-[14px]">
          <div className="flex items-center gap-2.5 mb-2">
            <Building2 className="h-4 w-4 text-[#F59E0B]" />
            <span className="font-bold text-[#F5F5F7] truncate">Jaipur Artisan Exports</span>
          </div>
          <p className="text-[13px] text-[#A1A1AA] leading-relaxed">
            Mediation ID: <span className="font-mono text-[#F5F5F7]">IND-EXP-7729</span>
          </p>
          <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[13px]">
            <span className="text-[#6B6B75]">Duplicates Guard:</span>
            <span className="text-[#34D399] font-mono font-bold">{counts.duplicates} Blocked</span>
          </div>
        </div>
      ) : (
        <div className="p-4 text-center">
          <ShieldCheck className="h-6 w-6 text-[#34D399] mx-auto" />
        </div>
      )}
    </aside>
  );
};
