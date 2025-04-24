import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Plus, LogOut } from 'lucide-react';
import NotificationsDropdown from './NotificationsDropdown';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isHome ? 'bg-transparent' : 'bg-white/70 backdrop-blur-md shadow-sm'} transition-all duration-300`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <span className="bg-black text-white w-8 h-8 rounded-md flex items-center justify-center">T</span>
              Taskify
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 transition-colors">Dashboard</Link>
            <Link to="/companies" className="text-gray-700 hover:text-gray-900 transition-colors">Companies</Link>
            <NotificationsDropdown />
            {isHome ? (
              <Link to="/dashboard">
                <Button>Get Started</Button>
              </Link>
            ) : (
              <Button variant="outline" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Task
              </Button>
            )}
          </div>

          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {isOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 mt-3 bg-white rounded-md shadow-lg">
              <Link 
                to="/dashboard" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/companies" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Companies
              </Link>
              <Link 
                to="/logout" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
