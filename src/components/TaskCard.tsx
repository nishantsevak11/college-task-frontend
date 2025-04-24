import { useState } from 'react';
import { Task, TaskStatus, User, getUserName } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Clock, MessageSquare, Edit, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type TaskCardProps = {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onOpenTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  currentUser: User;
  isUpdating?: boolean;
};

const TaskCard = ({ 
  task, 
  onStatusChange, 
  onOpenTask, 
  onDeleteTask,
  onEditTask,
  currentUser, 
  isUpdating = false 
}: TaskCardProps) => {
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'todo': return 'bg-blue-50 text-blue-600';
      case 'in_progress': return 'bg-yellow-50 text-yellow-600';
      case 'completed': return 'bg-green-50 text-green-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getPriorityBadge = (priority: string | undefined) => {
    switch (priority) {
      case 'high': return <Badge variant="destructive" className="ml-2">High</Badge>;
      case 'medium': return <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-600 border-yellow-200">Medium</Badge>;
      case 'low': return <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-600 border-blue-200">Low</Badge>;
      default: return null;
    }
  };

  const handleStatusChange = (value: string) => {
    onStatusChange(task._id, value as TaskStatus);
  };

  const isAssignedToMe = task.assignedTo && task.assignedTo._id === currentUser._id;
  const canModifyTask = isAssignedToMe || task.createdBy._id === currentUser._id;

  return (
    <div className={`task-card glass-card bg-task-${task.status} animate-scale-in`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <Badge className={`status-badge ${getStatusColor(task.status)}`}>
            {task.status.replace('_', ' ').toUpperCase()}
          </Badge>
          {task.priority && getPriorityBadge(task.priority)}
        </div>
        {isAssignedToMe && (
          <Select value={task.status} onValueChange={handleStatusChange} disabled={isUpdating}>
            <SelectTrigger className="w-[140px] h-8 text-xs">
              <SelectValue placeholder="Update Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
      
      <h3 className="font-medium text-lg truncate mb-2">{task.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2 mb-4">{task.description}</p>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {task.assignedTo && (
            <Avatar className="h-8 w-8">
              {task.assignedTo.avatar ? (
                <AvatarImage src={task.assignedTo.avatar} alt={getUserName(task.assignedTo)} />
              ) : (
                <AvatarFallback>{task.assignedTo.firstName.charAt(0)}</AvatarFallback>
              )}
            </Avatar>
          )}
          
          {task.dueDate && (
            <div className="flex items-center ml-3 text-xs text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              {formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2"
            onClick={() => onOpenTask(task)}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-xs">3</span>
          </Button>

          {canModifyTask && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={() => onEditTask(task)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => onDeleteTask(task._id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8"
            onClick={() => onOpenTask(task)}
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
