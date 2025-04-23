
export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  // Added for UI compatibility - can be empty string if not available
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
  owner: User;
  members: CompanyMember[];
  createdAt: string;
  updatedAt: string;
};

export type TaskStatus = 'todo' | 'in_progress' | 'completed';

export type TaskPriority = 'low' | 'medium' | 'high';

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
  // Added for UI compatibility
  priority?: TaskPriority;
  dueDate?: string;
};

export type Comment = {
  _id: string;
  content: string;
  task: string;
  author: User;
  createdAt: string;
  updatedAt: string;
};

export type Invitation = {
  _id: string;
  email: string;
  company: string;
  role: string;
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
