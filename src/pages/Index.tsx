import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ModernNavbar from '@/components/ModernNavbar';
import ModernHero from '@/components/HomePage/ModernHero';
import ModernFeatures from '@/components/HomePage/ModernFeatures';
import ModernTimeline from '@/components/HomePage/ModernTimeline';
import ModernFooter from '@/components/HomePage/ModernFooter';

const Index = () => {
  useEffect(() => {
    // Smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const timelineSteps = [
    {
      step: 1,
      title: "Get Started with Registration",
      content: "Simple Login or register using email and password and get started with your company",
      image: "https://plus.unsplash.com/premium_photo-1681487814165-018814e29155?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9naW58ZW58MHx8MHx8fDA%3D"
    },
    {
      step: 2,
      title: "Create or Join a Company",
      content: "Now you can create company or join any company if invited in notification section",
      image: "./company.png"
    },
    {
      step: 3,
      title: "Explore Task Management Features",
      content: "Once company created you can explore all features like task creation and all that is important in task management",
      image: "./dash.png"
    },
    {
      step: 4,
      title: "Invite and Manage Employees",
      content: "You can invite employees to your company and manage them. Just send them invitation using email and they can join your company and start using it",
      image: "./invite.png"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111111] to-[#0D0D0D] relative overflow-x-hidden">
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

      <ModernNavbar />
      <ModernHero />
      <ModernFeatures />
      <ModernTimeline steps={timelineSteps} />
      <ModernFooter />
    </div>
  );
};

export default Index;