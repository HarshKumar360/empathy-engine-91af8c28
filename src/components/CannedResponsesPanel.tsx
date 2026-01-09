import { useState, useMemo } from 'react';
import { Search, MessageSquareText, X, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SentimentLevel } from '@/types/chat';
import { 
  cannedResponses, 
  CannedCategory, 
  categoryConfig, 
  CannedResponse 
} from '@/data/cannedResponses';
import { SentimentBadge } from './SentimentBadge';

interface CannedResponsesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (content: string) => void;
  currentSentiment: SentimentLevel;
}

export function CannedResponsesPanel({
  isOpen,
  onClose,
  onSelect,
  currentSentiment,
}: CannedResponsesPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CannedCategory | 'all'>('all');
  const [filterBySentiment, setFilterBySentiment] = useState(false);

  const filteredResponses = useMemo(() => {
    return cannedResponses.filter((response) => {
      // Category filter
      if (selectedCategory !== 'all' && response.category !== selectedCategory) {
        return false;
      }

      // Sentiment filter
      if (filterBySentiment && !response.sentiment.includes(currentSentiment)) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          response.title.toLowerCase().includes(query) ||
          response.content.toLowerCase().includes(query) ||
          response.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [searchQuery, selectedCategory, filterBySentiment, currentSentiment]);

  // Sort responses to show sentiment-matched ones first
  const sortedResponses = useMemo(() => {
    return [...filteredResponses].sort((a, b) => {
      const aMatches = a.sentiment.includes(currentSentiment) ? 1 : 0;
      const bMatches = b.sentiment.includes(currentSentiment) ? 1 : 0;
      return bMatches - aMatches;
    });
  }, [filteredResponses, currentSentiment]);

  const categories: (CannedCategory | 'all')[] = [
    'all',
    'greeting',
    'apology',
    'acknowledgment',
    'solution',
    'follow-up',
    'closing',
    'escalation',
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 bg-card border border-border rounded-xl shadow-xl max-h-[400px] flex flex-col overflow-hidden animate-fade-in-up z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <MessageSquareText className="w-4 h-4 text-primary" />
          <h3 className="font-medium text-sm text-foreground">Canned Responses</h3>
          <span className="text-xs text-muted-foreground">
            ({sortedResponses.length} responses)
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-accent rounded-md transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Search and Filters */}
      <div className="p-3 border-b border-border space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search responses..."
            className="w-full pl-9 pr-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'px-2.5 py-1 rounded-full text-xs font-medium transition-all',
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              )}
            >
              {category === 'all' ? 'All' : categoryConfig[category].label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterBySentiment(!filterBySentiment)}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all',
              filterBySentiment
                ? 'bg-buddy text-buddy-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent'
            )}
          >
            <Filter className="w-3 h-3" />
            Match Sentiment
          </button>
          {filterBySentiment && (
            <SentimentBadge sentiment={currentSentiment} size="sm" showLabel />
          )}
        </div>
      </div>

      {/* Response List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {sortedResponses.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No responses found. Try adjusting your filters.
          </div>
        ) : (
          sortedResponses.map((response) => (
            <ResponseCard
              key={response.id}
              response={response}
              onClick={() => {
                onSelect(response.content);
                onClose();
              }}
              isRecommended={response.sentiment.includes(currentSentiment)}
            />
          ))
        )}
      </div>
    </div>
  );
}

interface ResponseCardProps {
  response: CannedResponse;
  onClick: () => void;
  isRecommended: boolean;
}

function ResponseCard({ response, onClick, isRecommended }: ResponseCardProps) {
  const config = categoryConfig[response.category];

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left p-3 rounded-lg border transition-all hover:shadow-sm',
        isRecommended
          ? 'border-primary/30 bg-primary/5 hover:border-primary/50'
          : 'border-border bg-background hover:border-primary/20 hover:bg-accent/50'
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-2">
          <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', config.color)}>
            {config.label}
          </span>
          {isRecommended && (
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              ✓ Recommended
            </span>
          )}
        </div>
      </div>
      <h4 className="font-medium text-sm text-foreground mb-1">{response.title}</h4>
      <p className="text-xs text-muted-foreground line-clamp-2">{response.content}</p>
    </button>
  );
}
