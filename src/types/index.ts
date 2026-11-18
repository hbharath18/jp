export type ProductCategory = 
  | 'Singing Bowls' 
  | 'Home Decor' 
  | 'Brass Lamps' 
  | 'Handcrafted Accents';

export type BuyerPersona = 
  | 'Importers' 
  | 'Wholesalers' 
  | 'Showrooms' 
  | 'Wellness Stores' 
  | 'Retailers' 
  | 'Distributors';

export type LeadSource = 
  | 'Google Maps Scraper' 
  | 'LinkedIn Buyer Finder' 
  | 'ImportYeti Trade' 
  | 'Faire / Thomasnet' 
  | 'CSV Upload';

export type EmailValidationStatus = 
  | 'Valid' 
  | 'Risky' 
  | 'Invalid' 
  | 'Pending';

export type AIClassificationStatus = 
  | 'B2B Business Buyer' 
  | 'Individual / Retail Consumer' 
  | 'Pending';

export type OutreachStatus = 
  | 'Not Contacted' 
  | 'Queued' 
  | 'Sent' 
  | 'Delivered' 
  | 'Opened' 
  | 'Replied';

export type CallOutcome = 
  | 'Pending'
  | 'Interested - Requested Email' 
  | 'Voicemail Left' 
  | 'Follow-up Scheduled' 
  | 'Not Interested' 
  | 'Gatekeeper Blocked';

export interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  title: string;
  source: LeadSource;
  category: ProductCategory;
  persona: BuyerPersona;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  emailStatus: EmailValidationStatus;
  aiClassification: AIClassificationStatus;
  b2bConfidence: number; // 0-100
  aiReasoning: string;
  outreachStatus: OutreachStatus;
  callStatus: CallOutcome;
  isDuplicate: boolean;
  duplicateReason?: string;
  shipmentsCount?: number;
  lastShipmentDate?: string;
  estimatedAnnualVolume?: string;
  notes?: string;
  dateAdded: string;
  lastContactedAt?: string;
  selected?: boolean;
}

export interface OutreachCampaign {
  id: string;
  name: string;
  sentCount: number;
  totalSelected: number;
  subject: string;
  body: string;
  pdfAttachment: string;
  throttleIntervalSeconds: number;
  spamScore: number;
  status: 'idle' | 'running' | 'paused' | 'completed';
  createdAt: string;
}

export interface ColdCallLog {
  id: string;
  leadId: string;
  companyName: string;
  contactName: string;
  phone: string;
  timestamp: string;
  outcome: CallOutcome;
  notes: string;
  convertedEmail?: string;
}

export interface SentEmailLog {
  id: string;
  leadId: string;
  recipientEmail: string;
  recipientName: string;
  companyName: string;
  subject: string;
  timestamp: string;
  pdfAttached: boolean;
  pdfName: string;
  deliveryStatus: 'Sent' | 'Delivered' | 'Opened' | 'Replied';
  openCount: number;
}
