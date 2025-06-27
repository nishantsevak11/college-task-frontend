import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/ModernNavbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { PlusCircle, Building, UserPlus } from 'lucide-react';
import { getUserInitials } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { companyService, isApiError } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FormData {
  name: string;
  description: string;
}

const Dashboard = () => {
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuth();

  const form = useForm<FormData>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  // Fetch companies using React Query
  const { data: companies = [], isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const response = await companyService.getCompanies();
      if (isApiError(response)) {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
        return [];
      }
      return response;
    },
  });

  // Create company mutation
  const createCompanyMutation = useMutation({
    mutationFn: (data: FormData) => companyService.createCompany(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      form.reset();
      setIsCreating(false);
      toast({
        title: "Company Created",
        description: "Company has been created successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create company. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onCreateCompany = (data: FormData) => {
    createCompanyMutation.mutate(data);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-10">
        <Navbar />
        <div className="max-w-7xl mx-auto pt-24 px-6">
          <Skeleton className="h-10 w-1/4 mb-4" />
          <Skeleton className="h-5 w-1/3 mb-8" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-10">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button
                className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
                aria-label="Create new company"
              >
                <PlusCircle className="h-4 w-4" />
                Create Company
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] bg-white rounded-xl shadow-2xl animate-slide-up">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900">Create a New Company</DialogTitle>
                <DialogDescription className="text-gray-600">
                  Add a new company to manage tasks and employees.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(onCreateCompany)} className="space-y-6 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter company name"
                    className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
                    {...form.register('name', { required: true })}
                    aria-invalid={!!form.formState.errors.name}
                    aria-describedby="name-error"
                  />
                  {form.formState.errors.name && (
                    <p id="name-error" className="text-sm text-red-600">Company name is required</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Describe what your company does"
                    className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg resize-none"
                    {...form.register('description')}
                    aria-describedby="description-hint"
                  />
                  <p id="description-hint" className="text-sm text-gray-500">Optional: Provide a brief description.</p>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={createCompanyMutation.isPending}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
                  >
                    {createCompanyMutation.isPending ? 'Creating...' : 'Create Company'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>

        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="overflow-hidden rounded-xl shadow-md">
                  <CardHeader className="bg-gray-100">
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
              companies.map((company) => (
                <motion.div
                  key={company._id}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 glass-card">
                    <CardHeader className="bg-gray-100">
                      <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                        <Building className="h-5 w-5 text-blue-600" />
                        {company.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Created on {company.createdAt ? new Date(company.createdAt).toLocaleDateString() : 'N/A'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {company.description || 'No description provided.'}
                      </p>
                      <div className="flex -space-x-2">
                        {company.members.slice(0, 2).map((member) => (
                          <TooltipProvider key={member.user._id}>
                            <Tooltip>
                              <TooltipTrigger>
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
                                  {getUserInitials(member.user)}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{member.user.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                        {company.members.length > 2 && (
                          <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
                            <span className="text-xs text-gray-600">+{company.members.length - 2}</span>
                          </div>
                        )}
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
                          <UserPlus className="h-4 w-4 text-gray-500" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 justify-end">
                      <Button
                        variant="outline"
                        className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-colors duration-200"
                        onClick={() => navigate(`/company/${company._id}`)}
                        aria-label={`View ${company.name}`}
                      >
                        View Company
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            )}

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className="border-2 border-dashed border-gray-300 bg-gray-50/50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer flex flex-col items-center justify-center py-10 rounded-xl shadow-sm hover:shadow-md"
                onClick={() => setIsCreating(true)}
                role="button"
                aria-label="Create new company"
              >
                <div className="rounded-full bg-gray-200 p-3">
                  <PlusCircle className="h-8 w-8 text-gray-500" />
                </div>
                <p className="mt-4 font-semibold text-gray-700">Create New Company</p>
              </Card>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;