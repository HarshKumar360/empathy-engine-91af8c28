import { SentimentLevel } from '@/types/chat';

export interface CannedResponse {
  id: string;
  title: string;
  content: string;
  category: CannedCategory;
  sentiment: SentimentLevel[];
  tags: string[];
}

export type CannedCategory = 
  | 'greeting'
  | 'apology'
  | 'acknowledgment'
  | 'solution'
  | 'follow-up'
  | 'closing'
  | 'escalation';

export const categoryConfig: Record<CannedCategory, { label: string; color: string }> = {
  greeting: { label: 'Greeting', color: 'bg-primary/10 text-primary' },
  apology: { label: 'Apology', color: 'bg-sentiment-negative/10 text-sentiment-negative' },
  acknowledgment: { label: 'Acknowledgment', color: 'bg-sentiment-neutral/10 text-sentiment-neutral' },
  solution: { label: 'Solution', color: 'bg-sentiment-positive/10 text-sentiment-positive' },
  'follow-up': { label: 'Follow-up', color: 'bg-buddy/10 text-buddy' },
  closing: { label: 'Closing', color: 'bg-muted-foreground/10 text-muted-foreground' },
  escalation: { label: 'Escalation', color: 'bg-sentiment-warning/10 text-sentiment-warning' },
};

