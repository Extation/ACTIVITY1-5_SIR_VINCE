import axios from 'axios';
import { Task, CreateTaskDto, UpdateTaskDto } from '../types/Task';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  // Get all tasks
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>('/tasks');
    return response.data;
  },

  // Get a single task by ID
  getTaskById: async (id: number): Promise<Task> => {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  // Create a new task
  createTask: async (taskData: CreateTaskDto): Promise<Task> => {
    const response = await api.post<Task>('/tasks', taskData);
    return response.data;
  },

  // Update a task
  updateTask: async (id: number, taskData: UpdateTaskDto): Promise<Task> => {
    const response = await api.patch<Task>(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Delete a task
  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  // Toggle task completion status
  toggleTaskComplete: async (id: number): Promise<Task> => {
    const response = await api.patch<Task>(`/tasks/${id}/toggle`);
    return response.data;
  },
};
