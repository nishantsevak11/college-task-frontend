
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
