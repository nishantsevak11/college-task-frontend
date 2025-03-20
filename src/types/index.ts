
export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member';
};

export type Company = {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  ownerId: string;
  createdAt: Date;
};

export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assigneeId?: string;
  assignee?: User;
  companyId: string;
  createdById: string;
  createdBy?: User;
  createdAt: Date;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
};

export type Comment = {
  id: string;
  content: string;
  taskId: string;
  authorId: string;
  author?: User;
  createdAt: Date;
};

export type Invitation = {
  id: string;
  email: string;
  companyId: string;
  status: 'pending' | 'accepted' | 'declined';
  role: 'admin' | 'member';
  createdAt: Date;
};

// Mock data for state management
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Acme Inc',
    description: 'Software development company focused on web applications.',
    ownerId: '1',
    createdAt: new Date('2023-01-15'),
  },
  {
    id: '2',
    name: 'Globex Corporation',
    description: 'Marketing and branding agency.',
    ownerId: '1',
    createdAt: new Date('2023-03-22'),
  },
];

export const mockEmployees: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'member',
  },
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Implement user authentication',
    description: 'Set up user registration, login, and password reset functionality',
    status: 'in-progress',
    assigneeId: '2',
    assignee: mockEmployees[1],
    companyId: '1',
    createdById: '1',
    createdBy: mockEmployees[0],
    createdAt: new Date('2023-05-10'),
    dueDate: new Date('2023-05-25'),
    priority: 'high',
  },
  {
    id: '2',
    title: 'Design landing page',
    description: 'Create a responsive landing page design with modern aesthetics',
    status: 'todo',
    assigneeId: '1',
    assignee: mockEmployees[0],
    companyId: '1',
    createdById: '1',
    createdBy: mockEmployees[0],
    createdAt: new Date('2023-05-12'),
    dueDate: new Date('2023-05-20'),
    priority: 'medium',
  },
];

export const mockComments: Comment[] = [
  {
    id: '1',
    content: 'I\'ve started working on this. Will update the status soon.',
    taskId: '1',
    authorId: '2',
    author: mockEmployees[1],
    createdAt: new Date('2023-05-11T10:30:00'),
  },
];

export const mockInvitations: Invitation[] = [
  {
    id: '1',
    email: 'mike@example.com',
    companyId: '1',
    status: 'pending',
    role: 'member',
    createdAt: new Date('2023-05-05'),
  },
];

// Current user for the application
export const currentUser: User = mockEmployees[0];
