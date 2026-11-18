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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative flex flex-col w-full max-w-4xl max-h-[90vh] rounded-card bg-[#10151C] border border-[rgba(148,163,184,0.18)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(148,163,184,0.12)] bg-[#0A0D12]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(47,191,143,0.12)] text-[#2FBF8F]">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-[16px] font-bold text-[#E5E9F0] truncate">
                  Singing_Bowls_Catalog_2026.pdf
                </h3>
                <span className="rounded-full bg-[rgba(47,191,143,0.12)] px-2 py-0.5 text-[11px] font-mono font-medium text-[#2FBF8F] whitespace-nowrap shrink-0">
                  4.2 MB
                </span>
              </div>
              <p className="text-[13px] text-[#9AA4B2] truncate">
                Wholesale Export Presentation Deck for US Showrooms
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyLink}
              icon={copied ? <Check className="h-3.5 w-3.5 text-[#2FBF8F]" /> : <Share2 className="h-3.5 w-3.5" />}
            >
              {copied ? 'Copied' : 'Share'}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => alert('Downloading official catalog PDF simulation')}
              icon={<Download className="h-3.5 w-3.5" />}
            >
              Download
            </Button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#9AA4B2] hover:text-[#E5E9F0] hover:bg-white/[0.05]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Viewer */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#0A0D12]">
          {currentPage === 1 && (
            <div className="rounded-panel bg-[#10151C] border border-[rgba(148,163,184,0.12)] p-8 text-center space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(47,191,143,0.12)] border border-[rgba(47,191,143,0.25)] px-3 py-1 text-[12px] font-semibold text-[#2FBF8F]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Jaipur & Moradabad Guild • 2026 Export Collection</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#E5E9F0] tracking-tight max-w-2xl mx-auto">
                Authentic 7-Metal Hand-Hammered Himalayan Singing Bowls
              </h2>

              <p className="text-[15px] text-[#9AA4B2] max-w-xl mx-auto">
                Tuned to 432Hz Solfeggio frequencies for acoustic healing, spas, and boutique showrooms.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
                <div className="p-4 rounded-xl bg-[#161C25] border border-[rgba(148,163,184,0.1)] text-center">
                  <Award className="h-5 w-5 text-[#2FBF8F] mx-auto mb-1.5" />
                  <p className="text-[12px] text-[#9AA4B2]">Composition</p>
                  <p className="text-[14px] font-bold text-[#E5E9F0]">7-Metal Bronze</p>
                </div>
                <div className="p-4 rounded-xl bg-[#161C25] border border-[rgba(148,163,184,0.1)] text-center">
                  <Volume2 className="h-5 w-5 text-[#7C8DB5] mx-auto mb-1.5" />
                  <p className="text-[12px] text-[#9AA4B2]">Acoustic Pitch</p>
                  <p className="text-[14px] font-bold text-[#E5E9F0]">432Hz Solfeggio</p>
                </div>
                <div className="p-4 rounded-xl bg-[#161C25] border border-[rgba(148,163,184,0.1)] text-center">
                  <Scale className="h-5 w-5 text-[#2FBF8F] mx-auto mb-1.5" />
                  <p className="text-[12px] text-[#9AA4B2]">Wholesale MOQ</p>
                  <p className="text-[14px] font-bold text-[#E5E9F0]">25 Units</p>
                </div>
                <div className="p-4 rounded-xl bg-[#161C25] border border-[rgba(148,163,184,0.1)] text-center">
                  <Ship className="h-5 w-5 text-[#7C8DB5] mx-auto mb-1.5" />
                  <p className="text-[12px] text-[#9AA4B2]">Target Ports</p>
                  <p className="text-[14px] font-bold text-[#E5E9F0]">Houston / LA</p>
                </div>
              </div>
            </div>
          )}

          {currentPage === 2 && (
            <div className="rounded-panel bg-[#10151C] border border-[rgba(148,163,184,0.12)] p-6 space-y-6">
              <div className="border-b border-[rgba(148,163,184,0.1)] pb-3">
                <span className="text-[12px] font-mono uppercase tracking-eyebrow text-[#2FBF8F]">Page 2 // Metallurgy</span>
                <h3 className="text-[18px] font-bold text-[#E5E9F0]">7-Metal Formulation & Frequency Certification</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  {[
                    { metal: 'Copper (Cu)', pct: '71.5%', note: 'Acoustic sustain >45 sec' },
                    { metal: 'Tin (Sn)', pct: '27.8%', note: 'High bell-metal bronze grade' },
                    { metal: 'Trace Metals (Zn, Fe, Ag, Au)', pct: '0.7%', note: 'Planetary metals formulation' }
                  ].map((m, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-[#161C25] flex justify-between items-center text-[14px]">
                      <div>
                        <p className="font-semibold text-[#E5E9F0]">{m.metal}</p>
                        <p className="text-[12px] text-[#9AA4B2]">{m.note}</p>
                      </div>
                      <span className="font-mono font-bold text-[#2FBF8F]">{m.pct}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 text-[13px]">
                  {['Root (C - 256Hz)', 'Sacral (D - 288Hz)', 'Solar (E - 324Hz)', 'Heart (F - 341Hz)', 'Throat (G - 384Hz)', 'Third Eye (A - 432Hz)'].map((c, i) => (
                    <div key={i} className="p-3 rounded-lg bg-[#161C25] font-mono text-[#9AA4B2]">
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentPage === 3 && (
            <div className="rounded-panel bg-[#10151C] border border-[rgba(148,163,184,0.12)] p-6 space-y-4">
              <div className="border-b border-[rgba(148,163,184,0.1)] pb-3">
                <span className="text-[12px] font-mono uppercase tracking-eyebrow text-[#2FBF8F]">Page 3 // Wholesale Pricing</span>
                <h3 className="text-[18px] font-bold text-[#E5E9F0]">2026 FOB & DDP Schedule (USD)</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-[rgba(148,163,184,0.1)] text-[#9AA4B2] font-mono text-[12px]">
                      <th className="py-2.5">Item</th>
                      <th className="py-2.5">Description</th>
                      <th className="py-2.5">FOB India</th>
                      <th className="py-2.5">DDP Houston</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(148,163,184,0.06)] text-[#E5E9F0]">
                    {[
                      { code: 'SB-07-CHK', desc: '7" Chakra Bowl + Suede Mallet', fob: '$18.50', ddp: '$24.20' },
                      { code: 'SB-09-MST', desc: '9" Master Healing Bowl', fob: '$34.00', ddp: '$42.50' },
                      { code: 'SB-12-GNG', desc: '12" Resonant Gong Bowl', fob: '$68.00', ddp: '$82.00' },
                      { code: 'SET-07-SAC', desc: '7-Bowl Chakra Set + Box', fob: '$185.00', ddp: '$225.00' }
                    ].map((row, i) => (
                      <tr key={i} className="h-12 font-mono">
                        <td className="text-[#2FBF8F]">{row.code}</td>
                        <td className="font-sans">{row.desc}</td>
                        <td className="text-[#2FBF8F] font-bold">{row.fob}</td>
                        <td className="text-[#7C8DB5]">{row.ddp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {currentPage === 4 && (
            <div className="rounded-panel bg-[#10151C] border border-[rgba(148,163,184,0.12)] p-6 space-y-4">
              <div className="border-b border-[rgba(148,163,184,0.1)] pb-3">
                <span className="text-[12px] font-mono uppercase tracking-eyebrow text-[#7C8DB5]">Page 4 // Customs</span>
                <h3 className="text-[18px] font-bold text-[#E5E9F0]">HTS Classification & Sea Routes</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[13px]">
                <div className="p-4 rounded-xl bg-[#161C25] space-y-1">
                  <ShieldCheck className="h-5 w-5 text-[#2FBF8F] mb-1" />
                  <p className="font-semibold text-[#E5E9F0]">HTS 9206.00</p>
                  <p className="text-[#9AA4B2]">Percussion Instruments. Low MFN duty with Certificate of Origin.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#161C25] space-y-1">
                  <Ship className="h-5 w-5 text-[#7C8DB5] mb-1" />
                  <p className="font-semibold text-[#E5E9F0]">Nhava Sheva ➔ Houston</p>
                  <p className="text-[#9AA4B2]">28 days ocean container transit. Long Beach: 26 days.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#161C25] space-y-1">
                  <Layers className="h-5 w-5 text-[#2FBF8F] mb-1" />
                  <p className="font-semibold text-[#E5E9F0]">Export Packaging</p>
                  <p className="text-[#9AA4B2]">5-ply cartons with molded EVA foam. Transit insurance included.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-[rgba(148,163,184,0.12)] bg-[#0A0D12]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-lg bg-[#161C25] hover:bg-[#1B222D] disabled:opacity-30 text-[#E5E9F0]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-[13px] font-mono text-[#9AA4B2]">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded-lg bg-[#161C25] hover:bg-[#1B222D] disabled:opacity-30 text-[#E5E9F0]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onAttachToPitch && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  onAttachToPitch();
                  onClose();
                }}
              >
                Attach to Pitch
              </Button>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
