import { SentimentLevel } from '@/types/chat';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface SentimentTimelineProps {
  history: { timestamp: Date; level: SentimentLevel }[];
}

const sentimentColors: Record<SentimentLevel, string> = {
  positive: 'bg-sentiment-positive',
  neutral: 'bg-sentiment-neutral',
  warning: 'bg-sentiment-warning',
  negative: 'bg-sentiment-negative',
  escalated: 'bg-sentiment-escalated',
};

const sentimentHeights: Record<SentimentLevel, string> = {
  positive: 'h-full',
  neutral: 'h-3/4',
  warning: 'h-1/2',
  negative: 'h-1/4',
  escalated: 'h-1/4',
};

export function SentimentTimeline({ history }: SentimentTimelineProps) {
  if (history.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-medium text-foreground mb-3">Sentiment Timeline</h3>
      
      <div className="flex items-end gap-1 h-12">
        {history.map((point, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center justify-end group relative"
          >
            <div
              className={cn(
                'w-full rounded-t-sm transition-all duration-500',
                sentimentColors[point.level],
                sentimentHeights[point.level],
                index === history.length - 1 && 'animate-sentiment-pulse'
              )}
            />
            
            {/* Tooltip */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              {format(point.timestamp, 'h:mm a')}
            </div>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-between mt-3 text-[10px] text-muted-foreground">
        <span>Start</span>
        <span>Now</span>
      </div>
    </div>
  );
}
