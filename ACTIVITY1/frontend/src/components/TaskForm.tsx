import React, { useState, useEffect } from 'react';
import { Task, CreateTaskDto, UpdateTaskDto } from '../types/Task';

interface TaskFormProps {
  task?: Task;
  onSubmit: (taskData: CreateTaskDto | UpdateTaskDto) => void | Promise<any>;
  onCancel: () => void;
  isEditing?: boolean;
}

const styles = {
  container: {
    marginBottom: '32px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '28px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #f0f0f0',
  } as React.CSSProperties,
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  } as React.CSSProperties,
  title: {
    margin: '0 0 8px 0',
    fontSize: '24px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  } as React.CSSProperties,
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  } as React.CSSProperties,
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    letterSpacing: '0.3px',
  } as React.CSSProperties,
  input: {
    padding: '14px 16px',
    fontSize: '15px',
    border: '2px solid #e8e8e8',
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backgroundColor: '#fafafa',
  } as React.CSSProperties,
  inputFocus: {
    borderColor: '#1e3c72',
    backgroundColor: '#ffffff',
    boxShadow: '0 0 0 4px rgba(30, 60, 114, 0.1)',
  } as React.CSSProperties,
  textarea: {
    padding: '14px 16px',
    fontSize: '15px',
    border: '2px solid #e8e8e8',
    borderRadius: '12px',
    outline: 'none',
    resize: 'vertical' as const,
    fontFamily: 'inherit',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backgroundColor: '#fafafa',
    minHeight: '100px',
  } as React.CSSProperties,
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '15px',
    color: '#555',
    cursor: 'pointer',
    padding: '12px',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    transition: 'background-color 0.2s',
  } as React.CSSProperties,
  checkbox: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    accentColor: '#1e3c72',
  } as React.CSSProperties,
  actions: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
  } as React.CSSProperties,
  btnPrimary: (hovered: boolean, disabled: boolean) => ({
    flex: 1,
    padding: '14px 24px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff',
    background: disabled 
      ? '#cccccc'
      : (hovered ? 'linear-gradient(135deg, #1a3461 0%, #244785 100%)' : 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'),
    border: 'none',
    borderRadius: '12px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: disabled ? 'none' : (hovered ? '0 8px 20px rgba(30, 60, 114, 0.4)' : '0 4px 15px rgba(30, 60, 114, 0.3)'),
    transform: hovered && !disabled ? 'translateY(-2px)' : 'translateY(0)',
  }) as React.CSSProperties,
  btnSecondary: (hovered: boolean) => ({
    flex: 1,
    padding: '14px 24px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#666',
    backgroundColor: hovered ? '#e8e8e8' : '#f5f5f5',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
  }) as React.CSSProperties,
};

const TaskForm: React.FC<TaskFormProps> = ({
  task,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setCompleted(task.completed);
    } else {
      setTitle('');
      setDescription('');
      setCompleted(false);
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim() || undefined,
      completed,
    };

    setSubmitting(true);
    try {
      await onSubmit(taskData);

      if (!isEditing) {
        setTitle('');
        setDescription('');
        setCompleted(false);
      }
    } catch (err) {
      console.error('Failed to submit task:', err);
      alert('Failed to submit task. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setCompleted(false);
    onCancel();
  };

  const isUnchanged = isEditing && task && (
    (task.title === title.trim() || (task.title === '' && title.trim() === '')) &&
    ( (task.description || '') === description.trim() ) &&
    task.completed === completed
  );

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3 style={styles.title}>
          {isEditing ? '✏️ Edit Task' : '➕ Add New Task'}
        </h3>
        
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              ...styles.input,
              ...(focusedField === 'title' ? styles.inputFocus : {}),
            }}
            placeholder="Enter task title..."
            required
            onFocus={() => setFocusedField('title')}
            onBlur={() => setFocusedField(null)}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              ...styles.textarea,
              ...(focusedField === 'description' ? styles.inputFocus : {}),
            }}
            placeholder="Enter task description (optional)..."
            onFocus={() => setFocusedField('description')}
            onBlur={() => setFocusedField(null)}
          />
        </div>

        {isEditing && (
          <div style={styles.formGroup}>
            <label 
              style={{
                ...styles.checkboxLabel,
                backgroundColor: completed ? 'rgba(30, 60, 114, 0.1)' : '#f9f9f9',
              }}
            >
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                style={styles.checkbox}
              />
              <span style={{ fontWeight: '500' }}>Mark as completed</span>
            </label>
          </div>
        )}

        <div style={styles.actions}>
          <button
            type="submit"
            disabled={submitting || Boolean(isUnchanged)}
            title={isUnchanged ? 'No changes to save' : undefined}
            style={styles.btnPrimary(hoveredBtn === 'primary', submitting || Boolean(isUnchanged))}
            onMouseEnter={() => setHoveredBtn('primary')}
            onMouseLeave={() => setHoveredBtn(null)}
          >
            {submitting ? (isEditing ? 'Saving...' : 'Adding...') : (isEditing ? (isUnchanged ? 'No changes' : '💾 Update Task') : '➕ Add Task')}
          </button>
          {isEditing && (
            <button 
              type="button" 
              onClick={handleCancel} 
              style={styles.btnSecondary(hoveredBtn === 'secondary')}
              onMouseEnter={() => setHoveredBtn('secondary')}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              ❌ Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
