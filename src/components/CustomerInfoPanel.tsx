import { CustomerInfo } from '@/types/chat';
import { Mail, Building, Ticket, Calendar, Tag } from 'lucide-react';

interface CustomerInfoPanelProps {
  customer: CustomerInfo;
}

export function CustomerInfoPanel({ customer }: CustomerInfoPanelProps) {
  return (
    <div className="bg-card border-b border-border p-4">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-medium text-primary">
          {customer.name.split(' ').map(n => n[0]).join('')}
        </div>
        
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-foreground">{customer.name}</h2>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Mail className="w-3 h-3" />
            <span className="truncate">{customer.email}</span>
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex items-center gap-4 text-sm">
          {customer.company && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Building className="w-4 h-4" />
              <span>{customer.company}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Ticket className="w-4 h-4" />
            <span>{customer.previousTickets} previous</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Since {customer.memberSince}</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 mt-3">
        <Tag className="w-3 h-3 text-muted-foreground" />
        <div className="flex flex-wrap gap-1.5">
          {customer.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
