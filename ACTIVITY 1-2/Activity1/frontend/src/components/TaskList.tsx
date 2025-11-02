import React, { useState, useEffect } from 'react';
import { Task, CreateTaskDto, UpdateTaskDto } from '../types/Task';
import { taskService } from '../services/taskService';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import ConfirmModal from './ConfirmModal';

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 20px',
  } as React.CSSProperties,
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
  } as React.CSSProperties,
  header: {
    marginBottom: '40px',
    textAlign: 'center' as const,
  } as React.CSSProperties,
  title: {
    fontSize: '42px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '20px',
  } as React.CSSProperties,
  stats: (visible: boolean) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginTop: '20px',
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(-10px)',
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  }) as React.CSSProperties,
  stat: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    borderRadius: '30px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff',
    boxShadow: '0 4px 15px rgba(30, 60, 114, 0.4)',
    transition: 'transform 0.2s',
  } as React.CSSProperties,
  loading: {
    textAlign: 'center' as const,
    padding: '60px',
    fontSize: '18px',
    color: '#ffffff',
    fontWeight: '500',
  } as React.CSSProperties,
  error: {
    backgroundColor: '#ff5252',
    color: '#ffffff',
    padding: '16px 20px',
    borderRadius: '12px',
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(255, 82, 82, 0.3)',
  } as React.CSSProperties,
  retryBtn: {
    padding: '8px 16px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'all 0.2s',
  } as React.CSSProperties,
  successMessage: {
    backgroundColor: '#4caf50',
    color: '#ffffff',
    padding: '14px 20px',
    borderRadius: '12px',
    marginBottom: '20px',
    fontSize: '14px',
    fontWeight: '500',
    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
    animation: 'slideIn 0.3s ease-out',
  } as React.CSSProperties,
  filters: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '32px',
    padding: '8px',
    backgroundColor: '#f5f5f5',
    borderRadius: '16px',
  } as React.CSSProperties,
  filterBtn: (active: boolean, hovered: boolean) => ({
    padding: '12px 28px',
    fontSize: '14px',
    fontWeight: '600',
    color: active ? '#ffffff' : '#666',
    background: active 
      ? 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
      : (hovered ? '#ffffff' : 'transparent'),
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: active ? '0 4px 15px rgba(30, 60, 114, 0.4)' : 'none',
    transform: hovered && !active ? 'translateY(-2px)' : 'translateY(0)',
  }) as React.CSSProperties,
  tasksContainer: {
    marginTop: '24px',
  } as React.CSSProperties,
  noTasks: {
    textAlign: 'center' as const,
    padding: '60px 40px',
    fontSize: '16px',
    color: '#999',
    backgroundColor: '#f9f9f9',
    borderRadius: '16px',
    border: '2px dashed #ddd',
  } as React.CSSProperties,
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [showStats, setShowStats] = useState(true);
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await taskService.getAllTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to load tasks. Please make sure the backend server is running.');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: CreateTaskDto) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      setError(null);
      return newTask;
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
      throw err;
    }
  };

  const handleUpdateTask = async (taskData: UpdateTaskDto) => {
    if (!editingTask) return;

    try {
      const updatedTask = await taskService.updateTask(editingTask.id, taskData);
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id ? updatedTask : task
      ));
      setEditingTask(null);
      setError(null);
      setSuccessMessage('✓ Task updated successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const handleToggleComplete = async (id: number) => {
    try {
      const updatedTask = await taskService.toggleTaskComplete(id);
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ));
      setError(null);
    } catch (err) {
      setError('Failed to toggle task completion');
      console.error('Error toggling task:', err);
    }
  };

  const handleDeleteTask = (id: number) => {
    setTaskToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (taskToDelete === null) return;

    try {
      await taskService.deleteTask(taskToDelete);
      setTasks(prev => prev.filter(task => task.id !== taskToDelete));
      setError(null);
      setShowDeleteModal(false);
      setTaskToDelete(null);
      setSuccessMessage('✓ Task deleted successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
      setShowDeleteModal(false);
      setTaskToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    active: tasks.filter(task => !task.completed).length,
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading your tasks...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <ConfirmModal
        isOpen={showDeleteModal}
        title=""
        message="Are you sure you want to delete this task?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      
      <div style={styles.card}>
        <header style={styles.header}>
          <div style={styles.title}>
            📝 Lanesra To-Do List
          </div>
          <div style={styles.stats(showStats)}>
            <span style={styles.stat}>
              Total: {taskStats.total}
            </span>
            <span style={styles.stat}>
              Active: {taskStats.active}
            </span>
            <span style={styles.stat}>
              Completed: {taskStats.completed}
            </span>
          </div>
        </header>

        {error && (
          <div style={styles.error}>
            <span>⚠️ {error}</span>
            <button onClick={loadTasks} style={styles.retryBtn}>
              Retry
            </button>
          </div>
        )}

        {successMessage && (
          <div style={styles.successMessage}>
            {successMessage}
          </div>
        )}

        {editingTask ? (
          <TaskForm
            task={editingTask}
            onSubmit={(taskData) => handleUpdateTask(taskData as UpdateTaskDto)}
            onCancel={handleCancelEdit}
            isEditing={true}
          />
        ) : (
          <TaskForm
            onSubmit={(taskData) => handleCreateTask(taskData as CreateTaskDto)}
            onCancel={() => {}}
          />
        )}

        <div style={styles.filters}>
          <button
            style={styles.filterBtn(filter === 'all', hoveredFilter === 'all')}
            onClick={() => setFilter('all')}
            onMouseEnter={() => setHoveredFilter('all')}
            onMouseLeave={() => setHoveredFilter(null)}
          >
            All ({taskStats.total})
          </button>
          <button
            style={styles.filterBtn(filter === 'active', hoveredFilter === 'active')}
            onClick={() => setFilter('active')}
            onMouseEnter={() => setHoveredFilter('active')}
            onMouseLeave={() => setHoveredFilter(null)}
          >
            Active ({taskStats.active})
          </button>
          <button
            style={styles.filterBtn(filter === 'completed', hoveredFilter === 'completed')}
            onClick={() => setFilter('completed')}
            onMouseEnter={() => setHoveredFilter('completed')}
            onMouseLeave={() => setHoveredFilter(null)}
          >
            Completed ({taskStats.completed})
          </button>
        </div>

        <div style={styles.tasksContainer}>
          {filteredTasks.length === 0 ? (
            <div style={styles.noTasks}>
              {filter === 'all' 
                ? '🎯 No tasks yet. Add your first task above!' 
                : `📋 No ${filter} tasks.`
              }
            </div>
          ) : (
            filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
