
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import TaskCard from '@/components/TaskCard';
import NewTaskForm from '@/components/NewTaskForm';
import CommentSection from '@/components/CommentSection';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Users,
  UserPlus,
  CheckCircle2,
  X,
  Mail,
  ChevronRight,
  Clock,
  FileEdit,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { companyService, taskService, commentService, isApiError } from '@/services/api';
import {
  Company,
  Task,
  TaskStatus,
  Comment,
  Invitation,
  getUserName
} from '@/types';

const CompanyPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuth();
  
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [newEmployeeEmail, setNewEmployeeEmail] = useState('');
  const [taskFilter, setTaskFilter] = useState<TaskStatus | 'all'>('all');
  
  // Fetch company data - fixed version without onSuccess and with meta for error handling
  const { data: company, isLoading: isLoadingCompany, error: companyError } = useQuery({
    queryKey: ['company', id],
    queryFn: async () => {
      if (!id) return null;
      const response = await companyService.getCompany(id);
      if (isApiError(response)) {
        throw new Error(response.message);
      }
      return response;
    },
    meta: {
      onError: () => {
        toast({
          title: "Company not found",
          description: "The company you're looking for doesn't exist.",
          variant: "destructive"
        });
        navigate('/dashboard');
      }
    }
  });
  
  // Fetch employees
  const { data: employees = [] } = useQuery({
    queryKey: ['employees', id],
    queryFn: async () => {
      if (!id) return [];
      const response = await companyService.getEmployees(id);
      if (isApiError(response)) {
        toast({
          title: "Error",
          description: "Failed to load employees.",
          variant: "destructive"
        });
        return [];
      }
      return response;
    },
    enabled: !!id
  });
  
  // Fetch tasks
  const { data: tasks = [], isLoading: isLoadingTasks } = useQuery({
    queryKey: ['tasks', id],
    queryFn: async () => {
      if (!id) return [];
      const response = await taskService.getTasks(id);
      if (isApiError(response)) {
        toast({
          title: "Error",
          description: "Failed to load tasks.",
          variant: "destructive"
        });
        return [];
      }
      return response;
    },
    enabled: !!id
  });
  
  // Fetch invitations
  const { data: invitations = [] } = useQuery({
    queryKey: ['invitations', id],
    queryFn: async () => {
      if (!id) return [];
      const response = await companyService.getInvitations(id);
      if (isApiError(response)) {
        return [];
      }
      return response;
    },
    enabled: !!id
  });
  
  // Fetch comments
  const { data: comments = [] } = useQuery({
    queryKey: ['comments'],
    queryFn: async () => {
      const promises = tasks.map(task => commentService.getComments(task._id));
      const responses = await Promise.all(promises);
      const allComments = responses.flatMap(response => {
        if (isApiError(response)) return [];
        return response;
      });
      return allComments;
    },
    enabled: tasks.length > 0
  });
  
  // Task status mutation
  const updateTaskStatusMutation = useMutation({
    mutationFn: ({ taskId, newStatus }: { taskId: string; newStatus: TaskStatus }) => 
      taskService.updateTaskStatus(taskId, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', id] });
      toast({
        title: "Task updated",
        description: "The task status has been updated successfully.",
      });
    }
  });
  
  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: (taskData: any) => 
      taskService.createTask({
        title: taskData.title,
        description: taskData.description,
        companyId: id || '',
        assignedTo: taskData.assignedToId,
        priority: taskData.priority,
        dueDate: taskData.dueDate
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', id] });
      toast({
        title: "Task created",
        description: "The new task has been created successfully.",
      });
    }
  });
  
  // Create comment mutation
  const createCommentMutation = useMutation({
    mutationFn: ({ taskId, content }: { taskId: string; content: string }) => 
      commentService.createComment({
        taskId,
        content
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      toast({
        title: "Comment added",
        description: "Your comment has been added to the task.",
      });
    }
  });
  
  // Create invitation mutation
  const createInvitationMutation = useMutation({
    mutationFn: (email: string) => {
      if (!id) throw new Error("Company ID not found");
      return companyService.createInvitation({
        email,
        companyId: id,
        role: 'member'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations', id] });
      setNewEmployeeEmail('');
      setIsAddingEmployee(false);
      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to ${newEmployeeEmail}.`,
      });
    }
  });
  
  // Cancel invitation mutation
  const cancelInvitationMutation = useMutation({
    mutationFn: (invitationId: string) => companyService.cancelInvitation(invitationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations', id] });
      toast({
        title: "Invitation cancelled",
        description: "The invitation has been cancelled.",
      });
    }
  });
  
  const filteredTasks = tasks.filter(task => 
    taskFilter === 'all' ? true : task.status === taskFilter
  );
  
  const taskComments = selectedTask
    ? comments.filter(comment => comment.task === selectedTask._id)
    : [];
  
  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    updateTaskStatusMutation.mutate({ taskId, newStatus });
  };
  
  const handleAddComment = (taskId: string, content: string) => {
    createCommentMutation.mutate({ taskId, content });
  };
  
  const handleCreateTask = (taskData: any) => {
    createTaskMutation.mutate(taskData);
  };
  
  const handleInviteEmployee = () => {
    if (!newEmployeeEmail.trim()) return;
    createInvitationMutation.mutate(newEmployeeEmail);
  };
  
  const handleCancelInvitation = (invitationId: string) => {
    cancelInvitationMutation.mutate(invitationId);
  };
  
  if (isLoadingCompany && !company || !currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 pb-10">
        <Navbar />
        <div className="max-w-7xl mx-auto pt-24 px-6">
          <div className="animate-pulse">
            <Skeleton className="h-10 w-1/4 mb-4" />
            <Skeleton className="h-5 w-1/3 mb-8" />
            {/* More skeleton content here */}
          </div>
        </div>
      </div>
    );
  }
  
  if (!company) return null;
  
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Navbar />
      
      <div className="max-w-7xl mx-auto pt-24 px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">{company.name}</h1>
            <p className="text-gray-600">{company.description}</p>
          </div>
          <div className="flex gap-3">
            <Dialog open={isAddingEmployee} onOpenChange={setIsAddingEmployee}>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setIsAddingEmployee(true)}
              >
                <UserPlus className="h-4 w-4" />
                Invite Employee
              </Button>
              <DialogContent className="sm:max-w-[425px] animate-slide-up">
                <DialogHeader>
                  <DialogTitle>Invite a new team member</DialogTitle>
                  <DialogDescription>
                    Send an invitation email to add someone to your company.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      placeholder="colleague@example.com"
                      type="email"
                      value={newEmployeeEmail}
                      onChange={(e) => setNewEmployeeEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleInviteEmployee}
                      disabled={createInvitationMutation.isPending}
                    >
                      {createInvitationMutation.isPending ? 'Sending...' : 'Send Invitation'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <NewTaskForm
              companyId={company._id}
              onCreateTask={handleCreateTask}
              employees={employees}
              currentUser={currentUser}
              isCreating={createTaskMutation.isPending}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Tabs defaultValue="tasks" className="w-full">
              <TabsList className="grid grid-cols-2 w-[400px] mb-6">
                <TabsTrigger value="tasks" className="flex items-center gap-2">
                  <FileEdit className="h-4 w-4" />
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="team" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Team
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="tasks" className="mt-0">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-2">
                    <Button 
                      variant={taskFilter === 'all' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setTaskFilter('all')}
                    >
                      All
                    </Button>
                    <Button 
                      variant={taskFilter === 'todo' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setTaskFilter('todo')}
                    >
                      To Do
                    </Button>
                    <Button 
                      variant={taskFilter === 'in_progress' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setTaskFilter('in_progress')}
                    >
                      In Progress
                    </Button>
                    <Button 
                      variant={taskFilter === 'completed' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setTaskFilter('completed')}
                    >
                      Completed
                    </Button>
                  </div>
                </div>
                
                {isLoadingTasks ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="animate-pulse">
                        <Skeleton className="h-48 w-full rounded-lg" />
                      </div>
                    ))}
                  </div>
                ) : filteredTasks.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <div className="mb-4">
                      <CheckCircle2 className="h-12 w-12 mx-auto text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No tasks found</h3>
                    <p className="text-gray-500 mb-4">
                      {taskFilter === 'all' 
                        ? "There are no tasks in this company yet." 
                        : `There are no tasks with "${taskFilter}" status.`}
                    </p>
                    <NewTaskForm
                      companyId={company._id}
                      onCreateTask={handleCreateTask}
                      employees={employees}
                      currentUser={currentUser}
                      isCreating={createTaskMutation.isPending}
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredTasks.map(task => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        onStatusChange={handleStatusChange}
                        onOpenTask={setSelectedTask}
                        currentUser={currentUser}
                        isUpdating={updateTaskStatusMutation.isPending}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="team" className="mt-0">
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-medium">Team Members</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {company.members.map(member => (
                      <div key={member.user._id} className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            {member.user.firstName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{getUserName(member.user)}</p>
                            <p className="text-sm text-gray-500">{member.user.email}</p>
                          </div>
                        </div>
                        <Badge variant={member.role === 'admin' ? 'default' : 'outline'}>
                          {member.role === 'admin' ? 'Admin' : 'Member'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  
                  {invitations.length > 0 && (
                    <>
                      <div className="p-6 border-b border-gray-200 border-t">
                        <h3 className="text-lg font-medium">Pending Invitations</h3>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {invitations.map(invitation => (
                          <div key={invitation._id} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                                <Mail className="h-5 w-5 text-yellow-600" />
                              </div>
                              <div>
                                <p className="font-medium">{invitation.email}</p>
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  Invited {new Date(invitation.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleCancelInvitation(invitation._id)}
                              disabled={cancelInvitationMutation.isPending}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 h-fit">
            <h3 className="font-medium text-lg mb-4">Activity</h3>
            <div className="space-y-4">
              {[...comments]
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 5)
                .map(comment => (
                  <div key={comment._id} className="flex gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
                      {comment.author?.firstName.charAt(0)}
                    </div>
                    <div>
                      <p>
                        <span className="font-medium">{getUserName(comment.author)}</span>{' '}
                        commented on a task
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              
              {comments.length === 0 && (
                <p className="text-gray-500 text-sm">No recent activity</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Dialog 
        open={!!selectedTask} 
        onOpenChange={(open) => !open && setSelectedTask(null)}
      >
        {selectedTask && (
          <DialogContent className="sm:max-w-[700px] animate-slide-up">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <Badge className={`status-badge ${selectedTask.status === 'todo' ? 'bg-blue-50 text-blue-600' : 
                  selectedTask.status === 'in_progress' ? 'bg-yellow-50 text-yellow-600' : 
                  'bg-green-50 text-green-600'}`}>
                  {selectedTask.status.replace('_', ' ').toUpperCase()}
                </Badge>
                {selectedTask.priority && selectedTask.priority === 'high' && (
                  <Badge variant="destructive" className="ml-2">High</Badge>
                )}
              </div>
              <DialogTitle className="text-xl mt-2">{selectedTask.title}</DialogTitle>
              <DialogDescription>
                Created by {getUserName(selectedTask.createdBy)} on {new Date(selectedTask.createdAt).toLocaleDateString()}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Description</h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                  {selectedTask.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Assignee</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">
                      {selectedTask.assignedTo ? selectedTask.assignedTo.firstName.charAt(0) : '-'}
                    </div>
                    <span className="text-sm">
                      {selectedTask.assignedTo ? getUserName(selectedTask.assignedTo) : 'Unassigned'}
                    </span>
                  </div>
                </div>
                
                {selectedTask.dueDate && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Due Date</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      {new Date(selectedTask.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>
              
              <CommentSection
                comments={taskComments}
                taskId={selectedTask._id}
                currentUser={currentUser}
                onAddComment={handleAddComment}
                isSubmitting={createCommentMutation.isPending}
              />
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default CompanyPage;
