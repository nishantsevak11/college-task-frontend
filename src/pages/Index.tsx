
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { ArrowRight, Check, CheckCircle2, Users } from 'lucide-react';

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Effortless Task Management for Productive Teams
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Streamline your workflow with an elegant and intuitive platform designed to help teams collaborate seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="rounded-lg">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-lg"
                onClick={scrollToFeatures}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative reveal">
            <div className="glass-card rounded-xl overflow-hidden shadow-xl transform transition-all hover:scale-[1.02] duration-500">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Task management dashboard"
                className="w-full h-auto rounded-t-xl"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Keep everything organized</h3>
                <p className="text-gray-600">Intuitive interface designed for seamless team collaboration</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-blue-50 p-5 rounded-xl shadow-md transform rotate-3 hover:rotate-0 transition-all duration-300">
              <CheckCircle2 className="text-blue-500 h-10 w-10" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="py-20 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl font-bold mb-4">Designed for Productivity</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers everything you need to manage tasks, collaborate with your team, and track progress in one beautiful interface.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-xl reveal">
              <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
              <p className="text-gray-600">Create companies, invite team members, and work together seamlessly on projects.</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl reveal">
              <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Task Assignment</h3>
              <p className="text-gray-600">Assign tasks to team members, set priorities, and track progress in real-time.</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl reveal">
              <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Status Updates</h3>
              <p className="text-gray-600">Keep everyone in the loop with real-time status updates and comments on tasks.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center reveal">
          <h2 className="text-3xl font-bold mb-6">Ready to boost your team's productivity?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of teams that use our platform to stay organized and get more done.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="rounded-lg">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <span className="bg-black text-white w-8 h-8 rounded-md flex items-center justify-center">T</span>
                Taskify
              </div>
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Taskify. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
