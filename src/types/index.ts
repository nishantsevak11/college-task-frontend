
export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
};

export type CompanyMember = {
  user: User;
  role: string;
};

export type Company = {
  _id: string;
  name: string;
  description?: string;
  owner: User;
  members: CompanyMember[];
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
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  _id: string;
  content: string;
  task: string;
  author: User;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};

// Helper functions
export const getUserName = (user: User): string => {
  return `${user.firstName} ${user.lastName}`;
};

export const getUserInitials = (user: User): string => {
  return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
};
