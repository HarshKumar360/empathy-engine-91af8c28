export type SentimentLevel = 'positive' | 'neutral' | 'warning' | 'negative' | 'escalated';

export interface Message {
  id: string;
  content: string;
  sender: 'agent' | 'customer';
  timestamp: Date;
  sentiment?: SentimentLevel;
}

export interface BuddySuggestion {
  id: string;
  type: 'empathy' | 'quick-reply' | 'alert' | 'celebration';
  message: string;
  quickReplies?: string[];
  timestamp: Date;
}

export interface Conversation {
  id: string;
  customerName: string;
  customerAvatar?: string;
  messages: Message[];
  currentSentiment: SentimentLevel;
  sentimentHistory: { timestamp: Date; level: SentimentLevel }[];
  buddySuggestions: BuddySuggestion[];
  lastMessage: string;
  lastMessageTime: Date;
  isActive: boolean;
  unreadCount: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  company?: string;
  previousTickets: number;
  memberSince: string;
  tags: string[];
}
