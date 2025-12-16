import { Conversation, PriorityLevel } from '@/types/chat';
import { SentimentBadge } from './SentimentBadge';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { AlertTriangle, Clock, Flame, ChevronRight } from 'lucide-react';

interface PriorityQueuePanelProps {
  conversations: Conversation[];
  onSelectConversation: (id: string) => void;
}

const priorityConfig: Record<PriorityLevel, { icon: typeof Flame; color: string; bgColor: string; label: string }> = {
  urgent: { icon: Flame, color: 'text-sentiment-escalated', bgColor: 'bg-sentiment-escalated/10', label: 'Urgent' },
  high: { icon: AlertTriangle, color: 'text-sentiment-warning', bgColor: 'bg-sentiment-warning/10', label: 'High' },
  medium: { icon: Clock, color: 'text-primary', bgColor: 'bg-primary/10', label: 'Medium' },
  low: { icon: Clock, color: 'text-muted-foreground', bgColor: 'bg-muted', label: 'Low' },
};

export function PriorityQueuePanel({ conversations, onSelectConversation }: PriorityQueuePanelProps) {
  // Sort by priority and sentiment
  const priorityOrder: Record<PriorityLevel, number> = { urgent: 0, high: 1, medium: 2, low: 3 };
  const sentimentOrder = { escalated: 0, negative: 1, warning: 2, neutral: 3, positive: 4 };

  const sortedConversations = [...conversations]
    .filter((c) => c.isActive)
    .sort((a, b) => {
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return sentimentOrder[a.currentSentiment] - sentimentOrder[b.currentSentiment];
    });

  const urgentCount = sortedConversations.filter((c) => c.priority === 'urgent').length;
  const highCount = sortedConversations.filter((c) => c.priority === 'high').length;

  return (
    <div className="bg-card border-t border-border">
      {/* Header Stats */}
      <div className="px-4 py-3 border-b border-border bg-gradient-to-r from-sentiment-escalated/5 via-sentiment-warning/5 to-transparent">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Priority Queue</h3>
          <div className="flex items-center gap-3">
            {urgentCount > 0 && (
              <span className="flex items-center gap-1 text-xs font-medium text-sentiment-escalated">
                <Flame className="w-3 h-3" />
                {urgentCount} urgent
              </span>
            )}
            {highCount > 0 && (
              <span className="flex items-center gap-1 text-xs font-medium text-sentiment-warning">
                <AlertTriangle className="w-3 h-3" />
                {highCount} high
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Queue List */}
      <div className="max-h-48 overflow-y-auto">
        {sortedConversations.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground text-sm">
            No active conversations in queue
          </div>
        ) : (
          sortedConversations.slice(0, 5).map((conversation, index) => {
            const config = priorityConfig[conversation.priority];
            const Icon = config.icon;

            return (
              <button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={cn(
                  'w-full px-4 py-3 flex items-center gap-3 border-b border-border transition-all hover:bg-accent/50 group',
                  index === 0 && conversation.priority === 'urgent' && 'bg-sentiment-escalated/5'
                )}
              >
                {/* Priority Indicator */}
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', config.bgColor)}>
                  <Icon className={cn('w-4 h-4', config.color)} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-foreground truncate">
                      {conversation.customerName}
                    </span>
                    <SentimentBadge sentiment={conversation.currentSentiment} size="sm" />
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {conversation.lastMessage}
                  </p>
                </div>

                {/* Time */}
                <div className="text-right shrink-0">
                  <span className={cn('text-xs font-medium px-1.5 py-0.5 rounded', config.bgColor, config.color)}>
                    {config.label}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(conversation.lastMessageTime, { addSuffix: true })}
                  </p>
                </div>

                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
