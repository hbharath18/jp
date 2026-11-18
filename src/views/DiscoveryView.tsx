import React, { useState } from 'react';
import { 
  Radar, 
  MapPin, 
  Play, 
  UploadCloud, 
  Globe2, 
  Ship, 
  Store, 
  Check, 
  RefreshCw, 
  Download, 
  Briefcase 
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
  const [category, setCategory] = useState<ProductCategory>('Singing Bowls');
  const [selectedState, setSelectedState] = useState<string>('Texas');
  const [selectedCity, setSelectedCity] = useState<string>('Houston');
  const [selectedPersonas, setSelectedPersonas] = useState<BuyerPersona[]>([
    'Showrooms', 
    'Wellness Stores', 
    'Wholesalers', 
    'Importers'
  ]);
  
  const [activeSource, setActiveSource] = useState<LeadSource | 'CSV Upload'>('Google Maps Scraper');
  
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [scanCompleted, setScanCompleted] = useState(false);

  const togglePersona = (p: BuyerPersona) => {
    if (selectedPersonas.includes(p)) {
      if (selectedPersonas.length > 1) {
        setSelectedPersonas(selectedPersonas.filter(item => item !== p));
      }
    } else {
      setSelectedPersonas([...selectedPersonas, p]);
    }
  };

  const handleRunScan = () => {
    setIsScanning(true);
    setScanProgress(15);
    setScanCompleted(false);
    setScanLogs([
      `[00:01] TradePulse Engine active: US Corridor -> ${selectedState} (${selectedCity})`,
      `[00:02] Querying ${activeSource} endpoints for [${category}]...`
    ]);

    setTimeout(() => {
      setScanProgress(50);
      setScanLogs(prev => [
        ...prev,
        `[00:04] Scraping place entities in ${selectedCity}, ${selectedState}...`,
        `[00:05] Matching personas: ${selectedPersonas.join(', ')}`
      ]);
    }, 1200);

    setTimeout(() => {
      setScanProgress(80);
      setScanLogs(prev => [
        ...prev,
        `[00:07] Cross-referencing US Customs manifests for HS 9206.00...`,
        `[00:08] Running anti-duplicate check against ${totalLeadsCount} records...`
      ]);
    }, 2400);

    setTimeout(() => {
      setScanProgress(100);
      setScanLogs(prev => [
        ...prev,
        `[00:09] SUCCESS: Ingested 2 qualified US buyer leads into database.`,
        `[00:09] 1. "${selectedCity} Tibetan Sound Temple" (${selectedCity}) - Valid Email & Phone`,
        `[00:09] 2. "${selectedState} Artisan Living & Imports" (${selectedCity}) - ImportYeti Verified`
      ]);
      setIsScanning(false);
      setScanCompleted(true);

      const newDiscoveredLeads: Lead[] = [
        {
          id: `lead-new-${Date.now()}-1`,
          companyName: `${selectedCity} Tibetan Sound Temple`,
          contactName: 'Amanda Vance',
          title: 'Managing Curator',
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
          aiReasoning: `Showroom located in ${selectedCity}, ${selectedState}. Hosts sound bath certifications with retail inventory display.`,
          outreachStatus: 'Not Contacted',
          callStatus: 'Pending',
          isDuplicate: false,
          shipmentsCount: 5,
          estimatedAnnualVolume: '$48,000 / yr',
          notes: 'Discovered via live TradePulse scan.',
          dateAdded: '2026-11-18'
        },
        {
          id: `lead-new-${Date.now()}-2`,
          companyName: `${selectedState} Artisan Living & Imports`,
          contactName: 'Gregory Scott',
          title: 'Director of Sourcing',
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
          aiReasoning: `US Customs Bill of Lading shows 14 container entries from India (Nhava Sheva to Houston/LA).`,
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
    { id: 'Google Maps Scraper', label: 'Google Maps Scraper', sub: 'Places & Direct Phones', icon: MapPin },
    { id: 'LinkedIn Buyer Finder', label: 'LinkedIn Buyer Radar', sub: 'Apollo Verified Buyers', icon: Briefcase },
    { id: 'ImportYeti Trade', label: 'ImportYeti Intelligence', sub: 'US CBP Sea Manifests', icon: Ship },
    { id: 'Faire / Thomasnet', label: 'B2B Directories & Expos', sub: 'Wholesale Catalogues', icon: Store },
    { id: 'CSV Upload', label: 'CSV Lead Uploader', sub: 'Spreadsheet Ingest', icon: UploadCloud },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      
      {/* 1. PAGE HERO (text-4xl, 1 sentence) */}
      <PageHero
        eyebrow="Targeted Lead Scraper"
        eyebrowIcon={<Radar className="h-3.5 w-3.5 text-[#2FBF8F]" />}
        title="Multi-Source US Buyer Discovery"
        gradientWord="Discovery"
        description="Filter by US state and city to extract verified showroom buyers and container-scale importers."
        actions={
          <>
            <Button
              variant="secondary"
              size="md"
              onClick={handleDownloadSampleCsv}
              icon={<Download className="h-4 w-4" />}
            >
              Sample CSV
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

      {/* 2. FILTERS (2-COLUMN GRID, 4 AT >=1600PX, SELECTS 52PX TALL, PX-4, GAP-6) */}
      <Card padding="md" className="space-y-6">
        <div>
          <h3 className="text-[17px] font-bold text-[#E5E9F0]">
            Target Geographic & Product Parameters
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
          
          {/* Category */}
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

          {/* Target Country: Bug fix applied (8px green dot, whitespace-nowrap, min-w-0, truncate only long values) */}
          <div className="space-y-2 min-w-0">
            <label className="block text-[12px] font-mono uppercase tracking-eyebrow text-[#9AA4B2] font-semibold whitespace-nowrap">
              Target Country
            </label>
            <div className="h-[52px] rounded-control bg-[#10151C] border border-[rgba(148,163,184,0.12)] px-4 flex items-center justify-between text-[15px] text-[#E5E9F0] min-w-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <Globe2 className="h-4 w-4 text-[#7C8DB5] shrink-0" />
                <span className="font-medium whitespace-nowrap truncate">United States (USA)</span>
              </div>
              <span className="h-2 w-2 rounded-full bg-[#2FBF8F] shrink-0 ml-2" title="Primary Corridor" />
            </div>
          </div>

          {/* State Selector */}
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
                {state}
              </option>
            ))}
          </Select>

          {/* City Selector */}
          <Select
            label="City Metro Hub"
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

        {/* Persona Chips (44px tall, 15px text, whitespace-nowrap shrink-0) */}
        <div className="pt-4 border-t border-[rgba(148,163,184,0.08)] space-y-3">
          <label className="block text-[12px] font-mono uppercase tracking-eyebrow text-[#9AA4B2] font-semibold">
            Target Buyer Personas
          </label>
          <div className="flex flex-wrap gap-2.5">
            {(['Showrooms', 'Wellness Stores', 'Wholesalers', 'Importers', 'Distributors', 'Retailers'] as BuyerPersona[]).map((p) => {
              const isSelected = selectedPersonas.includes(p);
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePersona(p)}
                  className={`h-10 px-4 rounded-full text-[14px] font-medium transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[rgba(47,191,143,0.12)] text-[#2FBF8F] border border-[rgba(47,191,143,0.3)]'
                      : 'bg-[#161C25] text-[#9AA4B2] border border-[rgba(148,163,184,0.1)] hover:bg-[#1B222D] hover:text-[#E5E9F0]'
                  }`}
                >
                  {isSelected ? (
                    <Check className="h-3.5 w-3.5 text-[#2FBF8F]" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#667085]" />
                  )}
                  <span>{p}</span>
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* 3. SOURCE TABS: WRAP INTO A 2-ROW GRID, NO CUT-OFF TEXT */}
      <div className="space-y-4">
        <h3 className="text-[17px] font-bold text-[#E5E9F0]">
          Active Sourcing Connectors
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {sourceTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSource === tab.id;

            return (
              <div
                key={tab.id}
                onClick={() => setActiveSource(tab.id as any)}
                className={`p-4 rounded-panel border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#161C25] border-[#2FBF8F] text-[#E5E9F0]'
                    : 'bg-[#10151C] border-[rgba(148,163,184,0.12)] hover:border-[rgba(148,163,184,0.22)] text-[#9AA4B2]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${
                    isActive ? 'bg-[rgba(47,191,143,0.15)] text-[#2FBF8F]' : 'bg-[#161C25] text-[#667085]'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-[#2FBF8F]" />
                  )}
                </div>

                <div>
                  <h4 className="text-[14px] font-semibold text-[#E5E9F0] truncate">
                    {tab.label}
                  </h4>
                  <p className="text-[12px] font-mono text-[#667085] mt-0.5 truncate">
                    {tab.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. ACTIVE SOURCE PANEL */}
      <Card padding="md">
        {activeSource === 'Google Maps Scraper' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-[16px] font-bold text-[#E5E9F0]">Google Places Scraper</h4>
              <p className="text-[14px] text-[#9AA4B2] mt-0.5">
                Extracts showroom names, addresses, direct telephone lines, and contact emails.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-panel bg-[#161C25] space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-eyebrow text-[#667085]">Query</span>
                <p className="text-[14px] font-mono text-[#2FBF8F] truncate">
                  "sound healing showroom {selectedCity}"
                </p>
              </div>

              <div className="p-4 rounded-panel bg-[#161C25] space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-eyebrow text-[#667085]">Secondary</span>
                <p className="text-[14px] font-mono text-[#E5E9F0] truncate">
                  "singing bowls wholesale {selectedCity}"
                </p>
              </div>

              <div className="p-4 rounded-panel bg-[#161C25] space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-eyebrow text-[#667085]">Scope</span>
                <p className="text-[14px] font-mono text-[#7C8DB5]">
                  DOM + Phone + Decision Maker
                </p>
              </div>
            </div>
          </div>
        )}

        {activeSource === 'LinkedIn Buyer Finder' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-[16px] font-bold text-[#E5E9F0]">LinkedIn Buyer Radar</h4>
              <p className="text-[14px] text-[#9AA4B2] mt-0.5">
                Enriched decision maker titles with verified direct business emails.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Senior Buyer', 'Purchasing Director', 'Head of Imports', 'Sound Healing Studio Owner', 'Curator'].map((title, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-[#161C25] text-[#7C8DB5] font-mono text-[13px]">
                  {title}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeSource === 'ImportYeti Trade' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-[16px] font-bold text-[#E5E9F0]">ImportYeti Customs Manifests</h4>
              <p className="text-[14px] text-[#9AA4B2] mt-0.5">
                Tracks ocean container bills of lading from Nhava Sheva to US destination ports.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-[13px]">
              <div className="p-3.5 rounded-panel bg-[#161C25]">HTS 9206.00 (Percussion Bowls)</div>
              <div className="p-3.5 rounded-panel bg-[#161C25]">Origin: Nhava Sheva / Mundra</div>
              <div className="p-3.5 rounded-panel bg-[#161C25]">Destination: Port of Houston, TX</div>
            </div>
          </div>
        )}

        {activeSource === 'Faire / Thomasnet' && (
          <div className="space-y-3">
            <h4 className="text-[16px] font-bold text-[#E5E9F0]">B2B Expos & Catalogues</h4>
            <p className="text-[14px] text-[#9AA4B2]">
              Scrapes registered boutique retailers and wholesale buyers with active resale sales tax permits.
            </p>
          </div>
        )}

        {activeSource === 'CSV Upload' && (
          <div
            onClick={() => {
              alert('Opening file selector for buyer CSV import.');
              handleRunScan();
            }}
            className="rounded-panel border border-dashed border-[rgba(148,163,184,0.2)] hover:border-[#2FBF8F] p-8 text-center cursor-pointer transition-all"
          >
            <UploadCloud className="h-8 w-8 text-[#2FBF8F] mx-auto mb-2" />
            <p className="text-[15px] font-semibold text-[#E5E9F0]">Click to upload raw buyer CSV</p>
            <p className="text-[13px] text-[#667085] mt-0.5">UTF-8 CSV format with column header mapping</p>
          </div>
        )}
      </Card>

      {/* 5. LIVE TERMINAL CONSOLE */}
      {(isScanning || scanCompleted) && (
        <div className="rounded-panel bg-[#07090C] border border-[rgba(148,163,184,0.15)] p-6 font-mono space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(148,163,184,0.1)] text-[13px]">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#E07A7A]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#C9A66B]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#2FBF8F]" />
              <span className="text-[#9AA4B2] ml-2">Extraction Stream</span>
            </div>
            <span className="text-[#2FBF8F]">{scanProgress}%</span>
          </div>

          <div className="w-full bg-[#161C25] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#2FBF8F] h-full transition-all duration-300 rounded-full"
              style={{ width: `${scanProgress}%` }}
            />
          </div>

          <div className="space-y-1 text-[13px] leading-relaxed text-[#9AA4B2] max-h-48 overflow-y-auto">
            {scanLogs.map((log, idx) => (
              <div
                key={idx}
                className={log.includes('SUCCESS') ? 'text-[#2FBF8F] font-semibold' : 'text-[#9AA4B2]'}
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 64px Bottom Clearance */}
      <div className="h-16" />

    </div>
  );
};
