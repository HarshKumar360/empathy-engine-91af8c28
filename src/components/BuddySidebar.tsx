import { BuddySuggestion, SentimentLevel, EscalationInfo, PriorityLevel } from '@/types/chat';
import { cn } from '@/lib/utils';
import { SentimentTimeline } from './SentimentTimeline';
import { SentimentChart } from './SentimentChart';
import { EscalationPanel } from './EscalationPanel';
import { Sparkles, AlertTriangle, PartyPopper, Heart, Zap } from 'lucide-react';

interface BuddySidebarProps {
  suggestions: BuddySuggestion[];
  sentimentHistory: { timestamp: Date; level: SentimentLevel }[];
  onQuickReply: (reply: string) => void;
  currentSentiment: SentimentLevel;
  customerName: string;
  escalation: EscalationInfo;
  priority: PriorityLevel;
  onEscalate: (reason: string, priority: PriorityLevel) => void;
  onResolveEscalation: () => void;
}

const typeConfig = {
  empathy: {
    icon: Heart,
    bgClass: 'bg-buddy-muted border-buddy/20',
    iconClass: 'text-buddy',
  },
  'quick-reply': {
    icon: Zap,
    bgClass: 'bg-primary/5 border-primary/20',
    iconClass: 'text-primary',
  },
  alert: {
    icon: AlertTriangle,
    bgClass: 'bg-sentiment-warning/10 border-sentiment-warning/20',
    iconClass: 'text-sentiment-warning',
  },
  celebration: {
    icon: PartyPopper,
    bgClass: 'bg-sentiment-positive/10 border-sentiment-positive/20',
    iconClass: 'text-sentiment-positive',
  },
};

export function BuddySidebar({
  suggestions,
  sentimentHistory,
  onQuickReply,
  currentSentiment,
  customerName,
  escalation,
  priority,
  onEscalate,
  onResolveEscalation,
}: BuddySidebarProps) {
  return (
    <div className="h-full flex flex-col bg-card border-l border-border">
      {/* Header */}
      <div className="p-4 border-b border-border bg-gradient-to-r from-buddy/5 to-primary/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-buddy to-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Sentiment Buddy</h2>
            <p className="text-xs text-muted-foreground">Your empathy assistant</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Sentiment Chart */}
        <SentimentChart history={sentimentHistory} />

        {/* Sentiment Timeline */}
        <SentimentTimeline history={sentimentHistory} />

        {/* Escalation Panel */}
        <EscalationPanel
          escalation={escalation}
          customerName={customerName}
          priority={priority}
          onEscalate={onEscalate}
          onResolve={onResolveEscalation}
        />

        {/* Suggestions */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Suggestions</h3>
          
          {suggestions.slice(-3).reverse().map((suggestion, index) => {
            const config = typeConfig[suggestion.type];
            const Icon = config.icon;
            
            return (
              <div
                key={suggestion.id}
                className={cn(
                  'rounded-lg border p-3 animate-slide-in',
                  config.bgClass,
                  index === 0 && 'ring-1 ring-primary/20'
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-2 mb-2">
                  <Icon className={cn('w-4 h-4 mt-0.5', config.iconClass)} />
                  <p className="text-sm text-foreground leading-relaxed">{suggestion.message}</p>
                </div>
                
                {suggestion.quickReplies && (
                  <div className="ml-6 space-y-2 mt-3">
                    {suggestion.quickReplies.map((reply, replyIndex) => (
                      <button
                        key={replyIndex}
                        onClick={() => onQuickReply(reply)}
                        className="w-full text-left text-sm px-3 py-2 rounded-md bg-background/80 border border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 text-foreground"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer tip */}
      <div className="p-4 border-t border-border bg-muted/30">
        <p className="text-xs text-muted-foreground text-center">
          💡 Click any suggestion to insert it into your message
        </p>
      </div>
    </div>
  );
}
