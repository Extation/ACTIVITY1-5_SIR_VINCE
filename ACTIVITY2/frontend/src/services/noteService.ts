import axios from 'axios';
import { Note, CreateNoteRequest, UpdateNoteRequest, NotesStats } from '../types/Note';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const noteService = {
  async getAllNotes(): Promise<Note[]> {
    const response = await api.get<Note[]>('/notes');
    return response.data;
  },

  async getNoteById(id: number): Promise<Note> {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
  },

  async createNote(data: CreateNoteRequest): Promise<Note> {
    const response = await api.post<Note>('/notes', data);
    return response.data;
  },

  async updateNote(id: number, data: UpdateNoteRequest): Promise<Note> {
    const response = await api.patch<Note>(`/notes/${id}`, data);
    return response.data;
  },

  async deleteNote(id: number): Promise<void> {
    await api.delete(`/notes/${id}`);
  },

  async getStats(): Promise<NotesStats> {
    const response = await api.get<NotesStats>('/notes/stats');
    return response.data;
  },
};
