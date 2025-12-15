import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ChatMessageProps {
  message: Message;
  isLatest?: boolean;
}

export function ChatMessage({ message, isLatest }: ChatMessageProps) {
  const isAgent = message.sender === 'agent';

  return (
    <div
      className={cn(
        'flex gap-3 animate-fade-in-up',
        isAgent ? 'justify-end' : 'justify-start'
      )}
    >
      {!isAgent && (
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground shrink-0">
          C
        </div>
      )}
      
      <div
        className={cn(
          'max-w-[70%] rounded-2xl px-4 py-3 relative',
          isAgent
            ? 'bg-chat-agent border border-chat-agent-border rounded-tr-md'
            : 'bg-chat-customer border border-chat-customer-border rounded-tl-md shadow-sm'
        )}
      >
        <p className="text-sm leading-relaxed text-foreground">{message.content}</p>
        <span className="text-[10px] text-muted-foreground/70 mt-2 block">
          {format(message.timestamp, 'h:mm a')}
        </span>
      </div>
      
      {isAgent && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary shrink-0">
          You
        </div>
      )}
    </div>
  );
}
