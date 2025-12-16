export type SentimentLevel = 'positive' | 'neutral' | 'warning' | 'negative' | 'escalated';
export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent';
export type EscalationStatus = 'none' | 'pending' | 'escalated' | 'resolved';

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

export interface EscalationInfo {
  status: EscalationStatus;
  escalatedAt?: Date;
  escalatedBy?: string;
  managerAssigned?: string;
  reason?: string;
  resolvedAt?: Date;
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
  priority: PriorityLevel;
  escalation: EscalationInfo;
}

export interface CustomerInfo {
  name: string;
  email: string;
  company?: string;
  previousTickets: number;
  memberSince: string;
  tags: string[];
}

export interface ManagerNotification {
  id: string;
  conversationId: string;
  customerName: string;
  reason: string;
  priority: PriorityLevel;
  timestamp: Date;
  isRead: boolean;
}
