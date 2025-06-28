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
import { PlusCircle, Building, UserPlus, ArrowLeft } from 'lucide-react';
import { getUserInitials } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { companyService, isApiError } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ModernNavbar from '@/components/ModernNavbar';

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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#111111] to-[#0D0D0D] relative overflow-hidden">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-neon-green/20 to-neon-purple/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -50, 100, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-64 h-64 bg-gradient-to-r from-neon-purple/30 to-neon-blue/20 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 60, 0],
              y: [0, 80, -40, 0],
              scale: [1, 0.7, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        <ModernNavbar/>
        <div className="max-w-7xl mx-auto pt-24 px-6 relative z-10">
          <Skeleton className="h-10 w-1/4 mb-4 bg-white/10" />
          <Skeleton className="h-5 w-1/3 mb-8 bg-white/10" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111111] to-[#0D0D0D] relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-neon-green/20 to-neon-purple/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-64 h-64 bg-gradient-to-r from-neon-purple/30 to-neon-blue/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 80, -40, 0],
            scale: [1, 0.7, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute top-6 left-6 z-10"
      >
        <Button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-300 hover:text-neon-green bg-transparent hover:bg-transparent transition-colors duration-300 font-inter"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back to Home</span>
        </Button>
      </motion.div>

      <Navbar />
      <div className="max-w-7xl mx-auto pt-24 px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-4xl font-syne font-extrabold text-white tracking-tight">Dashboard</h1>
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button
                className="gap-2 bg-gradient-to-r from-neon-green to-emerald-400 text-black font-inter font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-neon-green/30 transition-all duration-300"
                aria-label="Create new company"
              >
                <PlusCircle className="h-4 w-4" />
                Create Company
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] bg-white/5 border-white/10 glass-card shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-syne font-bold text-white">Create a New Company</DialogTitle>
                <DialogDescription className="text-gray-300 font-inter">
                  Add a new company to manage tasks and employees.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(onCreateCompany)} className="space-y-6 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-200 font-inter">
                    Company Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter company name"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-neon-green focus:ring-neon-green/20 transition-all duration-300"
                    {...form.register('name', { required: true })}
                    aria-invalid={!!form.formState.errors.name}
                    aria-describedby="name-error"
                  />
                  {form.formState.errors.name && (
                    <p id="name-error" className="text-sm text-red-400">Company name is required</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium text-gray-200 font-inter">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Describe what your company does"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-neon-green focus:ring-neon-green/20 transition-all duration-300 resize-none"
                    {...form.register('description')}
                    aria-describedby="description-hint"
                  />
                  <p id="description-hint" className="text-sm text-gray-400 font-inter">Optional: Provide a brief description.</p>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={createCompanyMutation.isPending}
                    className="bg-gradient-to-r from-neon-green to-emerald-400 text-black font-inter font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-neon-green/30 transition-all duration-300"
                  >
                    {createCompanyMutation.isPending ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full"
                      />
                    ) : (
                      'Create Company'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>

        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="overflow-hidden rounded-xl shadow-md glass-card border-white/10">
                  <CardHeader className="bg-white/5">
                    <Skeleton className="h-6 w-3/4 bg-white/10" />
                    <Skeleton className="h-4 w-1/2 bg-white/10" />
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Skeleton className="h-12 w-full mb-4 bg-white/10" />
                    <div className="flex -space-x-2">
                      <Skeleton className="w-8 h-8 rounded-full bg-white/10" />
                      <Skeleton className="w-8 h-8 rounded-full bg-white/10" />
                    </div>
                  </CardContent>
                  <CardFooter className="bg-white/5 justify-end">
                    <Skeleton className="h-9 w-28 bg-white/10" />
                  </CardFooter>
                </Card>
              ))
            ) : (
              companies.map((company) => (
                <motion.div
                  key={company._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 glass-card border-white/10">
                    <CardHeader className="bg-white/5">
                      <CardTitle className="flex items-center gap-2 text-xl font-syne font-semibold text-white">
                        <Building className="h-5 w-5 text-neon-green" />
                        {company.name}
                      </CardTitle>
                      <CardDescription className="text-gray-300 font-inter">
                        Created on {company.createdAt ? new Date(company.createdAt).toLocaleDateString() : 'N/A'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-sm text-gray-300 font-inter mb-4 line-clamp-3">
                        {company.description || 'No description provided.'}
                      </p>
                      <div className="flex -space-x-2">
                        {company.members.slice(0, 2).map((member) => (
                          <TooltipProvider key={member.user._id}>
                            <Tooltip>
                              <TooltipTrigger>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-green to-emerald-400 flex items-center justify-center text-black text-xs font-medium font-inter">
                                  {getUserInitials(member.user)}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="font-inter">{member.user.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                        {company.members.length > 2 && (
                          <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-white/5 flex items-center justify-center">
                            <span className="text-xs text-gray-400 font-inter">+{company.members.length - 2}</span>
                          </div>
                        )}
                        <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-white/5 flex items-center justify-center">
                          <UserPlus className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-white/5 justify-end">
                      <Button
                        variant="outline"
                        className="gap-2 border-neon-green text-neon-green hover:bg-neon-green/20 hover:text-neon-green font-inter font-semibold rounded-lg transition-all duration-300"
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
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <Card
                className="border-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10 transition-colors duration-200 cursor-pointer flex flex-col items-center justify-center py-10 rounded-xl shadow-sm hover:shadow-md glass-card"
                onClick={() => setIsCreating(true)}
                role="button"
                aria-label="Create new company"
              >
                <div className="rounded-full bg-white/10 p-3">
                  <PlusCircle className="h-8 w-8 text-gray-300" />
                </div>
                <p className="mt-4 font-inter font-semibold text-gray-200">Create New Company</p>
              </Card>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;