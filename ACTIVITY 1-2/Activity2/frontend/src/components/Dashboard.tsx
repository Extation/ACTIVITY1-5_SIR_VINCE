import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Note } from '../types/Note';
import { User } from '../types/User';
import { noteService } from '../services/noteService';
import { authService } from '../services/authService';
import NoteItem from './NoteItem';
import NoteForm from './NoteForm';

interface DashboardProps {
  onLogout: () => void;
}

const styles = {
  dashboard: {
    minHeight: '100vh',
    backgroundColor: '#f7fafc',
  } as React.CSSProperties,
  header: {
    background: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
    padding: '24px 32px',
    boxShadow: '0 4px 20px rgba(33, 147, 176, 0.3)',
  } as React.CSSProperties,
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '16px',
  } as React.CSSProperties,
  titleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  } as React.CSSProperties,
  icon: {
    fontSize: '48px',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
  } as React.CSSProperties,
  headerTitle: {
    margin: 0,
    fontSize: '32px',
    fontWeight: '800',
    color: '#ffffff',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  } as React.CSSProperties,
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: '12px 20px',
    borderRadius: '50px',
    backdropFilter: 'blur(10px)',
  } as React.CSSProperties,
  welcomeText: {
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '600',
  } as React.CSSProperties,
  logoutButton: (hovered: boolean) => ({
    padding: '10px 24px',
    backgroundColor: hovered ? '#ffffff' : 'rgba(255,255,255,0.2)',
    color: hovered ? '#667eea' : '#ffffff',
    border: '2px solid #ffffff',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '700',
    transition: 'all 0.3s',
    transform: hovered ? 'scale(1.05)' : 'scale(1)',
  }) as React.CSSProperties,
  content: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '32px 32px 64px',
  } as React.CSSProperties,
  controls: {
    display: 'flex',
    gap: '16px',
    marginBottom: '32px',
    flexWrap: 'wrap' as const,
    alignItems: 'stretch',
  } as React.CSSProperties,
  searchContainer: {
    flex: '1',
    minWidth: '300px',
    position: 'relative' as const,
  } as React.CSSProperties,
  searchIcon: {
    position: 'absolute' as const,
    left: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '20px',
    color: '#a0aec0',
    pointerEvents: 'none' as const,
  } as React.CSSProperties,
  searchInput: (focused: boolean) => ({
    width: '100%',
    padding: '16px 20px 16px 52px',
    fontSize: '15px',
    border: focused ? '2px solid #2193b0' : '2px solid #e2e8f0',
    borderRadius: '14px',
    outline: 'none',
    backgroundColor: '#ffffff',
    transition: 'all 0.3s',
    boxShadow: focused ? '0 4px 12px rgba(33, 147, 176, 0.15)' : '0 2px 4px rgba(0,0,0,0.05)',
  }) as React.CSSProperties,
  addButton: (hovered: boolean) => ({
    padding: '16px 32px',
    background: hovered 
      ? 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)' 
      : 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '14px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '700',
    transition: 'all 0.3s',
    boxShadow: '0 4px 12px rgba(33, 147, 176, 0.3)',
    transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
    whiteSpace: 'nowrap' as const,
  }) as React.CSSProperties,
  messageBase: {
    padding: '16px 24px',
    borderRadius: '12px',
    marginBottom: '24px',
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    animation: 'slideIn 0.3s ease-out',
  } as React.CSSProperties,
  errorMessage: {
    ...{
      padding: '16px 24px',
      borderRadius: '12px',
      marginBottom: '24px',
      fontSize: '14px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    backgroundColor: '#fff5f5',
    color: '#c53030',
    border: '2px solid #fc8181',
  } as React.CSSProperties,
  successMessage: {
    ...{
      padding: '16px 24px',
      borderRadius: '12px',
      marginBottom: '24px',
      fontSize: '14px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    backgroundColor: '#f0fff4',
    color: '#22543d',
    border: '2px solid #68d391',
  } as React.CSSProperties,
  statsContainer: {
    display: 'flex',
    gap: '16px',
    marginBottom: '32px',
    flexWrap: 'wrap' as const,
  } as React.CSSProperties,
  statCard: {
    backgroundColor: '#ffffff',
    padding: '20px 28px',
    borderRadius: '14px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    border: '1px solid #e2e8f0',
  } as React.CSSProperties,
  statIcon: {
    fontSize: '28px',
  } as React.CSSProperties,
  statText: {
    fontSize: '14px',
    color: '#718096',
    margin: 0,
  } as React.CSSProperties,
  statNumber: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#2193b0',
    margin: 0,
  } as React.CSSProperties,
  notesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '24px',
    marginTop: '24px',
  } as React.CSSProperties,
  noNotes: {
    textAlign: 'center' as const,
    padding: '80px 32px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '2px dashed #cbd5e0',
    color: '#718096',
    fontSize: '16px',
    gridColumn: '1 / -1',
  } as React.CSSProperties,
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontSize: '20px',
    color: '#2193b0',
    fontWeight: '600',
  } as React.CSSProperties,
};

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredLogout, setHoveredLogout] = useState(false);
  const [hoveredAdd, setHoveredAdd] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    loadNotes();
  }, [navigate]);

  // Auto-hide messages after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const loadNotes = async () => {
    try {
      setLoading(true);
      setError('');
      const notesData = await noteService.getAllNotes();
      setNotes(notesData);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to load notes. Please try again.';
      setError(errorMessage);
      console.error('Error loading notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (noteData: { title: string; content: string }) => {
    try {
      setError('');
      const newNote = await noteService.createNote(noteData);
      setNotes([newNote, ...notes]);
      setShowForm(false);
      setSuccessMessage('✅ Note created successfully!');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to create note. Please try again.';
      setError(errorMessage);
      console.error('Error creating note:', err);
      throw err;
    }
  };

  const handleUpdateNote = async (id: number, noteData: { title: string; content: string }) => {
    try {
      setError('');
      const updatedNote = await noteService.updateNote(id, noteData);
      setNotes(notes.map(note => note.id === id ? updatedNote : note));
      setEditingNote(null);
      setSuccessMessage('✅ Note updated successfully!');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to update note. Please try again.';
      setError(errorMessage);
      console.error('Error updating note:', err);
      throw err;
    }
  };

  const handleDeleteNote = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
      return;
    }

    try {
      setError('');
      await noteService.deleteNote(id);
      setNotes(notes.filter(note => note.id !== id));
      setSuccessMessage('✅ Note deleted successfully!');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to delete note. Please try again.';
      setError(errorMessage);
      console.error('Error deleting note:', err);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      authService.logout();
      onLogout();
      navigate('/login');
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div style={styles.loading}>🔄 Loading your notes...</div>;
  }

  return (
    <div style={styles.dashboard}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.titleSection}>
            <span style={styles.icon}>📝</span>
            <h1 style={styles.headerTitle}>Lanesra Note</h1>
          </div>
          <div style={styles.userInfo}>
            <span style={styles.welcomeText}>👋 Welcome, {user?.username}!</span>
            <button 
              onClick={handleLogout} 
              style={styles.logoutButton(hoveredLogout)}
              onMouseEnter={() => setHoveredLogout(true)}
              onMouseLeave={() => setHoveredLogout(false)}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div style={styles.content}>
        <div style={styles.controls}>
          <div style={styles.searchContainer}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search notes by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput(searchFocused)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
          <button
            onClick={() => setShowForm(true)}
            style={styles.addButton(hoveredAdd)}
            onMouseEnter={() => setHoveredAdd(true)}
            onMouseLeave={() => setHoveredAdd(false)}
          >
            ➕ Add New Note
          </button>
        </div>

        {error && (
          <div style={styles.errorMessage}>
            ⚠️ {error}
          </div>
        )}

        {successMessage && (
          <div style={styles.successMessage}>
            ✅ {successMessage}
          </div>
        )}

        {showForm && (
          <NoteForm
            onSubmit={handleCreateNote}
            onCancel={() => setShowForm(false)}
          />
        )}

        {editingNote && (
          <NoteForm
            note={editingNote}
            onSubmit={(data) => handleUpdateNote(editingNote.id, data)}
            onCancel={() => setEditingNote(null)}
          />
        )}

        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <span style={styles.statIcon}>📊</span>
            <div>
              <p style={styles.statText}>Total Notes</p>
              <p style={styles.statNumber}>{notes.length}</p>
            </div>
          </div>
          {searchTerm && (
            <div style={styles.statCard}>
              <span style={styles.statIcon}>🔍</span>
              <div>
                <p style={styles.statText}>Search Results</p>
                <p style={styles.statNumber}>{filteredNotes.length}</p>
              </div>
            </div>
          )}
        </div>

        <div style={styles.notesGrid}>
          {filteredNotes.length === 0 ? (
            <div style={styles.noNotes}>
              {searchTerm 
                ? '🔍 No notes match your search. Try different keywords.' 
                : '📝 No notes yet. Click "Add New Note" to create your first note!'}
            </div>
          ) : (
            filteredNotes.map(note => (
              <NoteItem
                key={note.id}
                note={note}
                onEdit={() => setEditingNote(note)}
                onDelete={() => handleDeleteNote(note.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
