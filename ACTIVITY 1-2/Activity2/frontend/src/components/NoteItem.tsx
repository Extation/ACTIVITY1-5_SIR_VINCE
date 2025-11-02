import React, { useState } from 'react';
import { Note } from '../types/Note';

interface NoteItemProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
}

const styles = {
  noteCard: (hovered: boolean) => ({
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: hovered 
      ? '0 12px 32px rgba(0, 0, 0, 0.15)' 
      : '0 4px 12px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
    border: '1px solid #e8e8e8',
    cursor: 'pointer',
    position: 'relative' as const,
    overflow: 'hidden',
  }) as React.CSSProperties,
  accentBar: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)',
  } as React.CSSProperties,
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
    marginTop: '4px',
  } as React.CSSProperties,
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a202c',
    margin: 0,
    flex: 1,
    marginRight: '16px',
    lineHeight: '1.4',
  } as React.CSSProperties,
  actions: {
    display: 'flex',
    gap: '8px',
    flexShrink: 0,
  } as React.CSSProperties,
  actionButton: (hovered: boolean, isDelete: boolean) => ({
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: hovered 
      ? (isDelete ? '#fee' : '#e6f2ff') 
      : '#f7fafc',
    color: isDelete ? '#e53e3e' : '#667eea',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    transform: hovered ? 'scale(1.1)' : 'scale(1)',
  }) as React.CSSProperties,
  content: {
    fontSize: '15px',
    color: '#4a5568',
    lineHeight: '1.6',
    marginBottom: '20px',
    wordWrap: 'break-word' as const,
  } as React.CSSProperties,
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '16px',
    borderTop: '1px solid #edf2f7',
  } as React.CSSProperties,
  dates: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  } as React.CSSProperties,
  dateText: {
    fontSize: '12px',
    color: '#a0aec0',
    fontWeight: '500',
  } as React.CSSProperties,
  badge: {
    backgroundColor: '#f0f4ff',
    color: '#2193b0',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  } as React.CSSProperties,
};

const NoteItem: React.FC<NoteItemProps> = ({ note, onEdit, onDelete }) => {
  const [hoveredCard, setHoveredCard] = useState(false);
  const [hoveredEdit, setHoveredEdit] = useState(false);
  const [hoveredDelete, setHoveredDelete] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const isUpdated = note.updatedAt !== note.createdAt;

  return (
    <div 
      style={styles.noteCard(hoveredCard)}
      onMouseEnter={() => setHoveredCard(true)}
      onMouseLeave={() => setHoveredCard(false)}
    >
      <div style={styles.accentBar} />
      <div style={styles.header}>
        <h3 style={styles.title}>{note.title}</h3>
        <div style={styles.actions}>
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            style={styles.actionButton(hoveredEdit, false)}
            onMouseEnter={() => setHoveredEdit(true)}
            onMouseLeave={() => setHoveredEdit(false)}
            title="Edit note"
          >
            ✏️
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            style={styles.actionButton(hoveredDelete, true)}
            onMouseEnter={() => setHoveredDelete(true)}
            onMouseLeave={() => setHoveredDelete(false)}
            title="Delete note"
          >
            🗑️
          </button>
        </div>
      </div>
      <p style={styles.content}>{truncateContent(note.content)}</p>
      <div style={styles.footer}>
        <div style={styles.dates}>
          <span style={styles.dateText}>
            📅 Created {formatDate(note.createdAt)}
          </span>
          {isUpdated && (
            <span style={styles.dateText}>
              🔄 Updated {formatDate(note.updatedAt)}
            </span>
          )}
        </div>
        {isUpdated && (
          <div style={styles.badge}>Modified</div>
        )}
      </div>
    </div>
  );
};

export default NoteItem;
