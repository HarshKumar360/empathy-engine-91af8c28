import { Conversation } from '@/types/chat';
import { SentimentBadge } from './SentimentBadge';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface ChatListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

export function ChatList({ conversations, activeConversationId, onSelectConversation }: ChatListProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Active Chats</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          {conversations.filter(c => c.isActive).length} active
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
            className={cn(
              'w-full p-4 text-left border-b border-border transition-all duration-200 hover:bg-accent/50 group relative',
              activeConversationId === conversation.id && 'bg-accent border-l-2 border-l-primary',
              conversation.currentSentiment === 'escalated' && 'bg-sentiment-escalated/5 hover:bg-sentiment-escalated/10',
              conversation.currentSentiment === 'negative' && 'bg-sentiment-negative/5 hover:bg-sentiment-negative/10'
            )}
          >
            {/* Unread indicator */}
            {conversation.unreadCount > 0 && (
              <span className="absolute top-4 right-4 w-5 h-5 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center justify-center">
                {conversation.unreadCount}
              </span>
            )}
            
            <div className="flex items-start gap-3">
              {/* Avatar with sentiment ring */}
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ring-2 ring-offset-2 ring-offset-background transition-all',
                  conversation.currentSentiment === 'positive' && 'bg-sentiment-positive/20 text-sentiment-positive ring-sentiment-positive/30',
                  conversation.currentSentiment === 'neutral' && 'bg-sentiment-neutral/20 text-sentiment-neutral ring-sentiment-neutral/30',
                  conversation.currentSentiment === 'warning' && 'bg-sentiment-warning/20 text-sentiment-warning ring-sentiment-warning/30',
                  conversation.currentSentiment === 'negative' && 'bg-sentiment-negative/20 text-sentiment-negative ring-sentiment-negative/30',
                  conversation.currentSentiment === 'escalated' && 'bg-sentiment-escalated/20 text-sentiment-escalated ring-sentiment-escalated/30'
                )}
              >
                {conversation.customerName.split(' ').map(n => n[0]).join('')}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground truncate">
                    {conversation.customerName}
                  </span>
                  <SentimentBadge 
                    sentiment={conversation.currentSentiment} 
                    size="sm"
                    animate={conversation.currentSentiment === 'escalated'}
                  />
                </div>
                
                <p className="text-sm text-muted-foreground truncate">
                  {conversation.lastMessage}
                </p>
                
                <p className="text-xs text-muted-foreground/70 mt-1">
                  {formatDistanceToNow(conversation.lastMessageTime, { addSuffix: true })}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
