import { useState } from 'react';
import { Bell, X, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { ManagerNotification, PriorityLevel } from '@/types/chat';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface NotificationCenterProps {
  notifications: ManagerNotification[];
  onMarkRead: (id: string) => void;
  onViewConversation: (conversationId: string) => void;
  onDismiss: (id: string) => void;
}

const priorityConfig: Record<PriorityLevel, { color: string; bgColor: string; icon: typeof AlertTriangle }> = {
  low: { color: 'text-muted-foreground', bgColor: 'bg-muted', icon: Clock },
  medium: { color: 'text-primary', bgColor: 'bg-primary/10', icon: Clock },
  high: { color: 'text-sentiment-warning', bgColor: 'bg-sentiment-warning/10', icon: AlertTriangle },
  urgent: { color: 'text-sentiment-escalated', bgColor: 'bg-sentiment-escalated/10', icon: AlertTriangle },
};

export function NotificationCenter({
  notifications,
  onMarkRead,
  onViewConversation,
  onDismiss,
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-accent transition-colors"
      >
        <Bell className="w-5 h-5 text-muted-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-sentiment-escalated text-white text-xs font-medium rounded-full flex items-center justify-center animate-sentiment-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-96 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-slide-in">
            <div className="p-4 border-b border-border flex items-center justify-between bg-gradient-to-r from-sentiment-warning/5 to-primary/5">
              <div>
                <h3 className="font-semibold text-foreground">Manager Notifications</h3>
                <p className="text-xs text-muted-foreground">
                  {unreadCount} escalations need attention
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-accent rounded-lg"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <CheckCircle className="w-10 h-10 text-sentiment-positive mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">All caught up!</p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const config = priorityConfig[notification.priority];
                  const Icon = config.icon;

                  return (
                    <div
                      key={notification.id}
                      className={cn(
                        'p-4 border-b border-border transition-colors hover:bg-accent/50 cursor-pointer',
                        !notification.isRead && 'bg-primary/5'
                      )}
                      onClick={() => {
                        onMarkRead(notification.id);
                        onViewConversation(notification.conversationId);
                        setIsOpen(false);
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn('w-8 h-8 rounded-full flex items-center justify-center shrink-0', config.bgColor)}>
                          <Icon className={cn('w-4 h-4', config.color)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm text-foreground truncate">
                              {notification.customerName}
                            </span>
                            <span className={cn('text-xs font-medium px-1.5 py-0.5 rounded', config.bgColor, config.color)}>
                              {notification.priority.toUpperCase()}
                            </span>
                            {!notification.isRead && (
                              <span className="w-2 h-2 bg-primary rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                            {notification.reason}
                          </p>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDismiss(notification.id);
                          }}
                          className="p-1 hover:bg-accent rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
