
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const ModernNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    top: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(5px)',
    },
    scrolled: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    }
  };

  return (
    <motion.nav
      initial="top"
      animate={scrolled ? "scrolled" : "top"}
      variants={navVariants}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="text-xl font-syne font-bold text-white flex items-center gap-3 hover:text-neon-green transition-colors duration-300"
            >
              <motion.span
                className="w-10 h-10 bg-gradient-to-r from-neon-green to-neon-purple rounded-lg flex items-center justify-center text-black font-bold text-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                C
              </motion.span>
              CompanyBuddy
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center space-x-8"
          >
            <Link
              to="#projects"
              className="text-gray-300 hover:text-neon-green font-inter font-medium transition-all duration-300 hover:glow-text"
            >
              Projects
            </Link>
            <Link
              to="#about"
              className="text-gray-300 hover:text-neon-green font-inter font-medium transition-all duration-300 hover:glow-text"
            >
              About
            </Link>
            <Link
              to="#contact"
              className="text-gray-300 hover:text-neon-green font-inter font-medium transition-all duration-300 hover:glow-text"
            >
              Contact
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/dashboard"
                className="px-6 py-2 bg-gradient-to-r from-neon-green to-emerald-400 text-black font-inter font-semibold rounded-full hover:shadow-lg hover:shadow-neon-green/25 transition-all duration-300"
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6"
            >
              <div className="flex flex-col space-y-4">
                <Link
                  to="#projects"
                  className="text-gray-300 hover:text-neon-green font-inter font-medium transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Projects
                </Link>
                <Link
                  to="#about"
                  className="text-gray-300 hover:text-neon-green font-inter font-medium transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="#contact"
                  className="text-gray-300 hover:text-neon-green font-inter font-medium transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  to="/dashboard"
                  className="px-6 py-3 bg-gradient-to-r from-neon-green to-emerald-400 text-black font-inter font-semibold rounded-full text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default ModernNavbar;