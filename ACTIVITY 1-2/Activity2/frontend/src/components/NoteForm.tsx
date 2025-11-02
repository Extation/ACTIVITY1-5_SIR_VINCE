import React, { useState, useEffect } from 'react';
import { Note } from '../types/Note';

interface NoteFormProps {
  note?: Note;
  onSubmit: (data: { title: string; content: string }) => Promise<void>;
  onCancel: () => void;
}

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(8px)',
    padding: '20px',
    animation: 'fadeIn 0.2s ease-out',
  } as React.CSSProperties,
  container: {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
    maxWidth: '700px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' as const,
    animation: 'slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  } as React.CSSProperties,
  header: {
    background: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
    padding: '28px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  } as React.CSSProperties,
  headerTitle: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '800',
    color: '#ffffff',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  } as React.CSSProperties,
  closeButton: (hovered: boolean) => ({
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: hovered ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)',
    color: '#ffffff',
    fontSize: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    transform: hovered ? 'rotate(90deg) scale(1.1)' : 'rotate(0deg) scale(1)',
    fontWeight: '300',
  }) as React.CSSProperties,
  form: {
    padding: '32px',
    overflowY: 'auto' as const,
    flex: 1,
  } as React.CSSProperties,
  formGroup: {
    marginBottom: '28px',
  } as React.CSSProperties,
  labelContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  } as React.CSSProperties,
  label: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#1a202c',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  } as React.CSSProperties,
  charCount: (current: number, max: number) => {
    const percentage = (current / max) * 100;
    let color = '#48bb78'; // Green
    let bgColor = '#f0fff4';
    
    if (percentage >= 90) {
      color = '#c53030'; // Red
      bgColor = '#fff5f5';
    } else if (percentage >= 75) {
      color = '#dd6b20'; // Orange
      bgColor = '#fffaf0';
    }
    
    return {
      fontSize: '12px',
      fontWeight: '700',
      color: color,
      backgroundColor: bgColor,
      padding: '4px 12px',
      borderRadius: '20px',
      border: `1px solid ${color}33`,
    } as React.CSSProperties;
  },
  input: (focused: boolean, disabled: boolean) => ({
    width: '100%',
    padding: '16px 20px',
    fontSize: '16px',
    border: focused ? '2px solid #2193b0' : '2px solid #e2e8f0',
    borderRadius: '12px',
    outline: 'none',
    backgroundColor: disabled ? '#f7fafc' : '#ffffff',
    color: '#1a202c',
    transition: 'all 0.3s',
    boxShadow: focused ? '0 0 0 4px rgba(33, 147, 176, 0.1)' : 'none',
    cursor: disabled ? 'not-allowed' : 'text',
  }) as React.CSSProperties,
  textarea: (focused: boolean, disabled: boolean) => ({
    width: '100%',
    padding: '16px 20px',
    fontSize: '15px',
    border: focused ? '2px solid #2193b0' : '2px solid #e2e8f0',
    borderRadius: '12px',
    outline: 'none',
    backgroundColor: disabled ? '#f7fafc' : '#ffffff',
    color: '#1a202c',
    resize: 'vertical' as const,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    lineHeight: '1.6',
    minHeight: '250px',
    transition: 'all 0.3s',
    boxShadow: focused ? '0 0 0 4px rgba(33, 147, 176, 0.1)' : 'none',
    cursor: disabled ? 'not-allowed' : 'text',
  }) as React.CSSProperties,
  errorMessage: {
    backgroundColor: '#fff5f5',
    color: '#c53030',
    padding: '14px 20px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '24px',
    border: '2px solid #fc8181',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  } as React.CSSProperties,
  actions: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'flex-end',
    paddingTop: '24px',
    borderTop: '2px solid #f7fafc',
  } as React.CSSProperties,
  cancelButton: (hovered: boolean, disabled: boolean) => ({
    padding: '14px 32px',
    fontSize: '15px',
    fontWeight: '700',
    color: disabled ? '#a0aec0' : '#4a5568',
    backgroundColor: hovered && !disabled ? '#f7fafc' : '#ffffff',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s',
    transform: hovered && !disabled ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: hovered && !disabled ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
    opacity: disabled ? 0.5 : 1,
  }) as React.CSSProperties,
  submitButton: (hovered: boolean, disabled: boolean) => ({
    padding: '14px 32px',
    fontSize: '15px',
    fontWeight: '700',
    color: '#ffffff',
    background: disabled 
      ? '#cbd5e0' 
      : (hovered 
        ? 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)' 
        : 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)'),
    border: 'none',
    borderRadius: '12px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s',
    transform: hovered && !disabled ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: hovered && !disabled 
      ? '0 8px 20px rgba(33, 147, 176, 0.4)' 
      : '0 4px 12px rgba(33, 147, 176, 0.3)',
  }) as React.CSSProperties,
};

