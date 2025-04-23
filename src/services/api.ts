
import axios from 'axios';
import { 
  Company, 
  Task, 
  User, 
  Comment, 
  TaskStatus,
  AuthResponse
} from '@/types';

// API base URL
const API_URL = 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authentication interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface ApiErrorResponse {
  message: string;
  status: number;
}

export const isApiError = (error: any): error is ApiErrorResponse => {
  if (axios.isAxiosError(error)) {
    return true;
  }
  return false;
};

// Auth services
export const authService = {
  register: async (userData: { email: string; password: string; firstName: string; lastName: string }) => {
    try {
      const response = await api.post<AuthResponse>('/auth/register', userData);
      return response.data;
    } catch (error) {
      if (isApiError(error)) {
        return error;
      }
      throw error;
    }
  },

  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      localStorage.setItem('authToken', response.data.token);
      return response.data;
    } catch (error) {
      if (isApiError(error)) {
        return error;
      }
      throw error;
    }
  },

  resetPassword: async (email: string) => {
    try {
      const response = await api.post('/auth/reset-password', { email });
      return response.data;
    } catch (error) {
      if (isApiError(error)) {
        return error;
      }
      throw error;
    }
  }
};

// User services
export const userService = {
  getCurrentUser: async () => {
    try {
      const response = await api.get<User>('/users/current');
      return response.data;
    } catch (error) {
      if (isApiError(error)) {
        return error;
      }
      throw error;
    }
  }
};

// Company services
export const companyService = {
  getCompanies: async () => {
    try {
      const response = await api.get<Company[]>('/companies');
      return response.data;
    } catch (error) {
      if (isApiError(error)) {
        return error;
      }
      throw error;
    }
  },

  getCompany: async (id: string) => {
    try {
      const response = await api.get<Company>(`/companies/${id}`);
      return response.data;
    } catch (error) {
      if (isApiError(error)) {
        return error;
      }
      throw error;
    }
  },

  createCompany: async (data: { name: string; description?: string }) => {
    try {
      const response = await api.post<Company>('/companies', data);
      return response.data;
    } catch (error) {
      if (isApiError(error)) {
        return error;
      }
      throw error;
    }
  },

  updateCompany: async (id: string, data: { name: string; description?: string }) => {
    try {
      const response = await api.put<Company>(`/companies/${id}`, data);
      return response.data;
    } catch (error) {
      if (isApiError(error)) {
        return error;
      }
      throw error;
    }
  },

  deleteCompany: async (id: string) => {
    try {
      const response = await api.delete(`/companies/${id}`);
      return response.data;
    } catch (error) {
      if (isApiError(error)) {
        return error;
      }
      throw error;
    }
  }
};

// Task services
export const taskService = {
  getTasks: async (companyId: string) => {
    try {
      const response = await api.get<Task[]>(`/tasks/company/${companyId}`);
      return response.data;
    } catch (error) {
      if (isApiError(error)) {
        return error;
      }
      throw error;
    }
  },

  getTask: async (taskId: string) => {
    try {
      const response = await api.get<Task>(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      if (isApiError(error)) {
        return error;
      }
      throw error;
    }
  },

  createTask: async (data: { 
    title: string; 
    description?: string; 
    companyId: string;
    assignedTo?: string;
  }) => {
    try {
      const response = await api.post<Task>('/tasks', data);
      return response.data;
    } catch (error) {
      if (isApiError(error)) {
        return error;
      }
      throw error;
    }
  },

  updateTask: async (taskId: string, data: {
    title?: string;
    description?: string;
    assignedTo?: string;
  }) => {
    try {
      const response = await api.put<Task>(`/tasks/${taskId}`, data);
      return response.data;
    } catch (error) {
      if (isApiError(error)) {
        return error;
      }
      throw error;
    }
  },

  updateTaskStatus: async (taskId: string, status: TaskStatus) => {
    try {
      const response = await api.patch<Task>(`/tasks/${taskId}/status`, { status });
      return response.data;
    } catch (error) {
      if (isApiError(error)) {
        return error;
      }
      throw error;
    }
  },

  deleteTask: async (taskId: string) => {
    try {
      const response = await api.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      if (isApiError(error)) {
        return error;
      }
      throw error;
    }
  }
};

// Comment services
export const commentService = {
  getComments: async (taskId: string) => {
    try {
      const response = await api.get<Comment[]>(`/comments/task/${taskId}`);
      return response.data;
    } catch (error) {
      if (isApiError(error)) {
        return error;
      }
      throw error;
    }
  },

  createComment: async (data: { content: string; taskId: string }) => {
    try {
      const response = await api.post<Comment>('/comments', data);
      return response.data;
    } catch (error) {
      if (isApiError(error)) {
        return error;
      }
      throw error;
    }
  },

  updateComment: async (commentId: string, content: string) => {
    try {
      const response = await api.put<Comment>(`/comments/${commentId}`, { content });
      return response.data;
    } catch (error) {
      if (isApiError(error)) {
        return error;
      }
      throw error;
    }
  },

  deleteComment: async (commentId: string) => {
    try {
      const response = await api.delete(`/comments/${commentId}`);
      return response.data;
    } catch (error) {
      if (isApiError(error)) {
        return error;
      }
      throw error;
    }
  }
};

export { api };
