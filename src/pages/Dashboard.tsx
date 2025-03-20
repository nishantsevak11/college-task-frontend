
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { PlusCircle, Building, UserPlus } from 'lucide-react';
import { Company, currentUser } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { api, isApiError } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  });
  
  // Fetch companies using React Query
  const { data: companies = [], isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const response = await api.getCompanies();
      if (isApiError(response)) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
        return [];
      }
      return response;
    },
  });
  
  // Create company mutation
  const createCompanyMutation = useMutation({
    mutationFn: api.createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      form.reset();
      setIsCreating(false);
      
      toast({
        title: "Company created",
        description: "Company has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create company. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  const onCreateCompany = (data: { name: string; description: string }) => {
    createCompanyMutation.mutate(data);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Navbar />
      
      <div className="max-w-7xl mx-auto pt-24 px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Create Company
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] animate-slide-up">
              <DialogHeader>
                <DialogTitle>Create a new company</DialogTitle>
                <DialogDescription>
                  Add a new company to manage tasks and employees
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(onCreateCompany)} className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Company Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter company name"
                    {...form.register('name', { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Describe what your company does"
                    {...form.register('description')}
                    className="resize-none"
                  />
                </div>
                <DialogFooter>
                  <Button 
                    type="submit" 
                    disabled={createCompanyMutation.isPending}
                  >
                    {createCompanyMutation.isPending ? 'Creating...' : 'Create Company'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Skeleton loading state
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-slate-50">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="pt-6">
                  <Skeleton className="h-12 w-full mb-4" />
                  <div className="flex -space-x-2">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="w-8 h-8 rounded-full" />
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 justify-end">
                  <Skeleton className="h-9 w-28" />
                </CardFooter>
              </Card>
            ))
          ) : (
            // Actual company cards
            companies.map((company) => (
              <Card key={company.id} className="overflow-hidden animate-scale-in glass-card">
                <CardHeader className="bg-slate-50">
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    {company.name}
                  </CardTitle>
                  <CardDescription>
                    Created on {company.createdAt.toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600 mb-4">
                    {company.description}
                  </p>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                      JD
                    </div>
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
                      AB
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-white flex items-center justify-center">
                      <UserPlus className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 justify-end">
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => navigate(`/company/${company.id}`)}
                  >
                    View Company
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
          
          <Card 
            className="border-dashed border-gray-300 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer flex flex-col items-center justify-center py-10"
            onClick={() => setIsCreating(true)}
          >
            <div className="rounded-full bg-gray-100 p-3">
              <PlusCircle className="h-8 w-8 text-gray-400" />
            </div>
            <p className="mt-4 font-medium text-gray-600">Create New Company</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
