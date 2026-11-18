import React, { useState } from 'react';
import { 
  Radar, 
  MapPin, 
  Layers, 
  Users, 
  Search, 
  Play, 
  UploadCloud, 
  FileSpreadsheet, 
  Globe2, 
  Ship, 
  Store, 
  Sparkles, 
  CheckCircle2, 
  Terminal, 
  RefreshCw, 
  Download, 
  Briefcase,
  Check
} from 'lucide-react';
import { ProductCategory, BuyerPersona, LeadSource, Lead } from '../types';
import { PageHero } from '../components/ui/PageHero';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Select } from '../components/ui/Select';

interface DiscoveryViewProps {
  onAddLeads: (newLeads: Lead[]) => void;
  totalLeadsCount: number;
}

const US_GEO_DATA: Record<string, string[]> = {
  'Texas': ['Houston', 'Austin', 'Dallas', 'San Antonio', 'Fort Worth'],
  'California': ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento', 'Santa Monica'],
  'New York': ['New York City', 'Brooklyn', 'Manhattan', 'Buffalo', 'Albany'],
  'Arizona': ['Sedona', 'Phoenix', 'Scottsdale', 'Tucson', 'Flagstaff'],
  'Colorado': ['Denver', 'Boulder', 'Colorado Springs', 'Fort Collins'],
  'Florida': ['Miami', 'Orlando', 'Tampa', 'Fort Lauderdale', 'St. Petersburg']
};

