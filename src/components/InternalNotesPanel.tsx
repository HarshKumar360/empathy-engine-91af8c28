import { useState } from 'react';
import { InternalNote } from '@/types/chat';
import { 
  StickyNote, 
  Plus, 
  Pin, 
  Trash2, 
  ChevronDown, 
  ChevronUp,
  Clock 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface InternalNotesPanelProps {
  notes: InternalNote[];
  onAddNote: (content: string) => void;
  onDeleteNote: (noteId: string) => void;
  onTogglePin: (noteId: string) => void;
}

export function InternalNotesPanel({
  notes,
  onAddNote,
  onDeleteNote,
  onTogglePin,
}: InternalNotesPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote.trim());
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddNote();
    }
    if (e.key === 'Escape') {
      setIsAddingNote(false);
      setNewNote('');
    }
  };

  // Sort notes: pinned first, then by timestamp
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  const pinnedCount = notes.filter(n => n.isPinned).length;

  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 hover:bg-accent/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <StickyNote className="w-4 h-4 text-buddy" />
          <h3 className="font-medium text-sm text-foreground">Internal Notes</h3>
          <span className="px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
            {notes.length}
          </span>
          {pinnedCount > 0 && (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
              <Pin className="w-3 h-3" />
              {pinnedCount}
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-border">
          {/* Add Note Button / Form */}
          <div className="p-3 border-b border-border">
            {isAddingNote ? (
              <div className="space-y-2">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add a private note visible only to team members..."
                  className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring min-h-[80px]"
                  autoFocus
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Press Enter to save, Esc to cancel
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setIsAddingNote(false);
                        setNewNote('');
                      }}
                      className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddNote}
                      disabled={!newNote.trim()}
                      className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAddingNote(true)}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg border border-dashed border-border transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Internal Note
              </button>
            )}
          </div>

          {/* Notes List */}
          <div className="max-h-[300px] overflow-y-auto">
            {sortedNotes.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground text-sm">
                <StickyNote className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No internal notes yet</p>
                <p className="text-xs mt-1">Add notes for your team</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {sortedNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onDelete={() => onDeleteNote(note.id)}
                    onTogglePin={() => onTogglePin(note.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface NoteCardProps {
  note: InternalNote;
  onDelete: () => void;
  onTogglePin: () => void;
}

function NoteCard({ note, onDelete, onTogglePin }: NoteCardProps) {
  return (
    <div
      className={cn(
        'p-3 hover:bg-accent/30 transition-colors group',
        note.isPinned && 'bg-primary/5'
      )}
    >
      <div className="flex items-start gap-3">
        {/* Author Avatar */}
        <div className="w-7 h-7 rounded-full bg-buddy/10 flex items-center justify-center text-xs font-medium text-buddy shrink-0">
          {note.authorInitials}
        </div>

        <div className="flex-1 min-w-0">
          {/* Author & Time */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-foreground">
              {note.authorName}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {formatDistanceToNow(note.timestamp, { addSuffix: true })}
            </span>
            {note.isPinned && (
              <Pin className="w-3 h-3 text-primary" />
            )}
          </div>

          {/* Content */}
          <p className="text-sm text-foreground whitespace-pre-wrap">
            {note.content}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onTogglePin}
            className={cn(
              'p-1.5 rounded-md transition-colors',
              note.isPinned
                ? 'text-primary bg-primary/10 hover:bg-primary/20'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            )}
            title={note.isPinned ? 'Unpin note' : 'Pin note'}
          >
            <Pin className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
            title="Delete note"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
