import { SentimentLevel } from '@/types/chat';
import { cn } from '@/lib/utils';

interface SentimentBadgeProps {
  sentiment: SentimentLevel;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

const sentimentConfig: Record<SentimentLevel, { emoji: string; label: string; bgClass: string; textClass: string }> = {
  positive: {
    emoji: '😊',
    label: 'Happy',
    bgClass: 'bg-sentiment-positive/10',
    textClass: 'text-sentiment-positive',
  },
  neutral: {
    emoji: '😐',
    label: 'Neutral',
    bgClass: 'bg-sentiment-neutral/10',
    textClass: 'text-sentiment-neutral',
  },
  warning: {
    emoji: '😟',
    label: 'Concerned',
    bgClass: 'bg-sentiment-warning/10',
    textClass: 'text-sentiment-warning',
  },
  negative: {
    emoji: '😠',
    label: 'Frustrated',
    bgClass: 'bg-sentiment-negative/10',
    textClass: 'text-sentiment-negative',
  },
  escalated: {
    emoji: '🔥',
    label: 'Escalated',
    bgClass: 'bg-sentiment-escalated/10',
    textClass: 'text-sentiment-escalated',
  },
};

const sizeClasses = {
  sm: 'text-sm px-2 py-0.5',
  md: 'text-base px-3 py-1',
  lg: 'text-lg px-4 py-1.5',
};

export function SentimentBadge({ sentiment, showLabel = false, size = 'md', animate = false }: SentimentBadgeProps) {
  const config = sentimentConfig[sentiment];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium transition-all duration-300',
        config.bgClass,
        config.textClass,
        sizeClasses[size],
        animate && 'animate-sentiment-pulse'
      )}
    >
      <span className="text-inherit">{config.emoji}</span>
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}
