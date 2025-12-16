import { MessageSquare, Users, TrendingUp, AlertTriangle, Flame } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { NotificationCenter } from './NotificationCenter';
import { ManagerNotification } from '@/types/chat';

interface DashboardHeaderProps {
  activeChats: number;
  totalResolved: number;
  avgSentiment: string;
  urgentCount: number;
  escalatedCount: number;
  notifications: ManagerNotification[];
  onMarkNotificationRead: (id: string) => void;
  onViewConversation: (conversationId: string) => void;
  onDismissNotification: (id: string) => void;
}

export function DashboardHeader({
  activeChats,
  totalResolved,
  avgSentiment,
  urgentCount,
  escalatedCount,
  notifications,
  onMarkNotificationRead,
  onViewConversation,
  onDismissNotification,
}: DashboardHeaderProps) {
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

          {urgentCount > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded-lg bg-sentiment-escalated/10 flex items-center justify-center animate-sentiment-pulse">
                <Flame className="w-4 h-4 text-sentiment-escalated" />
              </div>
              <div>
                <p className="font-medium text-sentiment-escalated">{urgentCount}</p>
                <p className="text-xs text-muted-foreground">Urgent</p>
              </div>
            </div>
          )}

          {escalatedCount > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded-lg bg-sentiment-warning/10 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-sentiment-warning" />
              </div>
              <div>
                <p className="font-medium text-sentiment-warning">{escalatedCount}</p>
                <p className="text-xs text-muted-foreground">Escalated</p>
              </div>
            </div>
          )}

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

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NotificationCenter
            notifications={notifications}
            onMarkRead={onMarkNotificationRead}
            onViewConversation={onViewConversation}
            onDismiss={onDismissNotification}
          />
        </div>
      </div>
    </header>
  );
}
