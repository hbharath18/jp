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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative flex flex-col w-full max-w-3xl max-h-[92vh] rounded-card bg-[#0E0E12] border border-white/15 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-8 border-b border-white/[0.08] bg-[#07070A]/80">
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B]">
              <Building2 className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-[22px] font-bold text-[#F5F5F7] tracking-tight">
                  {lead.companyName}
                </h3>
                <Badge
                  variant={lead.aiClassification === 'B2B Business Buyer' ? 'indigo' : 'neutral'}
                  size="md"
                >
                  {lead.aiClassification}
                </Badge>
                {lead.isDuplicate && (
                  <Badge variant="danger" size="md">
                    Duplicate Flagged
                  </Badge>
                )}
              </div>
              <p className="text-[15px] text-[#A1A1AA] mt-1.5 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#6B6B75]" />
                <span>{lead.city}, {lead.state}, {lead.country}</span>
                <span>•</span>
                <span className="text-[#F59E0B] font-medium">{lead.category}</span>
                <span>•</span>
                <span className="text-[#6B6B75]">Source: {lead.source}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#A1A1AA] hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#07070A]">
          
          {/* Key Decision Maker & Contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#0E0E12] border border-white/10 space-y-3">
              <span className="text-[13px] font-mono uppercase tracking-eyebrow text-[#6B6B75] font-semibold">
                Decision Maker
              </span>
              <div className="flex items-center gap-3">
                <UserCheck className="h-5 w-5 text-[#F59E0B]" />
                <div>
                  <p className="text-[16px] font-bold text-[#F5F5F7]">{lead.contactName}</p>
                  <p className="text-[14px] text-[#A1A1AA]">{lead.title}</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E0E12] border border-white/10 space-y-3">
              <span className="text-[13px] font-mono uppercase tracking-eyebrow text-[#6B6B75] font-semibold">
                Contact Channels
              </span>
              <div className="space-y-2 text-[14px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#F5F5F7]">
                    <Mail className="h-4 w-4 text-[#6366F1]" />
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
                  <div className="flex items-center gap-2 text-[#F5F5F7]">
                    <Phone className="h-4 w-4 text-[#34D399]" />
                    <span className="font-mono">{lead.phone}</span>
                  </div>
                  <span className="text-[13px] text-[#6B6B75] font-mono">US Direct Dial</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gemini AI Intelligence Dossier */}
          <div className="p-6 rounded-2xl bg-[#6366F1]/10 border border-[#6366F1]/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-5 w-5 text-[#A5B4FC]" />
                <h4 className="text-[14px] font-bold text-[#F5F5F7] uppercase tracking-eyebrow font-mono">
                  Gemini 3.8 AI Buyer Classification & Intelligence
                </h4>
              </div>
              <span className="px-3.5 py-1 rounded-full bg-[#6366F1]/20 border border-[#6366F1]/40 text-[14px] font-mono font-bold text-[#A5B4FC]">
                {lead.b2bConfidence}% B2B Fit
              </span>
            </div>
            <p className="text-[15px] text-[#F5F5F7] leading-relaxed">
              {lead.aiReasoning}
            </p>
          </div>

          {/* Trade & Import Intelligence */}
          <div className="p-6 rounded-2xl bg-[#0E0E12] border border-white/10 space-y-4">
            <div className="flex items-center gap-2.5">
              <Ship className="h-5 w-5 text-[#F59E0B]" />
              <h4 className="text-[14px] font-bold text-[#F5F5F7] uppercase tracking-eyebrow font-mono">
                ImportYeti & US Customs Intelligence
              </h4>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-[#07070A]">
                <p className="text-[12px] text-[#6B6B75] uppercase font-mono">US CBP Shipments</p>
                <p className="text-[18px] font-bold text-[#F5F5F7] font-mono mt-1">{lead.shipmentsCount || 0} Bills of Lading</p>
              </div>
              <div className="p-4 rounded-xl bg-[#07070A]">
                <p className="text-[12px] text-[#6B6B75] uppercase font-mono">Est. Annual Sourcing</p>
                <p className="text-[18px] font-bold text-[#34D399] font-mono mt-1">{lead.estimatedAnnualVolume || 'N/A'}</p>
              </div>
              <div className="p-4 rounded-xl bg-[#07070A]">
                <p className="text-[12px] text-[#6B6B75] uppercase font-mono">Last Import Entry</p>
                <p className="text-[18px] font-bold text-[#A1A1AA] font-mono mt-1">{lead.lastShipmentDate || 'Recent'}</p>
              </div>
            </div>
          </div>

          {/* Notes & Website */}
          <div className="flex items-center justify-between text-[14px] text-[#A1A1AA] px-1">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-[#6B6B75]" />
              <a 
                href={lead.website} 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#F59E0B] hover:underline font-mono"
              >
                {lead.website}
              </a>
            </div>
            <span>Discovered: <strong className="font-mono text-[#F5F5F7]">{lead.dateAdded}</strong></span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-white/[0.08] bg-[#07070A]">
          <div className="text-[14px] text-[#A1A1AA]">
            Current Pipeline Status: <strong className="text-[#F5F5F7]">{lead.outreachStatus}</strong>
          </div>
          <div className="flex items-center gap-3">
            {lead.phone && onAddToDialer && (
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  onAddToDialer(lead);
                  onClose();
                }}
                icon={<PhoneCall className="h-4 w-4 text-[#34D399]" />}
              >
                Call in Queue
              </Button>
            )}
            {lead.email && onSendEmail && (
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  onSendEmail(lead);
                  onClose();
                }}
                icon={<Send className="h-4 w-4" />}
              >
                Compose Gmail Pitch
              </Button>
            )}
            <Button
              variant="secondary"
              size="md"
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
