import { useState, useRef, useEffect } from 'react';
import { Conversation, CustomerInfo, Message } from '@/types/chat';
import { ChatMessage } from './ChatMessage';
import { CustomerInfoPanel } from './CustomerInfoPanel';
import { BuddySidebar } from './BuddySidebar';
import { SentimentBadge } from './SentimentBadge';
import { Send, Paperclip, Smile } from 'lucide-react';

interface ChatWindowProps {
  conversation: Conversation;
  customer: CustomerInfo;
  onSendMessage: (message: string) => void;
}

export function ChatWindow({ conversation, customer, onSendMessage }: ChatWindowProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex h-full">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Customer Info Header */}
        <CustomerInfoPanel customer={customer} />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-background">
          {conversation.messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              isLatest={index === conversation.messages.length - 1}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-card">
          <div className="flex items-end gap-3">
            <button
              type="button"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                rows={1}
                className="w-full px-4 py-3 bg-background border border-input rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm text-foreground placeholder:text-muted-foreground"
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            
            <button
              type="button"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
            >
              <Smile className="w-5 h-5" />
            </button>
            
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          {/* Current sentiment indicator */}
          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
            <span>Current sentiment:</span>
            <SentimentBadge sentiment={conversation.currentSentiment} showLabel size="sm" />
          </div>
        </form>
      </div>

      {/* Buddy Sidebar */}
      <div className="w-80 shrink-0">
        <BuddySidebar
          suggestions={conversation.buddySuggestions}
          sentimentHistory={conversation.sentimentHistory}
          onQuickReply={handleQuickReply}
          currentSentiment={conversation.currentSentiment}
        />
      </div>
    </div>
  );
}
