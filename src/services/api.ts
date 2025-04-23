
import axios from 'axios';
import { 
  Company, 
  Task, 
  User, 
  Comment, 
  Invitation, 
  TaskStatus,
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
  return error && typeof error === 'object' && 'message' in error;
};

// Error handler helper
const handleApiError = (error: any): ApiErrorResponse => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.message || 'An unexpected error occurred',
      status: error.response?.status || 500
    };
  }
  return { message: 'An unexpected error occurred', status: 500 };
};

// Auth services
export const authService = {
  register: async (userData: { email: string; password: string; firstName: string; lastName: string }) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      localStorage.setItem('authToken', response.data.token);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
  },

  resetPassword: async (email: string) => {
    try {
      const response = await api.post('/auth/reset-password', { email });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
};

// User services
export const userService = {
  getCurrentUser: async () => {
    try {
      const response = await api.get('/users/current');
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
};

// Company services
export const companyService = {
  getCompanies: async () => {
    try {
      const response = await api.get('/companies');
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  getCompany: async (id: string) => {
    try {
      const response = await api.get(`/companies/${id}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  createCompany: async (data: { name: string; description?: string }) => {
    try {
      const response = await api.post('/companies', data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  updateCompany: async (id: string, data: { name: string; description?: string }) => {
    try {
      const response = await api.put(`/companies/${id}`, data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  deleteCompany: async (id: string) => {
    try {
      const response = await api.delete(`/companies/${id}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
};

// Task services
export const taskService = {
  getTasks: async (companyId: string) => {
    try {
      const response = await api.get(`/tasks/company/${companyId}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  getTask: async (taskId: string) => {
    try {
      const response = await api.get(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  createTask: async (data: { 
    title: string; 
    description?: string; 
    companyId: string; 
    assignedTo?: string;
    priority?: string;
    dueDate?: Date;
  }) => {
    try {
      const response = await api.post('/tasks', data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  updateTask: async (taskId: string, data: {
    title?: string;
    description?: string;
    assignedTo?: string;
    priority?: string;
    dueDate?: Date;
  }) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  updateTaskStatus: async (taskId: string, status: string) => {
    try {
      const response = await api.patch(`/tasks/${taskId}/status`, { status });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  deleteTask: async (taskId: string) => {
    try {
      const response = await api.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
};

// Comment services
export const commentService = {
  getComments: async (taskId: string) => {
    try {
      const response = await api.get(`/comments/task/${taskId}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  createComment: async (data: { content: string; taskId: string }) => {
    try {
      const response = await api.post('/comments', data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  updateComment: async (commentId: string, content: string) => {
    try {
      const response = await api.put(`/comments/${commentId}`, { content });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  deleteComment: async (commentId: string) => {
    try {
      const response = await api.delete(`/comments/${commentId}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
};

export { api };
