import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import DashboardPreview from './DashboardPreview';

const ModernHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }
    })
  };

  const words = "Manage Tasks with Unmatched Efficiency".split(" ");

  return (
    <motion.section
      ref={containerRef}
      style={{ y, opacity }}
      className="min-h-screen flex flex-col items-center justify-center relative pt-20 px-6"
    >
      {/* Announcement Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16 bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-full flex items-center gap-3 hover:bg-white/10 transition-all duration-300"
      >
        <List className="h-5 w-5 text-neon-green" />
        <span className="text-gray-200 font-inter font-medium">Simple Easy Task Management</span>
      </motion.div>

      {/* Main Hero Content */}
      <div className="container mx-auto text-center max-w-6xl">
        <motion.h1 className="text-6xl md:text-8xl font-syne font-bold mb-8 leading-tight">
          {words.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className={`inline-block mr-4 ${
                word === "Tasks" ? "text-transparent bg-gradient-to-r from-neon-green to-emerald-400 bg-clip-text" :
                word === "Efficiency" ? "text-transparent bg-gradient-to-r from-neon-purple to-violet-400 bg-clip-text" :
                "text-white"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto font-inter leading-relaxed"
        >
          Transform your workflow with intelligent task management that{' '}
          <span className="text-neon-green font-semibold">automates</span> repetitive tasks,
          enables seamless collaboration, and{' '}
          <span className="text-neon-purple font-semibold">boosts productivity</span> beyond imagination.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-wrap gap-6 justify-center mb-20"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-neon-green to-emerald-400 text-black font-inter font-bold rounded-full text-lg flex items-center gap-2 hover:shadow-2xl hover:shadow-neon-green/30 transition-all duration-300 animate-pulse-glow"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const featuresSection = document.getElementById('features');
              featuresSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-white/5 backdrop-blur-xl border-2 border-neon-purple/50 text-white font-inter font-semibold rounded-full text-lg flex items-center gap-2 hover:bg-neon-purple/10 hover:border-neon-purple hover:shadow-xl hover:shadow-neon-purple/20 transition-all duration-300"
          >
            Explore Features
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1, 
            delay: 1.5, 
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
          }}
          className="relative"
        >
          <DashboardPreview />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ModernHero;