import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import PendingInvitations from '@/components/PendingInvitations';
import { ArrowLeft, LogIn } from 'lucide-react';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showInvitations, setShowInvitations] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });
  
  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    const success = await login(data.email, data.password);
    if (success) {
      setShowInvitations(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    }
    setIsLoading(false);
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

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }
    }
  };
  
  return (
    <>
      {showInvitations && <PendingInvitations />}
      <div className="min-h-screen bg-gradient-to-br from-[#111111] to-[#0D0D0D] relative overflow-hidden">
        {/* Animated Background Elements */}
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

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="absolute top-6 left-6 z-10"
        >
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-300 hover:text-neon-green transition-colors duration-300 font-inter"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
        </motion.div>

        <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md"
          >
            <Card className="glass-card border-white/10 shadow-2xl">
              <CardHeader className="space-y-1 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="flex justify-center mb-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-neon-green to-emerald-400 rounded-full flex items-center justify-center">
                    <LogIn className="h-6 w-6 text-black" />
                  </div>
                </motion.div>
                <CardTitle className="text-2xl font-syne font-bold text-white">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-gray-300 font-inter">
                  Sign in to your CompanyBuddy account
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <motion.form
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-200 font-inter">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: 'Please enter a valid email'
                        }
                      })}
                      className={`bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-neon-green focus:ring-neon-green/20 transition-all duration-300 ${
                        errors.email ? 'border-red-400 focus:border-red-400' : ''
                      }`}
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-400"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-200 font-inter">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      {...register('password', { 
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters'
                        }
                      })}
                      className={`bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-neon-green focus:ring-neon-green/20 transition-all duration-300 ${
                        errors.password ? 'border-red-400 focus:border-red-400' : ''
                      }`}
                    />
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-400"
                      >
                        {errors.password.message}
                      </motion.p>
                    )}
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-neon-green to-emerald-400 text-black font-inter font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-neon-green/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full"
                        />
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              </CardContent>
              
              <CardFooter className="flex flex-col items-center space-y-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="text-center space-y-2"
                >
                  <div className="text-sm text-gray-400 font-inter">
                    Don't have an account?{' '}
                    <Link
                      to="/register"
                      className="text-neon-green hover:text-neon-green/80 transition-colors duration-300 font-medium"
                    >
                      Sign up
                    </Link>
                  </div>
                  <div className="text-sm text-gray-400 font-inter">
                    <Link
                      to="/forgot-password"
                      className="text-neon-purple hover:text-neon-purple/80 transition-colors duration-300"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Login;
