import { Conversation, CustomerInfo, EscalationInfo, ManagerNotification } from '@/types/chat';

const defaultEscalation: EscalationInfo = {
  status: 'none',
};

export const mockConversations: Conversation[] = [
  // Conversation 1: Resolved Storage Issue - Full Journey
  {
    id: '1',
    customerName: 'Sarah Chen',
    messages: [
      {
        id: '1-1',
        content: "Hi, I'm having trouble with my storage array. It's been acting up for the past 2 days.",
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        sentiment: 'neutral',
      },
      {
        id: '1-2',
        content: "Hello Sarah! I'm happy to help you with your storage array. Can you describe what symptoms you're seeing?",
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 44),
      },
      {
        id: '1-3',
        content: "I've contacted support 3 times already and nothing's been fixed! This is really frustrating. We're losing productivity every hour.",
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 42),
        sentiment: 'negative',
      },
      {
        id: '1-4',
        content: "I completely understand how frustrating this must be, especially after reaching out multiple times. I sincerely apologize for the experience you've had. I'll take personal ownership of this issue and work with you until it's fully resolved. You have my word.",
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 40),
      },
      {
        id: '1-5',
        content: "Thank you, I appreciate that. The array keeps showing read errors on drives 3 and 7. Error codes are STOR-4421 and STOR-4423.",
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 38),
        sentiment: 'warning',
      },
      {
        id: '1-6',
        content: "Thank you for those error codes - that's really helpful. I've checked our diagnostics and I can see those drives are showing intermittent failures. I'm going to do two things right now: 1) Initiate an automatic failover to your backup drives, and 2) Arrange for replacement drives to be shipped overnight to your location. Does that work for you?",
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 35),
      },
      {
        id: '1-7',
        content: "Yes, that sounds perfect! Will there be any downtime during the failover?",
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 33),
        sentiment: 'neutral',
      },
      {
        id: '1-8',
        content: "Great question! The failover is seamless - you won't experience any downtime. I've just initiated it and can confirm it completed successfully. Your array is now running on healthy drives. The replacement drives will arrive tomorrow by 10 AM, and our field technician will contact you to schedule installation.",
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
      },
      {
        id: '1-9',
        content: "Wow, that was fast! I can already see the errors have cleared. Thank you so much for actually solving this!",
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 28),
        sentiment: 'positive',
      },
      {
        id: '1-10',
        content: "I'm so glad we could resolve this for you, Sarah! I've also added a note to your account so if you ever need to reach out again, any agent will know about this history. As a token of our appreciation for your patience, I've applied a 15% credit to your next invoice. Is there anything else I can help you with today?",
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
      },
      {
        id: '1-11',
        content: "No, that's everything! You've been absolutely wonderful. Thank you for turning this around. 😊",
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 23),
        sentiment: 'positive',
      },
      {
        id: '1-12',
        content: "It was my pleasure, Sarah! Thank you for your patience and for being a valued TechCorp customer. Don't hesitate to reach out if you need anything. Have a wonderful rest of your day! 🌟",
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 22),
      },
    ],
    currentSentiment: 'positive',
    sentimentHistory: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 45), level: 'neutral' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 42), level: 'negative' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 38), level: 'warning' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 33), level: 'neutral' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 28), level: 'positive' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 23), level: 'positive' },
    ],
    buddySuggestions: [
      {
        id: 'bs-1',
        type: 'celebration',
        message: '🎉 Amazing turnaround! Sentiment went from negative to positive. Great empathy and problem-solving!',
        timestamp: new Date(Date.now() - 1000 * 60 * 23),
      },
    ],
    lastMessage: "You've been absolutely wonderful. Thank you!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 23),
    isActive: false,
    unreadCount: 0,
    priority: 'low',
    escalation: { status: 'resolved', resolvedAt: new Date(Date.now() - 1000 * 60 * 22) },
  },

  // Conversation 2: Quick Billing Question - Resolved
  {
    id: '2',
    customerName: 'Marcus Johnson',
    messages: [
      {
        id: '2-1',
        content: 'Quick question - how do I upgrade my plan? I want to move from Starter to Pro.',
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 20),
        sentiment: 'neutral',
      },
      {
        id: '2-2',
        content: "Hi Marcus! Great to hear you're ready to upgrade! You can do this in two ways: 1) Go to Settings → Billing → Change Plan, or 2) I can upgrade it for you right here if you'd like. The Pro plan includes unlimited projects, priority support, and advanced analytics. Which would you prefer?",
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 18),
      },
      {
        id: '2-3',
        content: "Oh nice, can you just do it for me? Saves me the clicks 😄",
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 16),
        sentiment: 'positive',
      },
      {
        id: '2-4',
        content: "Absolutely! I've just upgraded your account to Pro. Your new features are active immediately! Your next billing cycle will reflect the Pro pricing ($49/month). I've also sent a confirmation email with all the details. Is there anything else you'd like to know about your new Pro features?",
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 14),
      },
      {
        id: '2-5',
        content: "That was so easy! Thanks for the quick help. I'll explore the new features now.",
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 12),
        sentiment: 'positive',
      },
      {
        id: '2-6',
        content: "You're very welcome, Marcus! Pro tip: Check out the new Analytics dashboard - it's a customer favorite. If you have any questions as you explore, we're here 24/7. Enjoy your upgraded experience! 🚀",
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
      },
    ],
    currentSentiment: 'positive',
    sentimentHistory: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 20), level: 'neutral' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 16), level: 'positive' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 12), level: 'positive' },
    ],
    buddySuggestions: [
      {
        id: 'bs-4',
        type: 'celebration',
        message: '✨ Quick and efficient! Customer upgraded and left happy in under 10 minutes.',
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
      },
    ],
    lastMessage: 'That was so easy! Thanks for the quick help.',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 12),
    isActive: false,
    unreadCount: 0,
    priority: 'low',
    escalation: defaultEscalation,
  },

  // Conversation 3: Happy Customer Feedback - Complete
  {
    id: '3',
    customerName: 'Emily Rodriguez',
    messages: [
      {
        id: '3-1',
        content: 'Your product is amazing! Just wanted to say thanks - it saved our team hours this week 💜',
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 35),
        sentiment: 'positive',
      },
      {
        id: '3-2',
        content: "That's so wonderful to hear, Emily! Thank you for taking the time to share this with us - messages like yours truly make our day. We'd love to hear more! What specific feature has been most helpful for your team?",
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 33),
      },
      {
        id: '3-3',
        content: "The automated workflow builder is incredible! We set up a client onboarding process that used to take 2 hours - now it's 15 minutes. My team is thrilled.",
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        sentiment: 'positive',
      },
      {
        id: '3-4',
        content: "Wow, from 2 hours to 15 minutes - that's an incredible improvement! I'm sharing this with our product team because they'll be so happy to hear it. Would you be open to being featured in a customer spotlight on our blog? We'd love to share your success story!",
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 28),
      },
      {
        id: '3-5',
        content: "I'd love that! Feel free to reach out to me via email. You guys are doing great work. Keep it up! 😊",
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
        sentiment: 'positive',
      },
      {
        id: '3-6',
        content: "Thank you so much, Emily! I've flagged your account for our marketing team to follow up about the spotlight. Thank you for being such an amazing customer and advocate. We're lucky to have Creative Co in our community! Have a fantastic rest of your day! 🌟✨",
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 23),
      },
    ],
    currentSentiment: 'positive',
    sentimentHistory: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 35), level: 'positive' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 30), level: 'positive' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 25), level: 'positive' },
    ],
    buddySuggestions: [
      {
        id: 'bs-5',
        type: 'celebration',
        message: '🎉 What a fantastic interaction! Customer is now a potential brand advocate.',
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
      },
    ],
    lastMessage: "You guys are doing great work. Keep it up! 😊",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 25),
    isActive: false,
    unreadCount: 0,
    priority: 'low',
    escalation: defaultEscalation,
  },

  // Conversation 4: Critical Escalation - Resolved with Manager
  {
    id: '4',
    customerName: 'David Kim',
    messages: [
      {
        id: '4-1',
        content: 'THIS IS UNACCEPTABLE. I demand to speak to a manager RIGHT NOW. Our entire system has been down for 6 hours!',
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        sentiment: 'escalated',
      },
      {
        id: '4-2',
        content: "David, I hear you and I understand the severity of this situation. A 6-hour outage for an enterprise account is absolutely critical. I'm escalating this immediately to our Priority Response Team and my manager. While I get them on the line, can you confirm which services are affected so we can start diagnosis right away?",
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 58),
      },
      {
        id: '4-3',
        content: "ALL of them! Database, API gateway, authentication - everything. We have clients screaming at us. This is costing us thousands per hour.",
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 56),
        sentiment: 'escalated',
      },
      {
        id: '4-4',
        content: "I completely understand the business impact, David. I've just pulled in our Senior Infrastructure Lead and my manager, Jennifer. We've identified the issue - there was a routing failure at our primary data center affecting your region. We're implementing an emergency failover right now. ETA to restoration is 10 minutes. I'm staying on this with you until everything is confirmed working.",
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 52),
      },
      {
        id: '4-5',
        content: "10 minutes? Okay... please keep me updated. This better work.",
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 50),
        sentiment: 'negative',
      },
      {
        id: '4-6',
        content: "Absolutely, David. I'm monitoring the failover in real-time. Update: Database connectivity is restored (3 minutes ahead of schedule). API gateway is coming back online now. Can you try accessing your services?",
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
      },
      {
        id: '4-7',
        content: "Hold on, let me check... Yes! It's working! The dashboard is loading. Let me verify the API endpoints...",
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 43),
        sentiment: 'warning',
      },
      {
        id: '4-8',
        content: "Take your time. I'm right here.",
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 42),
      },
      {
        id: '4-9',
        content: "Okay, everything is confirmed working. Authentication, database queries, API calls - all good. Thank you for the fast response once you got involved.",
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 38),
        sentiment: 'neutral',
      },
      {
        id: '4-10',
        content: "I'm so relieved to hear that, David. I want to sincerely apologize for the 6-hour outage. That's not acceptable for any customer, especially Enterprise Networks. Here's what we're doing: 1) Full post-mortem within 48 hours sent to you, 2) A credit of $5,000 applied to your account, 3) Your account is being assigned a dedicated Technical Account Manager for priority support going forward. My manager Jennifer will call you personally tomorrow to discuss further.",
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 35),
      },
      {
        id: '4-11',
        content: "I appreciate the accountability and the concrete steps. The dedicated TAM is a good move. Let's schedule that call with Jennifer for 10 AM tomorrow.",
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 32),
        sentiment: 'neutral',
      },
      {
        id: '4-12',
        content: "Done! I've scheduled the call with Jennifer for tomorrow at 10 AM and sent a calendar invite to your email. Again, I'm deeply sorry for the disruption this caused. Thank you for your patience as we resolved this. Is there anything else you need from me right now?",
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
      },
      {
        id: '4-13',
        content: "No, that's all for now. Thanks for stepping up when it mattered.",
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 28),
        sentiment: 'positive',
      },
      {
        id: '4-14',
        content: "Thank you, David. We'll earn back your full trust. Take care, and we'll speak tomorrow. 🙏",
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 27),
      },
    ],
    currentSentiment: 'positive',
    sentimentHistory: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 60), level: 'escalated' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 56), level: 'escalated' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 50), level: 'negative' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 43), level: 'warning' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 38), level: 'neutral' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 32), level: 'neutral' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 28), level: 'positive' },
    ],
    buddySuggestions: [
      {
        id: 'bs-6',
        type: 'celebration',
        message: '🏆 Masterful de-escalation! Turned a crisis into an opportunity to strengthen the relationship.',
        timestamp: new Date(Date.now() - 1000 * 60 * 28),
      },
    ],
    lastMessage: "Thanks for stepping up when it mattered.",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 28),
    isActive: false,
    unreadCount: 0,
    priority: 'low',
    escalation: { 
      status: 'resolved', 
      reason: 'Critical system outage - 6 hours', 
      escalatedAt: new Date(Date.now() - 1000 * 60 * 58),
      escalatedBy: 'Agent',
      managerAssigned: 'Jennifer',
      resolvedAt: new Date(Date.now() - 1000 * 60 * 27)
    },
  },

  // Conversation 5: New - Product Return Request (Active)
  {
    id: '5',
    customerName: 'Amanda Foster',
    messages: [
      {
        id: '5-1',
        content: "Hi, I received my order yesterday but unfortunately the item doesn't fit properly. I'd like to return it for a refund please.",
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 8),
        sentiment: 'neutral',
      },
      {
        id: '5-2',
        content: "Hi Amanda! I'm sorry to hear the item didn't fit as expected. I'd be happy to help you with the return. I can see your order #ORD-78234 in our system. Would you prefer a full refund or would you like to exchange for a different size?",
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 6),
      },
      {
        id: '5-3',
        content: "An exchange would be great actually! I ordered Medium but I think I need a Large.",
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 4),
        sentiment: 'positive',
      },
    ],
    currentSentiment: 'positive',
    sentimentHistory: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 8), level: 'neutral' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 4), level: 'positive' },
    ],
    buddySuggestions: [
      {
        id: 'bs-10',
        type: 'quick-reply',
        message: '📦 Exchange request - offer seamless process:',
        quickReplies: [
          "Perfect! I've created the exchange for a Large. I'm sending a prepaid return label to your email right now.",
          "Great choice! The Large is in stock and I can ship it today. You'll have it within 2-3 business days.",
          "I'll upgrade your shipping to express at no extra cost since we want to get the right size to you quickly!",
        ],
        timestamp: new Date(),
      },
    ],
    lastMessage: "I ordered Medium but I think I need a Large.",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 4),
    isActive: true,
    unreadCount: 1,
    priority: 'medium',
    escalation: defaultEscalation,
  },

  // Conversation 6: Technical Integration Help (Active)
  {
    id: '6',
    customerName: 'Robert Chen',
    messages: [
      {
        id: '6-1',
        content: "I'm trying to integrate your API with our system but getting 401 errors consistently. I've double-checked my API key.",
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
        sentiment: 'warning',
      },
    ],
    currentSentiment: 'warning',
    sentimentHistory: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 3), level: 'warning' },
    ],
    buddySuggestions: [
      {
        id: 'bs-11',
        type: 'quick-reply',
        message: '🔧 Technical issue - gather diagnostic info:',
        quickReplies: [
          "Hi Robert! 401 errors usually indicate authentication issues. Can you confirm you're using the API key from your dashboard (not the test key)?",
          "Let me check your API key status on our end. Can you share the first 8 characters of your key so I can look it up?",
          "Are you including the API key in the Authorization header as 'Bearer YOUR_KEY'? Sometimes the format causes issues.",
        ],
        timestamp: new Date(),
      },
    ],
    lastMessage: "Getting 401 errors consistently...",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 3),
    isActive: true,
    unreadCount: 1,
    priority: 'high',
    escalation: defaultEscalation,
  },
];

