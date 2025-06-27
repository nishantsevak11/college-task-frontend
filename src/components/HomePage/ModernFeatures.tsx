import { motion, useInView } from 'framer-motion';
import { List, Calendar, ArrowRight, Users, Zap, Shield, Target, Smartphone } from 'lucide-react';
import { useRef } from 'react';

const ModernFeatures = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const features = [
    {
      icon: List,
      title: "Smart Task Management",
      description: "AI-powered task prioritization and intelligent scheduling that adapts to your workflow.",
      color: "neon-green",
      delay: 0
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Real-time collaboration tools with instant sync across all devices and platforms.",
      color: "neon-purple",
      delay: 0.1
    },
    {
      icon: Calendar,
      title: "Advanced Planning",
      description: "Dynamic calendar integration with smart notifications and deadline management.",
      color: "neon-blue",
      delay: 0.2
    },
    {
      icon: Zap,
      title: "Automation Engine",
      description: "Powerful workflow automation that eliminates repetitive tasks and boosts efficiency.",
      color: "yellow-400",
      delay: 0.3
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption and advanced access controls.",
      color: "red-400",
      delay: 0.4
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Native mobile experience with offline capabilities and seamless synchronization.",
      color: "cyan-400",
      delay: 0.5
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }
    }
  };

  return (
    <section id="features" className="py-32 px-6 relative">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block bg-gradient-to-r from-neon-green/20 to-neon-purple/20 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full mb-6"
          >
            <span className="text-neon-green font-inter font-medium">Smart Task Management</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-syne font-bold text-white mb-6 leading-tight">
            Designed for{' '}
            <span className="text-transparent bg-gradient-to-r from-neon-purple to-violet-400 bg-clip-text">
              Modern Teams
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-inter leading-relaxed">
            Our intelligent task management system adapts to your team's unique workflow,
            providing powerful automation and seamless collaboration features that scale with your ambitions.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 h-full hover:bg-white/10 transition-all duration-500 hover:border-white/20">
                  {/* Gradient Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-${feature.color}/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                  
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className={`w-16 h-16 bg-gradient-to-r from-${feature.color} to-${feature.color}/80 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-${feature.color}/25`}
                    >
                      <IconComponent className="h-8 w-8 text-black" />
                    </motion.div>

                    <h3 className="text-2xl font-syne font-bold text-white mb-4 group-hover:text-neon-green transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-300 font-inter leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {feature.description}
                    </p>

                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 mt-6 text-neon-green font-inter font-medium"
                    >
                      Learn more
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Feature Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-gray-400 font-inter mb-6">Explore our core capabilities</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Team Collaboration',
              'Time Tracking', 
              'Smart Prioritization',
              'Real-time Sync',
              'Advanced Analytics',
              'Custom Workflows'
            ].map((tag, index) => (
              <motion.button
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-gray-300 font-inter font-medium flex items-center gap-2 hover:bg-neon-green/10 hover:border-neon-green/30 hover:text-neon-green transition-all duration-300"
              >
                <Target className="h-4 w-4" />
                {tag}
                <ArrowRight className="h-3 w-3" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-r from-neon-green/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-neon-purple/10 to-transparent rounded-full blur-3xl" />
    </section>
  );
};

export default ModernFeatures;