export const DiscoveryView: React.FC<DiscoveryViewProps> = ({ onAddLeads, totalLeadsCount }) => {
  // Filter States
  const [category, setCategory] = useState<ProductCategory>('Singing Bowls');
  const [selectedState, setSelectedState] = useState<string>('Texas');
  const [selectedCity, setSelectedCity] = useState<string>('Houston');
  const [selectedPersonas, setSelectedPersonas] = useState<BuyerPersona[]>([
    'Showrooms', 
    'Wellness Stores', 
    'Wholesalers', 
    'Importers'
  ]);
  
  // Active Source Connector Tab
  const [activeSource, setActiveSource] = useState<LeadSource | 'CSV Upload'>('Google Maps Scraper');
  
  // Terminal / Progress Simulation State
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [scanCompleted, setScanCompleted] = useState(false);

  // Toggle Persona
  const togglePersona = (p: BuyerPersona) => {
    if (selectedPersonas.includes(p)) {
      if (selectedPersonas.length > 1) {
        setSelectedPersonas(selectedPersonas.filter(item => item !== p));
      }
    } else {
      setSelectedPersonas([...selectedPersonas, p]);
    }
  };

  // Run Discovery Scan Simulation
  const handleRunScan = () => {
    setIsScanning(true);
    setScanProgress(10);
    setScanCompleted(false);
    setScanLogs([
      `[00:00] Initializing TradePulse Discovery Engine (Country: United States)...`,
      `[00:01] Targeted Corridor: ${selectedState} ➔ ${selectedCity} for [${category}]`,
      `[00:02] Querying ${activeSource} connector endpoints...`
    ]);

    setTimeout(() => {
      setScanProgress(40);
      setScanLogs(prev => [
        ...prev,
        `[00:03] Scraping places & showroom entities in ${selectedCity}, ${selectedState}...`,
        `[00:04] Found candidate businesses matching personas: ${selectedPersonas.join(', ')}`,
        `[00:05] Inspecting DOM metadata for buyer emails, phone numbers & tax IDs...`
      ]);
    }, 1200);

    setTimeout(() => {
      setScanProgress(75);
      setScanLogs(prev => [
        ...prev,
        `[00:06] Cross-referencing US Customs ImportYeti manifests for HS 9206.00 imports...`,
        `[00:07] Running anti-duplicate filter against current database (${totalLeadsCount} records)...`,
        `[00:08] Gemini 3.8 AI preliminary relevance scoring initialized...`
      ]);
    }, 2400);

    setTimeout(() => {
      setScanProgress(100);
      setScanLogs(prev => [
        ...prev,
        `[00:09] SUCCESS: Ingested 2 high-quality verified US buyers into database!`,
        `[00:09] 1. "${selectedCity} Tibetan Sound Temple" (${selectedCity}, ${selectedState}) - Valid Email + Phone`,
        `[00:09] 2. "${selectedState} Artisan Living & Imports" (${selectedCity}, ${selectedState}) - ImportYeti Verified`
      ]);
      setIsScanning(false);
      setScanCompleted(true);

      const newDiscoveredLeads: Lead[] = [
        {
          id: `lead-new-${Date.now()}-1`,
          companyName: `${selectedCity} Tibetan Sound Temple`,
          contactName: 'Amanda Vance',
          title: 'Managing Curator & Acoustic Buyer',
          source: activeSource as LeadSource,
          category: category,
          persona: 'Showrooms',
          city: selectedCity,
          state: selectedState,
          country: 'United States',
          phone: `+1 (${selectedState === 'Texas' ? '713' : '310'}) 555-0899`,
          email: `amanda@${selectedCity.toLowerCase().replace(/\s+/g, '')}soundtemple.com`,
          website: `https://${selectedCity.toLowerCase().replace(/\s+/g, '')}soundtemple.com`,
          emailStatus: 'Valid',
          aiClassification: 'B2B Business Buyer',
          b2bConfidence: 96,
          aiReasoning: `High-intent sound sanctuary and showroom located in ${selectedCity}, ${selectedState}. Actively hosts singing bowl sound bath certifications with retail inventory shelves.`,
          outreachStatus: 'Not Contacted',
          callStatus: 'Pending',
          isDuplicate: false,
          shipmentsCount: 5,
          estimatedAnnualVolume: '$48,000 / yr',
          notes: 'Discovered via live TradePulse scan. Ideal target for 432Hz 7-metal singing bowl sets.',
          dateAdded: '2026-11-18'
        },
        {
          id: `lead-new-${Date.now()}-2`,
          companyName: `${selectedState} Artisan Living & Imports`,
          contactName: 'Gregory Scott',
          title: 'Director of Global Merchandising',
          source: 'ImportYeti Trade',
          category: category,
          persona: 'Importers',
          city: selectedCity,
          state: selectedState,
          country: 'United States',
          phone: `+1 (${selectedState === 'Texas' ? '512' : '415'}) 555-0421`,
          email: `gregory@${selectedState.toLowerCase()}artisanliving.com`,
          website: `https://${selectedState.toLowerCase()}artisanliving.com`,
          emailStatus: 'Valid',
          aiClassification: 'B2B Business Buyer',
          b2bConfidence: 94,
          aiReasoning: `US Customs Bill of Lading shows 14 container entries from India (Nhava Sheva to Houston/LA) for handcrafted brassware and acoustic bowls.`,
          outreachStatus: 'Not Contacted',
          callStatus: 'Pending',
          isDuplicate: false,
          shipmentsCount: 14,
          estimatedAnnualVolume: '$140,000 / yr',
          notes: 'Wholesale importer looking for direct-from-Jaipur artisan pricing.',
          dateAdded: '2026-11-18'
        }
      ];

      onAddLeads(newDiscoveredLeads);
    }, 3800);
  };

  const handleDownloadSampleCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Company Name,Contact Name,Title,City,State,Phone,Email,Website,Category,Persona\n" +
      "Zenith Wellness Showroom,Mark Taylor,Senior Buyer,Houston,Texas,+1 (713) 555-0101,mark@zenithwellness.com,https://zenithwellness.com,Singing Bowls,Showrooms\n" +
      "Lone Star Holistic Imports,Sarah Clark,Procurement Director,Austin,Texas,+1 (512) 555-0202,sclark@lonestarimports.com,https://lonestarimports.com,Singing Bowls,Importers\n" +
      "Sedona Acoustic Sanctuary,Rachel Adams,Owner,Sedona,Arizona,+1 (928) 555-0303,rachel@sedonaacoustic.com,https://sedonaacoustic.com,Singing Bowls,Wellness Stores";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "tradepulse_sample_prospect_leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sourceTabs = [
    { id: 'Google Maps Scraper', label: 'Google Maps Scraper', sub: 'Showrooms & Phone Numbers', icon: MapPin },
    { id: 'LinkedIn Buyer Finder', label: 'LinkedIn Buyer Radar', sub: 'Apollo & Lusha Decision Makers', icon: Briefcase },
    { id: 'ImportYeti Trade', label: 'ImportYeti Trade Intel', sub: 'CBP Sea Manifests (Nhava Sheva)', icon: Ship },
    { id: 'Faire / Thomasnet', label: 'B2B Expos & Directories', sub: 'Faire, Thomasnet, NY NOW', icon: Store },
    { id: 'CSV Upload', label: 'Raw Lead CSV Uploader', sub: 'Drag & Drop Prospect Rosters', icon: UploadCloud },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 animate-in fade-in duration-300">
      
      {/* 1. PAGE HERO */}
      <PageHero
        eyebrow="Targeted Lead Generation // 5 Live Channels"
        eyebrowIcon={<Radar className="h-4 w-4 text-[#F59E0B]" />}
        title="Multi-Source US Buyer Discovery"
        gradientWord="Discovery"
        description="Drill down into specific US state and city corridors to discover high-value acoustic showrooms, holistic studios, and container-scale wholesale importers."
        actions={
          <>
            <Button
              variant="secondary"
              size="md"
              onClick={handleDownloadSampleCsv}
              icon={<Download className="h-4 w-4" />}
            >
              Sample Leads CSV
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleRunScan}
              disabled={isScanning}
              icon={isScanning ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4 fill-current" />}
            >
              {isScanning ? `Scanning ${selectedCity}...` : 'Run Discovery Scan'}
            </Button>
          </>
        }
      />

      {/* 2. GEOGRAPHIC DRILL-DOWN (2x2 GRID ON LAPTOP, 4 COLS ON LARGE) */}
      <Card padding="lg" className="space-y-8">
        <div>
          <h3 className="text-[20px] font-bold text-[#F5F5F7] tracking-tight">
            Target Corridor & Category Specification
          </h3>
          <p className="text-[15px] text-[#A1A1AA] mt-1">
            Narrow down your search parameters to isolate targeted wholesale buyers.
          </p>
        </div>

        {/* 2x2 Grid with 24px Gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
          
          {/* Field 1: Category */}
          <Select
            label="Product Export Category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ProductCategory)}
          >
            <option value="Singing Bowls">Singing Bowls (7-Metal Bronze)</option>
            <option value="Home Decor">Home Decor (Artisanal Metalware)</option>
            <option value="Brass Lamps">Brass Lamps (Moradabad Filigree)</option>
            <option value="Handcrafted Accents">Handcrafted Accents (Jaipur Craft)</option>
          </Select>

          {/* Field 2: Target Country */}
          <div className="space-y-2">
            <label className="block text-[13px] font-mono uppercase tracking-eyebrow text-[#A1A1AA] font-semibold">
              Target Country
            </label>
            <div className="h-[54px] rounded-control bg-[#0E0E12] border border-white/10 px-5 flex items-center justify-between text-[16px] text-[#F5F5F7]">
              <div className="flex items-center gap-3">
                <Globe2 className="h-5 w-5 text-[#6366F1]" />
                <span className="font-semibold">United States (USA)</span>
              </div>
              <span className="rounded-full bg-[#34D399]/15 px-3 py-0.5 text-[12px] font-mono font-bold text-[#34D399]">
                Primary Corridor
              </span>
            </div>
          </div>

          {/* Field 3: State Selector */}
          <Select
            label="US Target State"
            value={selectedState}
            onChange={(e) => {
              const newState = e.target.value;
              setSelectedState(newState);
              setSelectedCity(US_GEO_DATA[newState][0]);
            }}
          >
            {Object.keys(US_GEO_DATA).map((state) => (
              <option key={state} value={state}>
                {state} ({state === 'Texas' ? 'Houston / Austin Corridor' : state === 'California' ? 'Long Beach / LA Port' : 'Major Hub'})
              </option>
            ))}
          </Select>

          {/* Field 4: City Metro Selector */}
          <Select
            label="City Metro Drill-Down"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {US_GEO_DATA[selectedState]?.map((city) => (
              <option key={city} value={city}>
                {city}, {selectedState}
              </option>
            ))}
          </Select>

        </div>

        {/* Target Buyer Personas (44px tall, 16px text, 20px padding) */}
        <div className="pt-6 border-t border-white/[0.08] space-y-4">
          <label className="block text-[13px] font-mono uppercase tracking-eyebrow text-[#A1A1AA] font-semibold">
            Target Buyer Personas (Select All That Apply)
          </label>
          <div className="flex flex-wrap gap-3.5">
            {(['Showrooms', 'Wellness Stores', 'Wholesalers', 'Importers', 'Distributors', 'Retailers'] as BuyerPersona[]).map((p) => {
              const isSelected = selectedPersonas.includes(p);
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePersona(p)}
                  className={`h-11 px-5 rounded-full text-[15px] font-medium transition-all flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/35 shadow-sm'
                      : 'bg-[#0E0E12] text-[#A1A1AA] border border-white/10 hover:bg-[#15151A] hover:text-[#F5F5F7]'
                  }`}
                >
                  {isSelected ? (
                    <Check className="h-4 w-4 text-[#F59E0B]" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-[#6B6B75]" />
                  )}
                  <span>{p}</span>
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* 3. RESPONSIVE GRID OF SELECTABLE SOURCE CONNECTOR CARDS */}
      <div className="space-y-6">
        <div>
          <h3 className="text-[20px] font-bold text-[#F5F5F7] tracking-tight">
            Multi-Platform Sourcing Connectors
          </h3>
          <p className="text-[15px] text-[#A1A1AA] mt-1">
            Toggle between live intelligence sources to configure scan parameters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {sourceTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSource === tab.id;

            return (
              <div
                key={tab.id}
                onClick={() => setActiveSource(tab.id as any)}
                className={`p-6 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between h-40 ${
                  isActive
                    ? 'bg-[#0E0E12] border-[#F59E0B] shadow-[0_0_30px_-8px_rgba(245,158,11,0.3)] -translate-y-1'
                    : 'bg-[#0E0E12]/70 border-white/10 hover:border-white/20 hover:bg-[#15151A]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${
                    isActive ? 'bg-[#F59E0B]/15 text-[#F59E0B]' : 'bg-white/[0.04] text-[#A1A1AA]'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  {isActive && (
                    <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]" />
                  )}
                </div>

                <div>
                  <h4 className={`text-[16px] font-bold ${
                    isActive ? 'text-[#F5F5F7]' : 'text-[#A1A1AA]'
                  }`}>
                    {tab.label}
                  </h4>
                  <p className="text-[13px] font-mono text-[#6B6B75] mt-1 truncate">
                    {tab.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. ACTIVE SOURCE CONFIGURATION PANEL */}
      <Card padding="lg" className="space-y-6">
        {activeSource === 'Google Maps Scraper' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-[19px] font-bold text-[#F5F5F7]">Google Places & Maps Scraping Agent</h3>
              <p className="text-[15px] text-[#A1A1AA] mt-1">
                Extracts physical showroom names, addresses, direct telephone lines for cold calling, and contact emails.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#0E0E12] border border-white/10 space-y-2">
                <span className="text-[13px] font-mono uppercase tracking-eyebrow text-[#6B6B75]">Primary Query</span>
                <p className="text-[16px] font-mono font-semibold text-[#F59E0B]">
                  "sound healing showroom {selectedCity} {selectedState}"
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0E0E12] border border-white/10 space-y-2">
                <span className="text-[13px] font-mono uppercase tracking-eyebrow text-[#6B6B75]">Secondary Scrape</span>
                <p className="text-[16px] font-mono font-semibold text-[#F5F5F7]">
                  "tibetan singing bowl wholesale {selectedCity}"
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0E0E12] border border-white/10 space-y-2">
                <span className="text-[13px] font-mono uppercase tracking-eyebrow text-[#6B6B75]">Extraction Scope</span>
                <p className="text-[16px] font-mono font-semibold text-[#34D399]">
                  Website DOM + Phone + Decision Maker
                </p>
              </div>
            </div>
          </div>
        )}

        {activeSource === 'LinkedIn Buyer Finder' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-[19px] font-bold text-[#F5F5F7]">LinkedIn Decision-Maker & Buyer Radar</h3>
              <p className="text-[15px] text-[#A1A1AA] mt-1">
                Enriched with Apollo/Lusha direct work emails and direct dials for procurement directors.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E0E12] border border-white/10 space-y-3">
              <span className="text-[13px] font-mono uppercase tracking-eyebrow text-[#6B6B75]">
                Target Decision-Maker Titles in {selectedState}:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {['Senior Buyer', 'Purchasing Director', 'Head of Imports', 'Sound Healing Studio Owner', 'Curator & Merchandiser'].map((title, i) => (
                  <span key={i} className="px-3.5 py-1.5 rounded-full bg-[#6366F1]/12 border border-[#6366F1]/25 text-[#A5B4FC] font-mono text-[14px]">
                    {title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSource === 'ImportYeti Trade' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-[19px] font-bold text-[#F5F5F7]">ImportYeti Customs & Bill of Lading Manifests</h3>
              <p className="text-[15px] text-[#A1A1AA] mt-1">
                Tracks ocean shipments from Port of Nhava Sheva (Mumbai) to Houston and Long Beach.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#0E0E12] border border-white/10 space-y-2">
                <span className="text-[13px] font-mono uppercase tracking-eyebrow text-[#6B6B75]">Harmonized Tariff</span>
                <p className="text-[16px] font-mono font-bold text-[#F59E0B]">HS 9206.00 (Percussion Bowls)</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0E0E12] border border-white/10 space-y-2">
                <span className="text-[13px] font-mono uppercase tracking-eyebrow text-[#6B6B75]">Indian Sea Ports</span>
                <p className="text-[16px] font-mono font-semibold text-[#F5F5F7]">Nhava Sheva & Mundra</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0E0E12] border border-white/10 space-y-2">
                <span className="text-[13px] font-mono uppercase tracking-eyebrow text-[#6B6B75]">US Port of Unlading</span>
                <p className="text-[16px] font-mono font-bold text-[#34D399]">Port of Houston, TX</p>
              </div>
            </div>
          </div>
        )}

        {activeSource === 'Faire / Thomasnet' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-[19px] font-bold text-[#F5F5F7]">Wholesale Directories & Trade Show Expos</h3>
              <p className="text-[15px] text-[#A1A1AA] mt-1">
                Crawls wholesale registries, Faire boutique directories, Thomasnet, Yelp, and NY NOW / Las Vegas Market catalogs.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#0E0E12] border border-white/10 text-[15px] text-[#A1A1AA] leading-relaxed">
              Targeting wholesale buyers with verified retail reseller permits (sales tax exemptions) actively stocking handcrafted sacred brass, meditation bells, and Indian artisanal gifts.
            </div>
          </div>
        )}

        {activeSource === 'CSV Upload' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-[19px] font-bold text-[#F5F5F7]">Bulk Prospect CSV Spreadsheet Uploader</h3>
              <p className="text-[15px] text-[#A1A1AA] mt-1">
                Drag and drop raw prospect rosters exported from Apollo, Google Maps, or trade shows.
              </p>
            </div>

            <div
              onClick={() => {
                alert('Opening file selector for US buyer CSV import.');
                handleRunScan();
              }}
              className="rounded-2xl border-2 border-dashed border-white/15 hover:border-[#F59E0B]/50 p-12 text-center bg-[#0E0E12]/50 hover:bg-[#0E0E12] cursor-pointer transition-all space-y-3"
            >
              <UploadCloud className="h-12 w-12 text-[#F59E0B] mx-auto" />
              <p className="text-[17px] font-bold text-[#F5F5F7]">Click or drag & drop US buyer CSV list here</p>
              <p className="text-[14px] text-[#A1A1AA]">Supports UTF-8 CSV, XLSX with auto-column mapping</p>
            </div>
          </div>
        )}
      </Card>

      {/* 5. LIVE TERMINAL SCAN STREAM (MIN-HEIGHT 360PX, 64PX GAP BELOW) */}
      {(isScanning || scanCompleted) && (
        <div className="rounded-2xl bg-[#07070A] border border-white/15 p-8 font-mono shadow-2xl min-h-[360px] space-y-5">
          {/* Window Chrome Header with 3 Dots */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full bg-[#F87171]" />
                <span className="h-3.5 w-3.5 rounded-full bg-[#FBBF24]" />
                <span className="h-3.5 w-3.5 rounded-full bg-[#34D399]" />
              </div>
              <span className="text-[14px] font-bold text-[#F5F5F7] ml-2">
                TradePulse Live Extraction Console // v2.8
              </span>
            </div>

            <div className="flex items-center gap-4 text-[14px]">
              <span className="text-[#A1A1AA]">{scanProgress}% Processed</span>
              <span className={`h-3 w-3 rounded-full ${isScanning ? 'bg-[#F59E0B] animate-ping' : 'bg-[#34D399]'}`} />
            </div>
          </div>

          {/* Thick Animated Progress Bar */}
          <div className="w-full bg-[#15151A] rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#34D399] h-full transition-all duration-300 rounded-full"
              style={{ width: `${scanProgress}%` }}
            />
          </div>

          {/* Terminal Logs: 15px mono, line-height 1.9 */}
          <div className="space-y-2 text-[15px] leading-[1.9] text-[#A1A1AA] max-h-64 overflow-y-auto pt-2">
            {scanLogs.map((log, idx) => (
              <div
                key={idx}
                className={
                  log.includes('SUCCESS')
                    ? 'text-[#34D399] font-bold'
                    : log.includes('Targeted')
                    ? 'text-[#F59E0B] font-semibold'
                    : 'text-[#A1A1AA]'
                }
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visible Bottom Breathing Room (64px) */}
      <div className="h-16" />

    </div>
  );
};
