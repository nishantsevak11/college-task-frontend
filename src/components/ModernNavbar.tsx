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

const ModernNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }
    }
  };

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-[#111111] to-[#0D0D0D] glass-card border-b border-white/10 transition-all duration-300`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-syne font-bold text-white hover:text-neon-green transition-colors duration-300"
              aria-label="CompanyBuddy Home"
            >
              <span className="flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-neon-green to-emerald-400 rounded flex items-center justify-center text-base font-bold text-black">
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
                className="text-gray-300 font-inter font-medium text-sm hover:text-neon-green transition-colors duration-300"
              >
                Dashboard
              </Link>
              <NotificationsDropdown />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-gray-300 hover:text-neon-green hover:bg-white/5 px-2 py-1 rounded transition-all duration-300"
                    aria-label={`User menu for ${user.firstName}`}
                  >
                    <User className="h-4 w-4 text-gray-300" />
                    <span className="text-sm font-inter font-medium">{user.firstName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-[#111111] border-white/10 glass-card shadow-xl p-1.5 w-48"
                >
                  <DropdownMenuLabel className="text-white text-sm font-syne font-medium">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    disabled
                    className="text-gray-400 text-xs font-inter cursor-not-allowed px-2 py-1.5"
                  >
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    onClick={logout}
                    className="flex items-center gap-2 text-gray-300 font-inter hover:text-neon-green hover:bg-white/10 px-2 py-1.5 rounded text-sm cursor-pointer transition-all duration-300"
                  >
                    <LogOut className="h-4 w-4 text-gray-300" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link to="/dashboard">
              <Button
                className="bg-gradient-to-r from-neon-green to-emerald-400 text-black font-inter font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-neon-green/30 transition-all duration-300"
                aria-label="Get Started"
              >
                Get Started
              </Button>
            </Link>
          )}

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/20 rounded p-1 transition-colors duration-300"
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
              <div className="px-3 py-3 space-y-2 bg-[#111111] border-white/10 glass-card rounded shadow-xl">
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded text-sm font-inter font-medium text-gray-300 hover:text-neon-green hover:bg-white/10 transition-colors duration-300"
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
                  className="w-full text-left block px-3 py-2 rounded text-sm font-inter font-medium text-gray-300 hover:text-neon-green hover:bg-white/10 transition-colors duration-300 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4 text-gray-300" />
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

export default ModernNavbar;