export const mockNotifications: ManagerNotification[] = [
  {
    id: 'notif-1',
    conversationId: '4',
    customerName: 'David Kim',
    reason: 'Critical outage resolved - Customer received $5k credit and dedicated TAM assignment',
    priority: 'high',
    timestamp: new Date(Date.now() - 1000 * 60 * 27),
    isRead: true,
  },
  {
    id: 'notif-2',
    conversationId: '1',
    customerName: 'Sarah Chen',
    reason: 'Repeat escalation resolved - Storage array issue fixed, replacement drives shipped',
    priority: 'medium',
    timestamp: new Date(Date.now() - 1000 * 60 * 22),
    isRead: true,
  },
];

export const mockCustomerInfo: Record<string, CustomerInfo> = {
  '1': {
    name: 'Sarah Chen',
    email: 'sarah.chen@techcorp.com',
    company: 'TechCorp Industries',
    previousTickets: 3,
    memberSince: 'Mar 2023',
    tags: ['Enterprise', 'Storage', 'Priority', 'Resolved'],
  },
  '2': {
    name: 'Marcus Johnson',
    email: 'marcus.j@startup.io',
    company: 'Startup.io',
    previousTickets: 1,
    memberSince: 'Jan 2024',
    tags: ['Pro Plan', 'Upgraded'],
  },
  '3': {
    name: 'Emily Rodriguez',
    email: 'emily@creative.co',
    company: 'Creative Co',
    previousTickets: 1,
    memberSince: 'Sep 2023',
    tags: ['Pro Plan', 'Happy Customer', 'Brand Advocate'],
  },
  '4': {
    name: 'David Kim',
    email: 'david.kim@enterprise.net',
    company: 'Enterprise Networks',
    previousTickets: 6,
    memberSince: 'Jun 2022',
    tags: ['Enterprise', 'VIP', 'Dedicated TAM'],
  },
  '5': {
    name: 'Amanda Foster',
    email: 'amanda.foster@gmail.com',
    company: 'Personal',
    previousTickets: 0,
    memberSince: 'Dec 2024',
    tags: ['New Customer', 'Exchange Request'],
  },
  '6': {
    name: 'Robert Chen',
    email: 'robert.chen@devstudio.io',
    company: 'DevStudio',
    previousTickets: 2,
    memberSince: 'Oct 2024',
    tags: ['Developer', 'API User', 'Technical'],
  },
};
