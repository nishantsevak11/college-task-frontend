
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, userService, isApiError } from '@/services/api';
import { User } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => void;
  pendingInvitations?: Invitation[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchCurrentUser = async () => {
    setIsLoading(true);
    try {
      const userData = await userService.getCurrentUser();
      // THE FIX: The response from /users/current should contain the full user object,
      // including the 'id' which we alias to '_id' in the frontend type, or just use `_id`.
      // Ensure your backend's /users/current route sends the user's _id.
      if (!isApiError(userData) && userData.id) { // Check for the existence of the ID
        // The user object from the API has `id`, but we use `_id` in the frontend type.
        // Let's ensure the state has `_id`.
        setUser({ ...userData, _id: userData.id });
      } else {
        authService.logout();
        setUser(null);
      }
    } catch (error) {
      authService.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchCurrentUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const response = await authService.login({ email, password });
    
    if (!isApiError(response)) {
      setUser({ ...response.user, _id: response.user.id });
      localStorage.setItem('authToken', response.token);
      toast({
        title: "Login successful",
        description: `Welcome back, ${response.user.firstName}!`,
      });
      setIsLoading(false);
      return true;
    } else {
      toast({
        title: "Login failed",
        description: response.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    setIsLoading(true);
    const response = await authService.register({ email, password, firstName, lastName });
    
    if (!isApiError(response)) {
      toast({
        title: "Registration successful",
        description: "Your account has been created. Please login.",
      });
      setIsLoading(false);
      return true;
    } else {
      toast({
        title: "Registration failed",
        description: response.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