export const cannedResponses: CannedResponse[] = [
  // Greetings
  {
    id: 'greet-1',
    title: 'Warm Welcome',
    content: "Hi there! Thank you for reaching out to us. I'm here to help you today. How can I assist you?",
    category: 'greeting',
    sentiment: ['neutral', 'positive'],
    tags: ['welcome', 'intro', 'start'],
  },
  {
    id: 'greet-2',
    title: 'Returning Customer',
    content: "Welcome back! It's great to hear from you again. What can I help you with today?",
    category: 'greeting',
    sentiment: ['neutral', 'positive'],
    tags: ['returning', 'loyal', 'welcome'],
  },
  {
    id: 'greet-3',
    title: 'Quick Response Promise',
    content: "Hi! Thank you for contacting us. I'll do my best to resolve this for you as quickly as possible.",
    category: 'greeting',
    sentiment: ['neutral', 'warning', 'negative'],
    tags: ['quick', 'promise', 'urgent'],
  },

  // Apologies
  {
    id: 'apology-1',
    title: 'General Apology',
    content: "I'm truly sorry for the inconvenience this has caused you. I completely understand your frustration, and I want to make this right.",
    category: 'apology',
    sentiment: ['negative', 'warning'],
    tags: ['sorry', 'inconvenience', 'frustration'],
  },
  {
    id: 'apology-2',
    title: 'Delay Apology',
    content: "I sincerely apologize for the delay in getting back to you. Your time is valuable, and I appreciate your patience.",
    category: 'apology',
    sentiment: ['negative', 'warning', 'neutral'],
    tags: ['delay', 'wait', 'patience'],
  },
  {
    id: 'apology-3',
    title: 'Service Issue Apology',
    content: "I'm so sorry you've experienced this issue with our service. This isn't the experience we want for our customers, and I'm committed to resolving this.",
    category: 'apology',
    sentiment: ['negative', 'warning'],
    tags: ['service', 'issue', 'problem'],
  },
  {
    id: 'apology-4',
    title: 'Product Issue Apology',
    content: "I apologize for the trouble you're having with your product. I can imagine how disappointing this must be. Let me help you get this sorted out.",
    category: 'apology',
    sentiment: ['negative', 'warning'],
    tags: ['product', 'defect', 'quality'],
  },

  // Acknowledgments
  {
    id: 'ack-1',
    title: 'Understanding Concern',
    content: "I completely understand your concern. Let me look into this right away and find the best solution for you.",
    category: 'acknowledgment',
    sentiment: ['neutral', 'warning', 'negative'],
    tags: ['understand', 'concern', 'help'],
  },
  {
    id: 'ack-2',
    title: 'Valid Point',
    content: "You make a really good point. Thank you for bringing this to our attention. Let me see what we can do.",
    category: 'acknowledgment',
    sentiment: ['neutral', 'positive'],
    tags: ['feedback', 'point', 'attention'],
  },
  {
    id: 'ack-3',
    title: 'Frustration Acknowledgment',
    content: "I hear you, and I can understand why this situation is frustrating. Your feelings are completely valid, and I'm here to help.",
    category: 'acknowledgment',
    sentiment: ['negative', 'warning'],
    tags: ['frustration', 'feelings', 'empathy'],
  },

  // Solutions
  {
    id: 'sol-1',
    title: 'Problem Solved',
    content: "Great news! I've resolved the issue on our end. You should now be able to proceed without any problems. Please let me know if you need anything else!",
    category: 'solution',
    sentiment: ['neutral', 'positive', 'warning'],
    tags: ['resolved', 'fixed', 'done'],
  },
  {
    id: 'sol-2',
    title: 'Refund Offered',
    content: "I've processed a full refund for you. You should see it reflected in your account within 3-5 business days. Is there anything else I can help with?",
    category: 'solution',
    sentiment: ['negative', 'warning', 'neutral'],
    tags: ['refund', 'money', 'compensation'],
  },
  {
    id: 'sol-3',
    title: 'Replacement Offered',
    content: "I'd be happy to send you a replacement at no additional cost. I've expedited the shipping so you should receive it within 2-3 business days.",
    category: 'solution',
    sentiment: ['negative', 'warning', 'neutral'],
    tags: ['replacement', 'shipping', 'expedited'],
  },
  {
    id: 'sol-4',
    title: 'Discount Offered',
    content: "As a token of our appreciation for your patience, I'd like to offer you a 20% discount on your next purchase. I'll send the code to your email shortly.",
    category: 'solution',
    sentiment: ['neutral', 'positive', 'warning'],
    tags: ['discount', 'appreciation', 'offer'],
  },

  // Follow-ups
  {
    id: 'follow-1',
    title: 'Check Back',
    content: "I'll need a little time to investigate this further. May I follow up with you within 24 hours once I have more information?",
    category: 'follow-up',
    sentiment: ['neutral', 'warning', 'negative'],
    tags: ['investigate', 'time', 'followup'],
  },
  {
    id: 'follow-2',
    title: 'Confirmation Request',
    content: "Before I proceed, could you please confirm that the solution I've proposed works for you?",
    category: 'follow-up',
    sentiment: ['neutral', 'positive'],
    tags: ['confirm', 'proceed', 'verify'],
  },
  {
    id: 'follow-3',
    title: 'Additional Help',
    content: "Is there anything else I can help you with today? I want to make sure all your questions are answered.",
    category: 'follow-up',
    sentiment: ['neutral', 'positive'],
    tags: ['help', 'questions', 'assist'],
  },

  // Closings
  {
    id: 'close-1',
    title: 'Happy Closing',
    content: "I'm so glad I could help! Thank you for being a valued customer. Have a wonderful day! 😊",
    category: 'closing',
    sentiment: ['positive'],
    tags: ['happy', 'thanks', 'goodbye'],
  },
  {
    id: 'close-2',
    title: 'Professional Closing',
    content: "Thank you for contacting us today. If you have any further questions, please don't hesitate to reach out. Take care!",
    category: 'closing',
    sentiment: ['neutral', 'positive'],
    tags: ['professional', 'thanks', 'contact'],
  },
  {
    id: 'close-3',
    title: 'Empathetic Closing',
    content: "I truly appreciate your patience and understanding throughout this process. We value your business. Please reach out if you need anything else.",
    category: 'closing',
    sentiment: ['neutral', 'warning', 'negative'],
    tags: ['patience', 'understanding', 'value'],
  },

  // Escalation
  {
    id: 'esc-1',
    title: 'Manager Escalation',
    content: "I understand this is a complex situation. Let me connect you with my supervisor who has more authority to help resolve this to your satisfaction.",
    category: 'escalation',
    sentiment: ['negative', 'warning'],
    tags: ['manager', 'supervisor', 'escalate'],
  },
  {
    id: 'esc-2',
    title: 'Specialist Transfer',
    content: "This issue requires specialized expertise. I'm going to transfer you to our specialist team who can provide the detailed assistance you need.",
    category: 'escalation',
    sentiment: ['neutral', 'warning', 'negative'],
    tags: ['specialist', 'transfer', 'expert'],
  },
];
