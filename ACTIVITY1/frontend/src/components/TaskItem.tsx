import React, { useState } from 'react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const styles = {
  taskItem: (completed: boolean, hovered: boolean) => ({
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '16px',
    boxShadow: hovered ? '0 8px 24px rgba(0, 0, 0, 0.12)' : '0 2px 8px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '20px',
    opacity: completed ? 0.65 : 1,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid #f0f0f0',
    transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
  }) as React.CSSProperties,
  taskContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  } as React.CSSProperties,
  taskHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  } as React.CSSProperties,
  checkbox: {
    width: '22px',
    height: '22px',
    cursor: 'pointer',
    flexShrink: 0,
    accentColor: '#1e3c72',
  } as React.CSSProperties,
  taskTitle: (completed: boolean) => ({
    margin: 0,
    fontSize: '17px',
    fontWeight: '600',
    color: completed ? '#999' : '#333',
    textDecoration: completed ? 'line-through' : 'none',
    wordBreak: 'break-word' as const,
    lineHeight: '1.4',
  }) as React.CSSProperties,
  taskDescription: (completed: boolean) => ({
    margin: 0,
    fontSize: '14px',
    color: completed ? '#aaa' : '#666',
    lineHeight: '1.6',
    paddingLeft: '36px',
  }) as React.CSSProperties,
  taskMeta: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '16px',
    paddingLeft: '36px',
    fontSize: '12px',
    color: '#999',
  } as React.CSSProperties,
  taskDate: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    backgroundColor: '#f5f5f5',
    borderRadius: '6px',
    fontWeight: '500',
  } as React.CSSProperties,
  taskActions: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
    flexShrink: 0,
  } as React.CSSProperties,
  btnEdit: (disabled: boolean, hovered: boolean) => ({
    padding: '10px 20px',
    fontSize: '13px',
    fontWeight: '600',
    color: disabled ? '#ccc' : '#ffffff',
    background: disabled 
      ? '#f0f0f0' 
      : (hovered ? 'linear-gradient(135deg, #1a3461 0%, #244785 100%)' : 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'),
    border: 'none',
    borderRadius: '10px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: disabled ? 0.5 : 1,
    boxShadow: disabled ? 'none' : (hovered ? '0 4px 12px rgba(30, 60, 114, 0.4)' : '0 2px 8px rgba(30, 60, 114, 0.3)'),
    transform: hovered && !disabled ? 'translateY(-2px)' : 'translateY(0)',
  }) as React.CSSProperties,
  btnDelete: (hovered: boolean) => ({
    padding: '10px 20px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: hovered ? '#e53935' : '#f44336',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: hovered ? '0 4px 12px rgba(244, 67, 54, 0.4)' : '0 2px 8px rgba(244, 67, 54, 0.3)',
    transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
  }) as React.CSSProperties,
  completedBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 12px',
    backgroundColor: '#4caf50',
    color: '#ffffff',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
    marginLeft: '12px',
  } as React.CSSProperties,
};

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div 
      style={styles.taskItem(task.completed, hoveredCard)}
      onMouseEnter={() => setHoveredCard(true)}
      onMouseLeave={() => setHoveredCard(false)}
    >
      <div style={styles.taskContent}>
        <div style={styles.taskHeader}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            style={styles.checkbox}
          />
          <h3 style={styles.taskTitle(task.completed)}>
            {task.title}
          </h3>
          {task.completed && (
            <span style={styles.completedBadge}>
              ✓ Done
            </span>
          )}
        </div>
        {task.description && (
          <p style={styles.taskDescription(task.completed)}>
            {task.description}
          </p>
        )}
        <div style={styles.taskMeta}>
          <span style={styles.taskDate}>
            📅 {formatDate(task.createdAt)}
          </span>
          {task.updatedAt !== task.createdAt && (
            <span style={styles.taskDate}>
              🔄 {formatDate(task.updatedAt)}
            </span>
          )}
        </div>
      </div>
      <div style={styles.taskActions}>
        <button
          onClick={() => onEdit(task)}
          style={styles.btnEdit(task.completed, hoveredBtn === 'edit')}
          disabled={task.completed}
          onMouseEnter={() => setHoveredBtn('edit')}
          onMouseLeave={() => setHoveredBtn(null)}
          title={task.completed ? 'Cannot edit completed task' : 'Edit task'}
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          style={styles.btnDelete(hoveredBtn === 'delete')}
          onMouseEnter={() => setHoveredBtn('delete')}
          onMouseLeave={() => setHoveredBtn(null)}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
