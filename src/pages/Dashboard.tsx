
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { PlusCircle, Building, UserPlus } from 'lucide-react';
import { Company, currentUser, mockCompanies } from '@/types';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  });
  
  const onCreateCompany = (data: { name: string; description: string }) => {
    const newCompany: Company = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      ownerId: currentUser.id,
      createdAt: new Date(),
    };
    
    // Add to mock data to persist between components
    mockCompanies.push(newCompany);
    
    // Update state to trigger re-render
    setCompanies([...mockCompanies]);
    
    form.reset();
    setIsCreating(false);
    
    toast({
      title: "Company created",
      description: `${data.name} has been created successfully.`,
    });
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
                  <Button type="submit">Create Company</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
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
          ))}
          
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
