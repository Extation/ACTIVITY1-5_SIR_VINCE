import axios from 'axios';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../types/User';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  console.log('🔵 Axios Request Interceptor');
  console.log('  → URL:', config.url);
  console.log('  → Method:', config.method);
  console.log('  → Headers:', config.headers);
  console.log('  → Data (before send):', config.data);
  console.log('  → Data type:', typeof config.data);
  
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Ensure Content-Type is set
  if (config.headers && !config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }
  
  console.log('  → Final headers:', config.headers);
  console.log('  → Final data:', config.data);
  
  return config;
}, (error) => {
  console.error('❌ Request interceptor error:', error);
  return Promise.reject(error);
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

export const authService = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    console.log('Registering with data:', data);
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    console.log('🟢 ===== AuthService.login() CALLED =====');
    console.log('📥 Received data:', {
      username: data.username,
      usernameLength: data.username?.length,
      usernameType: typeof data.username,
      passwordLength: data.password?.length,
      passwordType: typeof data.password,
      dataKeys: Object.keys(data)
    });
    
    console.log('🌐 Making POST request to:', `${API_BASE_URL}/auth/login`);
    console.log('📨 Request payload:', JSON.stringify(data));
    
    try {
      const response = await api.post<AuthResponse>('/auth/login', data);
      console.log('✅ API Response received:', {
        status: response.status,
        statusText: response.statusText,
        hasData: !!response.data,
        hasToken: !!response.data?.access_token,
        username: response.data?.user?.username
      });
      return response.data;
    } catch (error: any) {
      console.error('❌ API Request failed');
      if (error.response) {
        console.error('Response error:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          headers: error.response.headers
        });
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Request setup error:', error.message);
      }
      console.log('🟢 ===== AuthService.login() FAILED =====\n');
      throw error;
    }
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  setAuth(authResponse: AuthResponse): void {
    localStorage.setItem('token', authResponse.access_token);
    localStorage.setItem('user', JSON.stringify(authResponse.user));
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  async requestPasswordReset(data: { email: string }): Promise<{ message: string }> {
    console.log('🔑 Requesting password reset for:', data.email);
    const response = await api.post<{ message: string }>('/auth/forgot-password', data);
    return response.data;
  },

  async verifyResetCode(data: { email: string; code: string }): Promise<{ message: string; valid: boolean }> {
    console.log('🔍 Verifying reset code for:', data.email);
    const response = await api.post<{ message: string; valid: boolean }>('/auth/verify-reset-code', data);
    return response.data;
  },

  async resetPassword(data: { email: string; code: string; newPassword: string }): Promise<{ message: string }> {
    console.log('🔐 Resetting password for:', data.email);
    const response = await api.post<{ message: string }>('/auth/reset-password', data);
    return response.data;
  },
};