const NoteForm: React.FC<NoteFormProps> = ({ note, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [originalData, setOriginalData] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hoveredClose, setHoveredClose] = useState(false);
  const [hoveredCancel, setHoveredCancel] = useState(false);
  const [hoveredSubmit, setHoveredSubmit] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (note) {
      const data = {
        title: note.title,
        content: note.content,
      };
      setFormData(data);
      setOriginalData(data);
    }
  }, [note]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user types
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    
    if (formData.title.length > 100) {
      setError('Title must be 100 characters or less');
      return false;
    }

    if (!formData.content.trim()) {
      setError('Content is required');
      return false;
    }

    if (formData.content.length > 5000) {
      setError('Content must be 5000 characters or less');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await onSubmit({
        title: formData.title.trim(),
        content: formData.content.trim(),
      });
      
      if (!note) {
        setFormData({ title: '', content: '' });
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setError('Failed to save note. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (formData.title || formData.content) {
      if (window.confirm('Are you sure you want to discard your changes?')) {
        onCancel();
      }
    } else {
      onCancel();
    }
  };

  const characterCount = {
    title: formData.title.length,
    content: formData.content.length,
  };

  // Check if form data has changed from original (for edit mode)
  const hasChanges = note 
    ? (formData.title !== originalData.title || formData.content !== originalData.content)
    : true; // For create mode, always allow submission if fields are filled

  const isSubmitDisabled = loading || !hasChanges || !formData.title.trim() || !formData.content.trim();

  return (
    <div style={styles.overlay} onClick={handleCancel}>
      <div style={styles.container} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h3 style={styles.headerTitle}>
            {note ? '✏️ Edit Note' : '📝 Create New Note'}
          </h3>
          <button 
            onClick={handleCancel} 
            style={styles.closeButton(hoveredClose)}
            onMouseEnter={() => setHoveredClose(true)}
            onMouseLeave={() => setHoveredClose(false)}
            type="button"
            title="Close"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <div style={styles.labelContainer}>
              <label htmlFor="title" style={styles.label}>
                Title
              </label>
              <span style={styles.charCount(characterCount.title, 100)}>
                {characterCount.title}/100
              </span>
            </div>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Enter a catchy title for your note..."
              maxLength={100}
              style={styles.input(focusedField === 'title', loading)}
              onFocus={() => setFocusedField('title')}
              onBlur={() => setFocusedField(null)}
            />
          </div>
          <div style={styles.formGroup}>
            <div style={styles.labelContainer}>
              <label htmlFor="content" style={styles.label}>
                Content
              </label>
              <span style={styles.charCount(characterCount.content, 5000)}>
                {characterCount.content}/5000
              </span>
            </div>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Write your note content here... Be as detailed as you'd like!"
              rows={12}
              maxLength={5000}
              style={styles.textarea(focusedField === 'content', loading)}
              onFocus={() => setFocusedField('content')}
              onBlur={() => setFocusedField(null)}
            />
          </div>
          {error && (
            <div style={styles.errorMessage}>
              ⚠️ {error}
            </div>
          )}
          <div style={styles.actions}>
            <button 
              type="button" 
              onClick={handleCancel} 
              disabled={loading}
              style={styles.cancelButton(hoveredCancel, loading)}
              onMouseEnter={() => setHoveredCancel(true)}
              onMouseLeave={() => setHoveredCancel(false)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitDisabled}
              style={styles.submitButton(hoveredSubmit, isSubmitDisabled)}
              onMouseEnter={() => setHoveredSubmit(true)}
              onMouseLeave={() => setHoveredSubmit(false)}
            >
              {loading ? '💾 Saving...' : (note ? '✅ Update Note' : '✅ Create Note')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
