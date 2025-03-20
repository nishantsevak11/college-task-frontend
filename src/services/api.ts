
// This is a mock API service that will be replaced with real API calls later
// Currently using the mock data, but structured like real API calls

import { 
  Company, 
  Task, 
  User, 
  Comment, 
  Invitation, 
  TaskStatus,
  mockCompanies,
  mockEmployees,
  mockTasks,
  mockComments,
  mockInvitations,
  currentUser
} from '@/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API error response type
export interface ApiErrorResponse {
  error: string;
  status: number;
}

// Generic API response type
export type ApiResponse<T> = T | ApiErrorResponse;

// Helper to check if response is an error
export const isApiError = (response: any): response is ApiErrorResponse => {
  return response && typeof response === 'object' && 'error' in response;
};

export const api = {
  // Authentication
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    await delay(300);
    return { ...currentUser };
  },

  // Companies
  getCompanies: async (): Promise<ApiResponse<Company[]>> => {
    await delay(500);
    return [...mockCompanies];
  },

  getCompany: async (id: string): Promise<ApiResponse<Company | null>> => {
    await delay(300);
    const company = mockCompanies.find(c => c.id === id);
    if (!company) {
      return { error: 'Company not found', status: 404 };
    }
    return { ...company };
  },

  createCompany: async (data: Omit<Company, 'id' | 'createdAt' | 'ownerId'>): Promise<ApiResponse<Company>> => {
    await delay(600);
    const newCompany: Company = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      ownerId: currentUser.id,
      createdAt: new Date(),
      logo: data.logo
    };
    
    mockCompanies.push(newCompany);
    return { ...newCompany };
  },

  // Tasks
  getTasks: async (companyId: string): Promise<ApiResponse<Task[]>> => {
    await delay(500);
    return mockTasks
      .filter(task => task.companyId === companyId)
      .map(task => ({
        ...task,
        assignee: mockEmployees.find(emp => emp.id === task.assigneeId),
        createdBy: mockEmployees.find(emp => emp.id === task.createdById)
      }));
  },

  getTask: async (taskId: string): Promise<ApiResponse<Task | null>> => {
    await delay(300);
    const task = mockTasks.find(t => t.id === taskId);
    if (!task) {
      return { error: 'Task not found', status: 404 };
    }
    return {
      ...task,
      assignee: mockEmployees.find(emp => emp.id === task.assigneeId),
      createdBy: mockEmployees.find(emp => emp.id === task.createdById)
    };
  },

  createTask: async (data: Omit<Task, 'id' | 'createdAt' | 'assignee' | 'createdBy'>): Promise<ApiResponse<Task>> => {
    await delay(600);
    const newTask: Task = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      assignee: mockEmployees.find(emp => emp.id === data.assigneeId),
      createdBy: mockEmployees.find(emp => emp.id === data.createdById)
    };
    
    mockTasks.push(newTask);
    return { ...newTask };
  },

  updateTaskStatus: async (taskId: string, status: TaskStatus): Promise<ApiResponse<Task>> => {
    await delay(400);
    const taskIndex = mockTasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
      return { error: 'Task not found', status: 404 };
    }
    
    mockTasks[taskIndex].status = status;
    
    return {
      ...mockTasks[taskIndex],
      assignee: mockEmployees.find(emp => emp.id === mockTasks[taskIndex].assigneeId),
      createdBy: mockEmployees.find(emp => emp.id === mockTasks[taskIndex].createdById)
    };
  },

  // Comments
  getComments: async (taskId: string): Promise<ApiResponse<Comment[]>> => {
    await delay(400);
    return mockComments
      .filter(comment => comment.taskId === taskId)
      .map(comment => ({
        ...comment,
        author: mockEmployees.find(emp => emp.id === comment.authorId)
      }));
  },

  createComment: async (data: Omit<Comment, 'id' | 'createdAt' | 'author'>): Promise<ApiResponse<Comment>> => {
    await delay(500);
    const newComment: Comment = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      author: mockEmployees.find(emp => emp.id === data.authorId)
    };
    
    mockComments.push(newComment);
    return { ...newComment };
  },

  // Team Management
  getEmployees: async (): Promise<ApiResponse<User[]>> => {
    await delay(400);
    return [...mockEmployees];
  },

  getInvitations: async (companyId: string): Promise<ApiResponse<Invitation[]>> => {
    await delay(300);
    return mockInvitations.filter(inv => inv.companyId === companyId);
  },

  createInvitation: async (data: Omit<Invitation, 'id' | 'createdAt' | 'status'>): Promise<ApiResponse<Invitation>> => {
    await delay(600);
    const newInvitation: Invitation = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: 'pending'
    };
    
    mockInvitations.push(newInvitation);
    return { ...newInvitation };
  },

  cancelInvitation: async (invitationId: string): Promise<ApiResponse<{ success: boolean }>> => {
    await delay(400);
    const invIndex = mockInvitations.findIndex(inv => inv.id === invitationId);
    if (invIndex === -1) {
      return { error: 'Invitation not found', status: 404 };
    }
    
    mockInvitations.splice(invIndex, 1);
    return { success: true };
  }
};
