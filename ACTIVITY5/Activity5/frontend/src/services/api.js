import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3005';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
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

// Auth API
export const authAPI = {
  register: (userData) => api.post('/api/auth/register', userData),
  login: (credentials) => api.post('/api/auth/login', credentials),
};

// Posts API
export const postsAPI = {
  getAllPosts: (page = 1, limit = 10) => api.get(`/api/posts?page=${page}&limit=${limit}`),
  getPost: (id) => api.get(`/api/posts/${id}`),
  createPost: (formData, imageFile = null) => {
    if (imageFile || (formData instanceof FormData)) {
      const data = formData instanceof FormData ? formData : new FormData();
      if (!(formData instanceof FormData)) {
        data.append('title', formData.title);
        data.append('content', formData.content);
        if (imageFile) {
          data.append('image', imageFile);
        }
      }
      return api.post('/api/posts', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      return api.post('/api/posts', formData);
    }
  },
  updatePost: (id, postData) => {
    // Check if postData is FormData (contains file upload)
    if (postData instanceof FormData) {
      return api.patch(`/api/posts/${id}`, postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
    return api.patch(`/api/posts/${id}`, postData);
  },
  deletePost: (id) => api.delete(`/api/posts/${id}`),
  getPostsByAuthor: (authorId) => api.get(`/api/posts/author/${authorId}`),
};

// Comments API
export const commentsAPI = {
  getAllComments: () => api.get('/api/comments'),
  getCommentsByPost: (postId) => api.get(`/api/comments/post/${postId}`),
  createComment: (commentData) => api.post('/api/comments', commentData),
  updateComment: (id, commentData) => api.patch(`/api/comments/${id}`, commentData),
  deleteComment: (id) => api.delete(`/api/comments/${id}`),
  getCommentsByAuthor: (authorId) => api.get(`/api/comments/author/${authorId}`),
};

// Users API
export const usersAPI = {
  getAllUsers: () => api.get('/api/users'),
  getUser: (id) => api.get(`/api/users/${id}`),
  updateUser: (id, userData) => api.patch(`/api/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/api/users/${id}`),
  getUserActivity: (id) => api.get(`/api/users/${id}/activity`),
};

export default api;
