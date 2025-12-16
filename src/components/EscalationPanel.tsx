import { useState } from 'react';
import { AlertTriangle, UserCheck, Send, X, Clock, CheckCircle } from 'lucide-react';
import { EscalationInfo, PriorityLevel } from '@/types/chat';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface EscalationPanelProps {
  escalation: EscalationInfo;
  customerName: string;
  priority: PriorityLevel;
  onEscalate: (reason: string, priority: PriorityLevel) => void;
  onResolve: () => void;
}

const priorityConfig: Record<PriorityLevel, { label: string; color: string; bgColor: string }> = {
  low: { label: 'Low', color: 'text-muted-foreground', bgColor: 'bg-muted' },
  medium: { label: 'Medium', color: 'text-primary', bgColor: 'bg-primary/10' },
  high: { label: 'High', color: 'text-sentiment-warning', bgColor: 'bg-sentiment-warning/10' },
  urgent: { label: 'Urgent', color: 'text-sentiment-escalated', bgColor: 'bg-sentiment-escalated/10' },
};

export function EscalationPanel({
  escalation,
  customerName,
  priority,
  onEscalate,
  onResolve,
}: EscalationPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [reason, setReason] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<PriorityLevel>('high');

  const handleEscalate = () => {
    if (reason.trim()) {
      onEscalate(reason, selectedPriority);
      setReason('');
      setIsExpanded(false);
    }
  };

  if (escalation.status === 'escalated') {
    return (
      <div className="bg-sentiment-warning/10 border border-sentiment-warning/20 rounded-xl p-4 animate-slide-in">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-sentiment-warning/20 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-sentiment-warning" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground">Escalated to Manager</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {escalation.reason}
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <UserCheck className="w-3 h-3" />
                {escalation.managerAssigned || 'Assigning...'}
              </span>
              <span>
                {escalation.escalatedAt && format(escalation.escalatedAt, 'h:mm a')}
              </span>
            </div>
            <button
              onClick={onResolve}
              className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Mark as Resolved
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (escalation.status === 'resolved') {
    return (
      <div className="bg-sentiment-positive/10 border border-sentiment-positive/20 rounded-xl p-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-sentiment-positive" />
          <span className="text-sm font-medium text-sentiment-positive">
            Escalation Resolved
          </span>
          <span className="text-xs text-muted-foreground ml-auto">
            {escalation.resolvedAt && format(escalation.resolvedAt, 'h:mm a')}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Priority Badge */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Ticket Priority</span>
        <span className={cn('text-xs font-medium px-2 py-1 rounded-full', priorityConfig[priority].bgColor, priorityConfig[priority].color)}>
          {priorityConfig[priority].label}
        </span>
      </div>

      {/* Escalate Button */}
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-sentiment-warning/30 bg-sentiment-warning/5 text-sentiment-warning hover:bg-sentiment-warning/10 transition-all duration-200"
        >
          <AlertTriangle className="w-4 h-4" />
          <span className="font-medium text-sm">Escalate to Manager</span>
        </button>
      ) : (
        <div className="bg-card border border-border rounded-xl p-4 space-y-3 animate-slide-in">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground">Escalate Ticket</h4>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 hover:bg-accent rounded"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Priority Selection */}
          <div className="flex gap-2">
            {(['medium', 'high', 'urgent'] as PriorityLevel[]).map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPriority(p)}
                className={cn(
                  'flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border transition-all',
                  selectedPriority === p
                    ? cn(priorityConfig[p].bgColor, priorityConfig[p].color, 'border-current')
                    : 'border-border text-muted-foreground hover:border-primary/30'
                )}
              >
                {priorityConfig[p].label}
              </button>
            ))}
          </div>

          {/* Reason Input */}
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Describe why this needs manager attention..."
            className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            rows={2}
          />

          {/* Submit */}
          <button
            onClick={handleEscalate}
            disabled={!reason.trim()}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-sentiment-warning text-white font-medium text-sm hover:bg-sentiment-warning/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
            Notify Manager
          </button>
        </div>
      )}
    </div>
  );
}
