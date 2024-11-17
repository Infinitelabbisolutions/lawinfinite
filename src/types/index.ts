export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  attachments?: FileAttachment[];
}

export interface FileAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  pages?: number;
  progress?: number;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  category: LegalCategory;
  status: 'active' | 'completed' | 'archived';
  attachments?: FileAttachment[];
  processDetails?: ProcessDetails;
}

export interface ProcessDetails {
  area: string;
  subarea?: string;
  parties: {
    plaintiff?: string;
    defendant?: string;
    others?: string[];
  };
  facts: string[];
  documents: string[];
  urgency: 'low' | 'medium' | 'high';
  deadline?: Date;
  value?: number;
  jurisdiction?: string;
  legalBasis?: string[];
}

export interface GeneratedProcess {
  id: string;
  title: string;
  chatId: string;
  createdAt: Date;
  fileName: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  type: LegalCategory;
  pages: number;
  downloadUrl?: string;
  progress?: number;
  error?: string;
  formats: ('pdf' | 'docx')[];
  details: ProcessDetails;
}

export type LegalCategory = 
  | 'civil'
  | 'criminal'
  | 'labor'
  | 'administrative'
  | 'family'
  | 'consumer'
  | 'real-estate'
  | 'corporate'
  | 'environmental'
  | 'tax'
  | 'digital'
  | 'constitutional';

export interface ProcessConfig {
  title: string;
  description: string;
  plaintiff: string;
  defendant: string;
  processType: string;
  urgency: string;
  aiModel: 'fast' | 'balanced' | 'thorough';
  maxPages: number;
  format: 'pdf' | 'docx' | 'both';
  details: ProcessDetails;
}