
export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  avatar?: string;
};

export type CompanyMember = {
  user: User;
  role: string;
};

export type Company = {
  _id: string;
  name: string;
  description?: string;
  logo?: string;
  owner: User;
  members: CompanyMember[];
  createdAt: Date;
};

export type TaskStatus = 'todo' | 'in_progress' | 'completed';

export type Task = {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  company: string;
  assignedTo?: User;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
};

export type Comment = {
  _id: string;
  content: string;
  task: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
};

export type Invitation = {
  _id: string;
  email: string;
  companyId: string;
  status: 'pending' | 'accepted' | 'declined';
  role: string;
  createdAt: Date;
};

export type UserWithCompanies = User & {
  companies: {
    company: {
      _id: string;
      name: string;
      description: string;
    };
    role: string;
  }[];
};

export type AuthResponse = {
  user: User;
  token: string;
};

// For backward compatibility during transition - to be removed later
export const mockCompanies: any[] = [];
export const mockEmployees: any[] = [];
export const mockTasks: any[] = [];
export const mockComments: any[] = [];
export const mockInvitations: any[] = [];
export const currentUser: any = {};
