
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface TimelineStep {
  step: number;
  title: string;
  content: string;
  image: string;
}

interface ModernTimelineProps {
  steps: TimelineStep[];
}

const ModernTimeline = ({ steps }: ModernTimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 px-6 relative">
      <div className="container mx-auto max-w-6xl">
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
            className="inline-block bg-gradient-to-r from-neon-purple/20 to-neon-green/20 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full mb-6"
          >
            <span className="text-neon-purple font-inter font-medium">How It Works</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-syne font-bold text-white mb-6 leading-tight">
            Delivering{' '}
            <span className="text-transparent bg-gradient-to-r from-neon-green to-emerald-400 bg-clip-text">
              Tangible Results
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-inter leading-relaxed">
            That Propel Success
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Central Timeline Line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute left-8 md:left-1/2 top-0 w-1 bg-gradient-to-b from-neon-green via-neon-purple to-neon-blue transform -translate-x-1/2 rounded-full"
          />

          {/* Timeline Steps */}
          <div className="space-y-32">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col gap-8 md:gap-16`}
                >
                  {/* Step Number */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                    className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r ${
                      step.step === 1 ? 'from-neon-green to-emerald-400' :
                      step.step === 2 ? 'from-neon-purple to-violet-400' :
                      step.step === 3 ? 'from-neon-blue to-cyan-400' :
                      'from-yellow-400 to-orange-400'
                    } rounded-2xl flex items-center justify-center text-black font-syne font-bold text-xl shadow-2xl z-10`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {step.step}
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className={`w-full md:w-2/5 ${isEven ? 'md:ml-16' : 'md:mr-16'} ml-20 md:ml-0`}
                  >
                    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="h-6 w-6 text-neon-green" />
                        <h3 className="text-2xl font-syne font-bold text-white">
                          {step.title}
                        </h3>
                      </div>
                      
                      <p className="text-gray-300 font-inter leading-relaxed mb-6">
                        {step.content}
                      </p>
                      
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-neon-green font-inter font-medium cursor-pointer"
                      >
                        Learn more
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Image Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, rotateY: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`w-full md:w-2/5 ${isEven ? 'md:mr-16' : 'md:ml-16'} ml-20 md:ml-0`}
                  >
                    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-4 overflow-hidden hover:border-white/20 transition-all duration-500">
                      {/* Browser Chrome */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-t-2xl p-4 flex items-center justify-between border-b border-white/10">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-400"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <ArrowRight className="h-4 w-4 rotate-180" />
                          <ArrowRight className="h-4 w-4" />
                          <span className="text-xs">•••</span>
                        </div>
                      </div>

                      {/* Image Content */}
                      <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-b-2xl overflow-hidden">
                        <motion.img
                          initial={{ opacity: 0, scale: 1.1 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.8, delay: 1.2 + index * 0.2 }}
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-neon-green/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-neon-purple/5 to-transparent rounded-full blur-3xl" />
    </section>
  );
};

export default ModernTimeline;