// Types for WA Dispatcher App

export interface Group {
  id: string;
  name: string;
  participantsCount: number;
  icon?: string;
  folderId?: string;
}

export interface Folder {
  id: string;
  name: string;
  groups: Group[];
}

export interface Message {
  id: string;
  text: string;
  type: 'text' | 'image' | 'video' | 'document';
  mediaUrl?: string;
  createdAt: Date;
}

export interface Broadcast {
  id: string;
  name: string;
  message: Message;
  groups: Group[];
  status: 'draft' | 'sending' | 'completed' | 'paused';
  totalRecipients: number;
  sentCount: number;
  failedCount: number;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface BroadcastHistory {
  id: string;
  broadcastId: string;
  broadcastName: string;
  status: 'completed' | 'failed' | 'pending';
  recipientCount: number;
  sentCount: number;
  failedCount: number;
  createdAt: Date;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  language: 'en' | 'ru';
  notifications: boolean;
  autoSave: boolean;
}

export interface WhatsAppConnection {
  isConnected: boolean;
  phoneNumber?: string;
  connectedAt?: Date;
  qrCode?: string;
}
