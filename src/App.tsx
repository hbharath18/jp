import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar, NavTab } from './components/Sidebar';
import { CatalogModal } from './components/CatalogModal';
import { BuyerDetailModal } from './components/BuyerDetailModal';
import { OverviewView } from './views/OverviewView';
import { DiscoveryView } from './views/DiscoveryView';
import { DataMasterView } from './views/DataMasterView';
import { GeminiClassificationView } from './views/GeminiClassificationView';
import { OutreachView } from './views/OutreachView';
import { ColdCallingView } from './views/ColdCallingView';
import { AuditHistoryView } from './views/AuditHistoryView';
import { INITIAL_LEADS, INITIAL_EMAIL_LOGS, INITIAL_CALL_LOGS } from './data/mockLeads';
import { Lead, SentEmailLog, ColdCallLog } from './types';

export const App: React.FC = () => {
  // Global State
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [emailLogs, setEmailLogs] = useState<SentEmailLog[]>(INITIAL_EMAIL_LOGS);
  const [callLogs, setCallLogs] = useState<ColdCallLog[]>(INITIAL_CALL_LOGS);
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Modals
  const [catalogModalOpen, setCatalogModalOpen] = useState<boolean>(false);
  const [selectedLeadForModal, setSelectedLeadForModal] = useState<Lead | null>(null);
  const [leadForEmailCompose, setLeadForEmailCompose] = useState<Lead | null>(null);

  // Handlers
  const handleAddLeads = (newLeads: Lead[]) => {
    setLeads(prev => [...newLeads, ...prev]);
  };

  const handleUpdateLeads = (updated: Lead[]) => {
    setLeads(updated);
  };

  const handleAddEmailLogs = (logs: SentEmailLog[]) => {
    setEmailLogs(prev => [...logs, ...prev]);
  };

  const handleAddCallLog = (log: ColdCallLog) => {
    setCallLogs(prev => [log, ...prev]);
  };

  const handleComposeEmail = (lead: Lead) => {
    setLeadForEmailCompose(lead);
    setActiveTab('outreach');
  };

  const handleAddToDialer = (lead: Lead) => {
    setActiveTab('dialer');
  };

  // Badge Counts
  const counts = {
    total: leads.length,
    validated: leads.filter(l => l.emailStatus === 'Valid').length,
    b2bCount: leads.filter(l => l.aiClassification === 'B2B Business Buyer' && !l.isDuplicate).length,
    sentCount: emailLogs.length,
    dialerQueue: leads.filter(l => l.phone && !l.email && !l.isDuplicate).length,
    duplicates: leads.filter(l => l.isDuplicate).length,
  };

  const tabTitles: Record<NavTab, string> = {
    overview: 'Pipeline Overview',
    discovery: 'Multi-Source Discovery Engine',
    datamaster: 'Master Buyer Database & QC',
    gemini: 'Gemini 3.8 AI Classifier',
    outreach: 'Gmail Outreach & Catalog Dispatch',
    dialer: 'Cold Calling Queue',
    audit: 'Audit & Sent Ledger'
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-ambient-canvas bg-[#07070A] text-[#F5F5F7]">
      
      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        counts={counts}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden relative z-10">
        
        {/* Top Header */}
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onOpenDiscovery={() => setActiveTab('discovery')}
          onOpenCatalog={() => setCatalogModalOpen(true)}
          activeTabTitle={tabTitles[activeTab]}
        />

        {/* Scrollable Viewport with Centered Container (Max 1440px) */}
        <main className="flex-1 overflow-y-auto px-6 sm:px-12 lg:px-16 pt-8 sm:pt-12 pb-20">
          <div className="max-w-[1440px] mx-auto space-y-12 sm:space-y-16">
            
            {activeTab === 'overview' && (
              <OverviewView
                leads={leads}
                emailLogs={emailLogs}
                callLogs={callLogs}
                onNavigate={(tab) => setActiveTab(tab)}
                onOpenCatalog={() => setCatalogModalOpen(true)}
                onSelectLead={(lead) => setSelectedLeadForModal(lead)}
              />
            )}

            {activeTab === 'discovery' && (
              <DiscoveryView
                onAddLeads={handleAddLeads}
                totalLeadsCount={leads.length}
              />
            )}

            {activeTab === 'datamaster' && (
              <DataMasterView
                leads={leads}
                onUpdateLeads={handleUpdateLeads}
                onSelectLead={(lead) => setSelectedLeadForModal(lead)}
                onComposeEmail={handleComposeEmail}
                onAddToDialer={handleAddToDialer}
              />
            )}

            {activeTab === 'gemini' && (
              <GeminiClassificationView
                leads={leads}
                onUpdateLeads={handleUpdateLeads}
                onSelectLead={(lead) => setSelectedLeadForModal(lead)}
              />
            )}

            {activeTab === 'outreach' && (
              <OutreachView
                leads={leads}
                onUpdateLeads={handleUpdateLeads}
                onAddEmailLogs={handleAddEmailLogs}
                onOpenCatalog={() => setCatalogModalOpen(true)}
                initialLead={leadForEmailCompose}
              />
            )}

            {activeTab === 'dialer' && (
              <ColdCallingView
                leads={leads}
                callLogs={callLogs}
                onUpdateLeads={handleUpdateLeads}
                onAddCallLog={handleAddCallLog}
                onSelectLead={(lead) => setSelectedLeadForModal(lead)}
              />
            )}

            {activeTab === 'audit' && (
              <AuditHistoryView
                emailLogs={emailLogs}
                callLogs={callLogs}
                leads={leads}
                onOpenCatalog={() => setCatalogModalOpen(true)}
              />
            )}

            {/* Bottom 48px padding spacer */}
            <div className="h-12" />

          </div>
        </main>
      </div>

      {/* Catalog Deck Presentation PDF Modal */}
      <CatalogModal
        isOpen={catalogModalOpen}
        onClose={() => setCatalogModalOpen(false)}
        onAttachToPitch={() => {
          setActiveTab('outreach');
        }}
      />

      {/* Detailed Lead Dossier Modal */}
      <BuyerDetailModal
        lead={selectedLeadForModal}
        onClose={() => setSelectedLeadForModal(null)}
        onSendEmail={handleComposeEmail}
        onAddToDialer={handleAddToDialer}
      />

    </div>
  );
};
