import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut, User } from 'lucide-react';
import NotificationsDropdown from './NotificationsDropdown';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isHome ? 'bg-transparent' : 'bg-white shadow-sm'
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-150"
              aria-label="CompanyBuddy Home"
            >
              <span className="flex items-center gap-2">
                <span className="w-8 h-8 bg-gray-900 text-white rounded flex items-center justify-center text-base font-bold">
                  C
                </span>
                CompanyBuddy
              </span>
            </Link>
          </div>

          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors duration-150"
              >
                Dashboard
              </Link>
              <NotificationsDropdown />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 px-2 py-1 rounded transition-colors duration-150"
                    aria-label={`User menu for ${user.firstName}`}
                  >
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">{user.firstName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white rounded border border-gray-100 shadow-md p-1.5 w-48 animate-fade-in"
                >
                  <DropdownMenuLabel className="text-gray-900 text-sm font-medium">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    disabled
                    className="text-gray-400 text-xs cursor-not-allowed px-2 py-1.5"
                  >
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-100" />
                  <DropdownMenuItem
                    onClick={logout}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 px-2 py-1.5 rounded text-sm cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 text-gray-500" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link to="/dashboard">
              <Button
                className="bg-gray-900 text-white hover:bg-gray-800 text-sm font-medium px-4 py-2 rounded transition-colors duration-150"
                aria-label="Get Started"
              >
                Get Started
              </Button>
            </Link>
          )}

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded p-1 transition-colors duration-150"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2"
            >
              <div className="px-3 py-3 space-y-2 bg-white border border-gray-100 rounded shadow-md">
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 transition-colors duration-150"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <NotificationsDropdown />
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left block px-3 py-2 rounded text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 transition-colors duration-150 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4 text-gray-500" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;