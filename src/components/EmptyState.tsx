import { MessageSquare, Sparkles } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-8">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-buddy/20 flex items-center justify-center">
          <MessageSquare className="w-10 h-10 text-primary" />
        </div>
        
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Select a conversation
        </h2>
        
        <p className="text-muted-foreground mb-6">
          Choose a chat from the sidebar to start helping customers with the power of Sentiment Buddy.
        </p>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-buddy/10 text-buddy text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          <span>AI-powered empathy assistance</span>
        </div>
      </div>
    </div>
  );
}
