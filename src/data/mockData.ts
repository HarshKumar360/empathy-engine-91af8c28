import { Conversation, CustomerInfo } from '@/types/chat';

export const mockConversations: Conversation[] = [
  {
    id: '1',
    customerName: 'Sarah Chen',
    messages: [
      {
        id: '1-1',
        content: "Hi, I'm having trouble with my storage array.",
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        sentiment: 'neutral',
      },
      {
        id: '1-2',
        content: "Hello Sarah! I'm happy to help. Can you tell me what's happening?",
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 14),
      },
      {
        id: '1-3',
        content: "I've contacted support 3 times already and nothing's been fixed! This is really frustrating.",
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 12),
        sentiment: 'negative',
      },
      {
        id: '1-4',
        content: "I completely understand how frustrating this must be, especially after reaching out multiple times. I'll take ownership of this and work with you until it's resolved.",
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
      },
      {
        id: '1-5',
        content: "Thank you, I appreciate that. The array keeps showing read errors on drives 3 and 7.",
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 8),
        sentiment: 'warning',
      },
    ],
    currentSentiment: 'warning',
    sentimentHistory: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 15), level: 'neutral' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 12), level: 'negative' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 8), level: 'warning' },
    ],
    buddySuggestions: [
      {
        id: 'bs-1',
        type: 'alert',
        message: '😟 Customer has escalated before. Handle with extra care.',
        timestamp: new Date(Date.now() - 1000 * 60 * 12),
      },
      {
        id: 'bs-2',
        type: 'celebration',
        message: '✨ Great job! Sentiment is improving after your empathetic response.',
        timestamp: new Date(Date.now() - 1000 * 60 * 8),
      },
      {
        id: 'bs-3',
        type: 'quick-reply',
        message: "Let's get technical details to resolve this:",
        quickReplies: [
          "Could you share the exact error codes you're seeing?",
          "I'll check the diagnostic logs on our end right now.",
          "Let me escalate this to our storage specialists immediately.",
        ],
        timestamp: new Date(),
      },
    ],
    lastMessage: 'The array keeps showing read errors...',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 8),
    isActive: true,
    unreadCount: 0,
  },
  {
    id: '2',
    customerName: 'Marcus Johnson',
    messages: [
      {
        id: '2-1',
        content: 'Quick question - how do I upgrade my plan?',
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        sentiment: 'neutral',
      },
    ],
    currentSentiment: 'neutral',
    sentimentHistory: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 5), level: 'neutral' },
    ],
    buddySuggestions: [
      {
        id: 'bs-4',
        type: 'quick-reply',
        message: '💡 Simple billing question detected:',
        quickReplies: [
          "Great question! You can upgrade directly from Settings → Billing.",
          "I'd be happy to walk you through the upgrade process!",
          "Would you like me to show you the available plan options?",
        ],
        timestamp: new Date(),
      },
    ],
    lastMessage: 'Quick question - how do I upgrade my plan?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
    isActive: true,
    unreadCount: 1,
  },
  {
    id: '3',
    customerName: 'Emily Rodriguez',
    messages: [
      {
        id: '3-1',
        content: 'Your product is amazing! Just wanted to say thanks 💜',
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        sentiment: 'positive',
      },
      {
        id: '3-2',
        content: "That's so wonderful to hear, Emily! Thank you for taking the time to share this with us. Is there anything else I can help you with today?",
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 28),
      },
      {
        id: '3-3',
        content: "Nope, just wanted to spread some positivity! Have a great day! 😊",
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
        sentiment: 'positive',
      },
    ],
    currentSentiment: 'positive',
    sentimentHistory: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 30), level: 'positive' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 25), level: 'positive' },
    ],
    buddySuggestions: [
      {
        id: 'bs-5',
        type: 'celebration',
        message: '🎉 What a great interaction! This customer is delighted.',
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
      },
    ],
    lastMessage: 'Nope, just wanted to spread some positivity!',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 25),
    isActive: false,
    unreadCount: 0,
  },
  {
    id: '4',
    customerName: 'David Kim',
    messages: [
      {
        id: '4-1',
        content: 'THIS IS UNACCEPTABLE. I demand to speak to a manager RIGHT NOW.',
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 2),
        sentiment: 'escalated',
      },
    ],
    currentSentiment: 'escalated',
    sentimentHistory: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 2), level: 'escalated' },
    ],
    buddySuggestions: [
      {
        id: 'bs-6',
        type: 'alert',
        message: '🚨 Escalation detected. Customer needs immediate attention and de-escalation.',
        timestamp: new Date(Date.now() - 1000 * 60 * 2),
      },
      {
        id: 'bs-7',
        type: 'empathy',
        message: 'Try acknowledging their frustration first:',
        quickReplies: [
          "I hear you, David, and I want to help make this right. I'm fully focused on your issue right now.",
          "I understand this is urgent. Let me personally ensure we resolve this immediately.",
          "Your frustration is completely valid. I'm here to help - what happened?",
        ],
        timestamp: new Date(),
      },
    ],
    lastMessage: 'THIS IS UNACCEPTABLE...',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 2),
    isActive: true,
    unreadCount: 1,
  },
];

export const mockCustomerInfo: Record<string, CustomerInfo> = {
  '1': {
    name: 'Sarah Chen',
    email: 'sarah.chen@techcorp.com',
    company: 'TechCorp Industries',
    previousTickets: 3,
    memberSince: 'Mar 2023',
    tags: ['Enterprise', 'Storage', 'Priority'],
  },
  '2': {
    name: 'Marcus Johnson',
    email: 'marcus.j@startup.io',
    company: 'Startup.io',
    previousTickets: 0,
    memberSince: 'Jan 2024',
    tags: ['Startup', 'New Customer'],
  },
  '3': {
    name: 'Emily Rodriguez',
    email: 'emily@creative.co',
    company: 'Creative Co',
    previousTickets: 1,
    memberSince: 'Sep 2023',
    tags: ['Pro Plan', 'Happy Customer'],
  },
  '4': {
    name: 'David Kim',
    email: 'david.kim@enterprise.net',
    company: 'Enterprise Networks',
    previousTickets: 5,
    memberSince: 'Jun 2022',
    tags: ['Enterprise', 'Escalation History', 'VIP'],
  },
};
