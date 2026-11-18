import React from 'react';
import { 
  X, 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Ship, 
  Sparkles, 
  Send, 
  PhoneCall, 
  UserCheck 
} from 'lucide-react';
import { Lead } from '../types';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

interface BuyerDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
  onSendEmail?: (lead: Lead) => void;
  onAddToDialer?: (lead: Lead) => void;
}

export const BuyerDetailModal: React.FC<BuyerDetailModalProps> = ({
  lead,
  onClose,
  onSendEmail,
  onAddToDialer
}) => {
  if (!lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative flex flex-col w-full max-w-2xl max-h-[90vh] rounded-card bg-[#10151C] border border-[rgba(148,163,184,0.18)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[rgba(148,163,184,0.12)] bg-[#0A0D12]">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[rgba(47,191,143,0.12)] text-[#2FBF8F]">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-[18px] font-bold text-[#E5E9F0] tracking-tight">
                  {lead.companyName}
                </h3>
                <Badge
                  variant={lead.aiClassification === 'B2B Business Buyer' ? 'emerald' : 'neutral'}
                  size="sm"
                >
                  {lead.aiClassification}
                </Badge>
                {lead.isDuplicate && (
                  <Badge variant="danger" size="sm">
                    Duplicate
                  </Badge>
                )}
              </div>
              <p className="text-[13px] text-[#9AA4B2] mt-1 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#667085]" />
                <span>{lead.city}, {lead.state}</span>
                <span>•</span>
                <span className="text-[#2FBF8F]">{lead.category}</span>
                <span>•</span>
                <span className="text-[#667085]">{lead.source}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9AA4B2] hover:text-[#E5E9F0] hover:bg-white/[0.05]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#0A0D12]">
          
          {/* Key Decision Maker & Contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#10151C] border border-[rgba(148,163,184,0.1)] space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-eyebrow text-[#667085] font-semibold">
                Decision Maker
              </span>
              <div className="flex items-center gap-2.5">
                <UserCheck className="h-4 w-4 text-[#2FBF8F]" />
                <div>
                  <p className="text-[14px] font-bold text-[#E5E9F0]">{lead.contactName}</p>
                  <p className="text-[12px] text-[#9AA4B2]">{lead.title}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#10151C] border border-[rgba(148,163,184,0.1)] space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-eyebrow text-[#667085] font-semibold">
                Contact Channels
              </span>
              <div className="space-y-1.5 text-[13px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#E5E9F0]">
                    <Mail className="h-3.5 w-3.5 text-[#7C8DB5]" />
                    <span className="font-mono">{lead.email || 'No email on file'}</span>
                  </div>
                  {lead.email && (
                    <Badge
                      variant={lead.emailStatus === 'Valid' ? 'success' : 'warning'}
                      size="sm"
                    >
                      {lead.emailStatus}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#E5E9F0]">
                    <Phone className="h-3.5 w-3.5 text-[#2FBF8F]" />
                    <span className="font-mono">{lead.phone}</span>
                  </div>
                  <span className="text-[11px] text-[#667085] font-mono">US Direct</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gemini AI Intelligence Dossier */}
          <div className="p-4 rounded-xl bg-[#10151C] border border-[rgba(47,191,143,0.2)] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#2FBF8F]" />
                <h4 className="text-[12px] font-bold text-[#E5E9F0] uppercase tracking-eyebrow font-mono">
                  Gemini 3.8 Intelligence Dossier
                </h4>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[rgba(47,191,143,0.12)] text-[12px] font-mono font-bold text-[#2FBF8F]">
                {lead.b2bConfidence}% Match
              </span>
            </div>
            <p className="text-[14px] text-[#9AA4B2] leading-relaxed">
              {lead.aiReasoning}
            </p>
          </div>

          {/* Trade & Import Intelligence */}
          <div className="p-4 rounded-xl bg-[#10151C] border border-[rgba(148,163,184,0.1)] space-y-3">
            <div className="flex items-center gap-2">
              <Ship className="h-4 w-4 text-[#7C8DB5]" />
              <h4 className="text-[12px] font-bold text-[#E5E9F0] uppercase tracking-eyebrow font-mono">
                ImportYeti Customs Activity
              </h4>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-lg bg-[#161C25]">
                <p className="text-[11px] text-[#667085] uppercase font-mono">Shipments</p>
                <p className="text-[15px] font-bold text-[#E5E9F0] font-mono mt-0.5">{lead.shipmentsCount || 0}</p>
              </div>
              <div className="p-3 rounded-lg bg-[#161C25]">
                <p className="text-[11px] text-[#667085] uppercase font-mono">Est. Volume</p>
                <p className="text-[15px] font-bold text-[#2FBF8F] font-mono mt-0.5">{lead.estimatedAnnualVolume || 'N/A'}</p>
              </div>
              <div className="p-3 rounded-lg bg-[#161C25]">
                <p className="text-[11px] text-[#667085] uppercase font-mono">Last Import</p>
                <p className="text-[15px] font-bold text-[#9AA4B2] font-mono mt-0.5">{lead.lastShipmentDate || 'Recent'}</p>
              </div>
            </div>
          </div>

          {/* Website Link */}
          <div className="flex items-center justify-between text-[13px] text-[#9AA4B2] px-1">
            <div className="flex items-center gap-2">
              <Globe className="h-3.5 w-3.5 text-[#667085]" />
              <a 
                href={lead.website} 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#2FBF8F] hover:underline font-mono"
              >
                {lead.website}
              </a>
            </div>
            <span>Discovered: <strong className="font-mono text-[#E5E9F0]">{lead.dateAdded}</strong></span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 border-t border-[rgba(148,163,184,0.12)] bg-[#0A0D12]">
          <div className="text-[13px] text-[#9AA4B2]">
            Status: <strong className="text-[#E5E9F0]">{lead.outreachStatus}</strong>
          </div>
          <div className="flex items-center gap-2">
            {lead.phone && onAddToDialer && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  onAddToDialer(lead);
                  onClose();
                }}
                icon={<PhoneCall className="h-3.5 w-3.5 text-[#2FBF8F]" />}
              >
                Dial Queue
              </Button>
            )}
            {lead.email && onSendEmail && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  onSendEmail(lead);
                  onClose();
                }}
                icon={<Send className="h-3.5 w-3.5" />}
              >
                Send Pitch
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
