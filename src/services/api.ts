
import axios from 'axios';
import { 
  Company, 
  Task, 
  User, 
  Comment, 
  Invitation, 
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
      const response = await api.post<AuthResponse>('/auth/register', userData);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
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
  },

  isApiError
};

// User services
export const userService = {
  getCurrentUser: async () => {
    try {
      const response = await api.get<User>('/users/current');
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  isApiError
};

// Company services
export const companyService = {
  getCompanies: async () => {
    try {
      const response = await api.get<Company[]>('/companies');
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  getCompany: async (id: string) => {
    try {
      const response = await api.get<Company>(`/companies/${id}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  createCompany: async (data: { name: string; description?: string }) => {
    try {
      const response = await api.post<Company>('/companies', data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  updateCompany: async (id: string, data: { name: string; description?: string }) => {
    try {
      const response = await api.put<Company>(`/companies/${id}`, data);
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
  },
  
  // Employee services (part of company)
  getEmployees: async (companyId: string) => {
    try {
      // This endpoint is not explicitly mentioned in the API docs,
      // but we can get company members from the company details
      const response = await api.get<Company>(`/companies/${companyId}`);
      return response.data.members.map(member => ({
        ...member.user,
        role: member.role
      }));
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // Invitation services
  getInvitations: async (companyId: string) => {
    try {
      // This endpoint is not explicitly mentioned in the API docs,
      // but we're assuming it exists based on the functionality
      const response = await api.get<Invitation[]>(`/companies/${companyId}/invitations`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  createInvitation: async (data: { email: string; companyId: string; role: string }) => {
    try {
      const response = await api.post<Invitation>(`/companies/${data.companyId}/invitations`, data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  cancelInvitation: async (invitationId: string) => {
    try {
      const response = await api.delete(`/invitations/${invitationId}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  isApiError
};

// Task services
export const taskService = {
  getTasks: async (companyId: string) => {
    try {
      const response = await api.get<Task[]>(`/tasks/company/${companyId}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  getTask: async (taskId: string) => {
    try {
      const response = await api.get<Task>(`/tasks/${taskId}`);
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
      const response = await api.post<Task>('/tasks', data);
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
      const response = await api.put<Task>(`/tasks/${taskId}`, data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  updateTaskStatus: async (taskId: string, status: TaskStatus) => {
    try {
      const response = await api.patch<Task>(`/tasks/${taskId}/status`, { status });
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
  },
  
  isApiError
};

// Comment services
export const commentService = {
  getComments: async (taskId: string) => {
    try {
      const response = await api.get<Comment[]>(`/comments/task/${taskId}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  createComment: async (data: { content: string; taskId: string }) => {
    try {
      const response = await api.post<Comment>('/comments', data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  updateComment: async (commentId: string, content: string) => {
    try {
      const response = await api.put<Comment>(`/comments/${commentId}`, { content });
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
  },
  
  isApiError
};

// Export services object for direct usage
export const apiService = {
  auth: authService,
  user: userService,
  company: companyService,
  task: taskService,
  comment: commentService
};

export { api };
