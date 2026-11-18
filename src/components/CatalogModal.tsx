import React, { useState } from 'react';
import {
  X,
  FileText,
  Download,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  Sparkles,
  Layers,
  Scale,
  Ship,
  Volume2
} from 'lucide-react';
import { Button } from './ui/Button';

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAttachToPitch?: () => void;
}

export const CatalogModal: React.FC<CatalogModalProps> = ({
  isOpen,
  onClose,
  onAttachToPitch
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [copied, setCopied] = useState(false);
  const totalPages = 4;

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText('https://tradepulse-exports.in/catalogs/India_Singing_Bowls_Catalog_2026.pdf');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative flex flex-col w-full max-w-5xl max-h-[92vh] rounded-card bg-[#0E0E12] border border-white/15 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/[0.08] bg-[#07070A]/80">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B]">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-[18px] font-bold text-[#F5F5F7] tracking-tight">
                  India_Handcrafted_Singing_Bowls_Catalog_2026.pdf
                </h3>
                <span className="rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 px-3 py-0.5 text-[13px] font-mono font-bold text-[#F59E0B]">
                  4.2 MB • Verified PDF/A
                </span>
              </div>
              <p className="text-[14px] text-[#A1A1AA] mt-0.5">
                Official Export Presentation Deck for US Wholesalers & Sound Healing Showrooms
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyLink}
              icon={copied ? <Check className="h-4 w-4 text-[#34D399]" /> : <Share2 className="h-4 w-4" />}
            >
              {copied ? 'Link Copied' : 'Share Link'}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => alert('Downloading official India_Handcrafted_Singing_Bowls_Catalog_2026.pdf')}
              icon={<Download className="h-4 w-4" />}
            >
              Download PDF
            </Button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#A1A1AA] hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* PDF Page Viewer Body */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 bg-[#07070A]">

          {currentPage === 1 && (
            <div className="relative rounded-card bg-gradient-to-b from-[#15151A] to-[#0E0E12] border border-white/10 p-10 sm:p-16 text-center overflow-hidden space-y-8">
              <div className="inline-flex items-center gap-2.5 rounded-full bg-[#F59E0B]/12 border border-[#F59E0B]/30 px-4 py-1.5 text-[14px] font-semibold text-[#F59E0B]">
                <Sparkles className="h-4 w-4" />
                <span>Jaipur & Moradabad Artisan Guild • 2026 US Wholesale Catalog</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F5F5F7] tracking-tight leading-[1.15] max-w-3xl mx-auto font-display">
                Sacred Sound Vibrations: Authentic 7-Metal Hand-Hammered Himalayan Singing Bowls
              </h1>

              <p className="text-[17px] text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
                Direct export collections crafted by multi-generational metalsmiths in Rajasthan & Uttar Pradesh. Tuned to 432Hz Solfeggio frequencies for acoustic therapy, spas, and wellness sanctuaries.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-3xl mx-auto pt-4">
                <div className="p-5 rounded-2xl bg-[#07070A] border border-white/10 text-center">
                  <Award className="h-6 w-6 text-[#F59E0B] mx-auto mb-2" />
                  <p className="text-[13px] text-[#A1A1AA]">Purity Standard</p>
                  <p className="text-[15px] font-bold text-[#F5F5F7] mt-0.5">7-Metal Bronze</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#07070A] border border-white/10 text-center">
                  <Volume2 className="h-6 w-6 text-[#6366F1] mx-auto mb-2" />
                  <p className="text-[13px] text-[#A1A1AA]">Acoustic Pitch</p>
                  <p className="text-[15px] font-bold text-[#F5F5F7] mt-0.5">432Hz Certified</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#07070A] border border-white/10 text-center">
                  <Scale className="h-6 w-6 text-[#34D399] mx-auto mb-2" />
                  <p className="text-[13px] text-[#A1A1AA]">Wholesale MOQ</p>
                  <p className="text-[15px] font-bold text-[#F5F5F7] mt-0.5">25 Units / 5 Sets</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#07070A] border border-white/10 text-center">
                  <Ship className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
                  <p className="text-[13px] text-[#A1A1AA]">US Sea Ports</p>
                  <p className="text-[15px] font-bold text-[#F5F5F7] mt-0.5">Houston / LA</p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/[0.08] flex items-center justify-center gap-8 text-[14px] text-[#6B6B75] font-mono">
                <span>HS TARIFF: 9206.00</span>
                <span>•</span>
                <span>ORIGIN: JAIPUR, INDIA</span>
                <span>•</span>
                <span>INSPECTION: SGS CERTIFIED</span>
              </div>
            </div>
          )}

          {currentPage === 2 && (
            <div className="rounded-card bg-[#0E0E12] border border-white/10 p-8 sm:p-10 space-y-8">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
                <div>
                  <span className="text-[13px] font-mono uppercase tracking-eyebrow text-[#F59E0B] font-semibold">Page 2 // Metallurgy & Acoustics</span>
                  <h2 className="text-[22px] font-bold text-[#F5F5F7] mt-1">7-Metal Sacred Formulation & 432Hz Sound Engineering</h2>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-white/[0.06] text-[14px] text-[#F5F5F7] font-mono">Bell Bronze (Kansa)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-[15px] font-bold text-[#F5F5F7] uppercase tracking-wide">Chemical Composition Matrix</h3>
                  <div className="space-y-3">
                    {[
                      { metal: 'Copper (Cu)', pct: '71.5%', note: 'Pure electrolytic copper for warm acoustic sustain' },
                      { metal: 'Tin (Sn)', pct: '27.8%', note: 'High bell-metal grade for ring resonance (>45 sec)' },
                      { metal: 'Zinc, Iron, Silver, Gold, Lead', pct: '0.7%', note: 'Traditional planetary 7-metal ritual alloy' }
                    ].map((m, i) => (
                      <div key={i} className="rounded-2xl bg-[#07070A] border border-white/10 p-5 flex justify-between items-center">
                        <div>
                          <p className="text-[15px] font-bold text-[#F5F5F7]">{m.metal}</p>
                          <p className="text-[13px] text-[#A1A1AA] mt-0.5">{m.note}</p>
                        </div>
                        <span className="text-[16px] font-mono font-bold text-[#F59E0B]">{m.pct}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[15px] font-bold text-[#F5F5F7] uppercase tracking-wide">Solfeggio Frequency Chart (7 Chakras)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[14px]">
                    {[
                      { chakra: 'Root Chakra', note: 'Note C (256Hz / 432Hz harmonic)' },
                      { chakra: 'Sacral Chakra', note: 'Note D (288Hz harmonic)' },
                      { chakra: 'Solar Plexus', note: 'Note E (324Hz harmonic)' },
                      { chakra: 'Heart Chakra', note: 'Note F (341Hz harmonic)' },
                      { chakra: 'Throat Chakra', note: 'Note G (384Hz harmonic)' },
                      { chakra: 'Third Eye & Crown', note: 'Note A & B (432Hz & 486Hz)' },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#07070A] border border-white/[0.06]">
                        <p className="text-[14px] font-bold text-[#A5B4FC]">{item.chakra}</p>
                        <p className="text-[13px] text-[#A1A1AA] font-mono mt-0.5">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === 3 && (
            <div className="rounded-card bg-[#0E0E12] border border-white/10 p-8 sm:p-10 space-y-8">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
                <div>
                  <span className="text-[13px] font-mono uppercase tracking-eyebrow text-[#34D399] font-semibold">Page 3 // Wholesale Price Matrix</span>
                  <h2 className="text-[22px] font-bold text-[#F5F5F7] mt-1">2026 FOB & DDP Wholesale Pricing Schedule (USD)</h2>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-[#34D399]/15 border border-[#34D399]/30 text-[14px] text-[#34D399] font-mono font-bold">MOQ 25 Units</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[15px] border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-white/[0.08] text-[#A1A1AA] font-mono text-[13px] tracking-eyebrow uppercase">
                      <th className="py-4 px-4">Item Code</th>
                      <th className="py-4 px-4">Product Description</th>
                      <th className="py-4 px-4">Diameter / Weight</th>
                      <th className="py-4 px-4">FOB India</th>
                      <th className="py-4 px-4">DDP Houston/LA</th>
                      <th className="py-4 px-4">Suggested Retail</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06] text-[#A1A1AA]">
                    {[
                      { code: 'SB-07-CHK', desc: 'Hand-Hammered 7" Chakra Bowl + Suede Mallet', spec: '7.2 inch / 850g', fob: '$18.50', ddp: '$24.20', msrp: '$75.00' },
                      { code: 'SB-09-MST', desc: 'Master Acoustic 9" Deep Meditation Bowl', spec: '9.4 inch / 1,450g', fob: '$34.00', ddp: '$42.50', msrp: '$135.00' },
                      { code: 'SB-12-GNG', desc: 'Temple Grade 12" Resonant Gong Bowl', spec: '12.0 inch / 2,600g', fob: '$68.00', ddp: '$82.00', msrp: '$260.00' },
                      { code: 'SET-07-SAC', desc: 'Complete 7-Chakra Tuned Master Set + Wooden Box', spec: '7 Bowls Set / 8.5kg', fob: '$185.00', ddp: '$225.00', msrp: '$650.00' },
                      { code: 'DEC-BL-01', desc: 'Handcrafted Moradabad Brass Filigree Hanging Lamp', spec: '14 inch / 1.2kg', fob: '$22.00', ddp: '$28.50', msrp: '$95.00' }
                    ].map((row, i) => (
                      <tr key={i} className="h-16 hover:bg-[#15151A] transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-[#F59E0B]">{row.code}</td>
                        <td className="py-3 px-4 font-semibold text-[#F5F5F7]">{row.desc}</td>
                        <td className="py-3 px-4 font-mono text-[#A1A1AA]">{row.spec}</td>
                        <td className="py-3 px-4 font-mono font-bold text-[#34D399]">{row.fob}</td>
                        <td className="py-3 px-4 font-mono text-[#A5B4FC]">{row.ddp}</td>
                        <td className="py-3 px-4 font-mono text-[#6B6B75] line-through">{row.msrp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-5 rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[14px] text-[#F59E0B] flex items-center justify-between">
                <span>Custom Laser Engraving on Mallets & Wooden Keepsake Boxes included on orders over $2,500.</span>
                <span className="font-mono font-bold">Standard Lead Time: 18-24 Days</span>
              </div>
            </div>
          )}

          {currentPage === 4 && (
            <div className="rounded-card bg-[#0E0E12] border border-white/10 p-8 sm:p-10 space-y-8">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
                <div>
                  <span className="text-[13px] font-mono uppercase tracking-eyebrow text-[#6366F1] font-semibold">Page 4 // US Customs & Logistics</span>
                  <h2 className="text-[22px] font-bold text-[#F5F5F7] mt-1">Export Compliance, Harmonized Codes & Freight Routes</h2>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-white/[0.06] text-[14px] text-[#F5F5F7] font-mono">DDP & CIF Available</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#07070A] border border-white/10 space-y-2">
                  <ShieldCheck className="h-7 w-7 text-[#34D399] mb-2" />
                  <h3 className="text-[16px] font-bold text-[#F5F5F7]">US CBP Compliance</h3>
                  <p className="text-[14px] text-[#A1A1AA] leading-relaxed">
                    HTS Code: 9206.00.8000 (Percussion Musical Instruments). Duty Free or low MFN 2.9%. Full Certificate of Origin (India) provided.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-[#07070A] border border-white/10 space-y-2">
                  <Ship className="h-7 w-7 text-cyan-400 mb-2" />
                  <h3 className="text-[16px] font-bold text-[#F5F5F7]">Ocean Freight Routes</h3>
                  <p className="text-[14px] text-[#A1A1AA] leading-relaxed">
                    Ocean LCL/FCL: Port of Nhava Sheva (IN) ➔ Port of Houston, TX (28 days) or Port of Los Angeles (26 days). Air Cargo: 4-6 days.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-[#07070A] border border-white/10 space-y-2">
                  <Layers className="h-7 w-7 text-[#F59E0B] mb-2" />
                  <h3 className="text-[16px] font-bold text-[#F5F5F7]">Export Packaging</h3>
                  <p className="text-[14px] text-[#A1A1AA] leading-relaxed">
                    Heavy-duty 5-ply corrugated carton with internal custom-molded high-density EVA foam cushions. Marine transit insurance included.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-8 py-5 border-t border-white/[0.08] bg-[#07070A]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 disabled:opacity-40 text-[#F5F5F7] transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-[14px] font-mono text-[#A1A1AA]">
              Page <strong className="text-[#F5F5F7]">{currentPage}</strong> of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 disabled:opacity-40 text-[#F5F5F7] transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {onAttachToPitch && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  onAttachToPitch();
                  onClose();
                }}
              >
                Attach to Active Campaign Pitch
              </Button>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
            >
              Close Viewer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
