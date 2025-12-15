import { MessageSquare, Users, TrendingUp, Bell } from 'lucide-react';

interface DashboardHeaderProps {
  activeChats: number;
  totalResolved: number;
  avgSentiment: string;
}

export function DashboardHeader({ activeChats, totalResolved, avgSentiment }: DashboardHeaderProps) {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-buddy flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Support Hub</h1>
            <p className="text-sm text-muted-foreground">Sentiment-aware customer support</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">{activeChats}</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 rounded-lg bg-sentiment-positive/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-sentiment-positive" />
            </div>
            <div>
              <p className="font-medium text-foreground">{totalResolved}</p>
              <p className="text-xs text-muted-foreground">Resolved</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 rounded-lg bg-buddy/10 flex items-center justify-center">
              <span className="text-base">{avgSentiment}</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Good</p>
              <p className="text-xs text-muted-foreground">Avg Mood</p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-accent transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-sentiment-negative rounded-full" />
        </button>
      </div>
    </header>
  );
}
