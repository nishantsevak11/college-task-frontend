import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { ArrowRight, Moon, Headphones, Calendar } from 'lucide-react';
import Hero from '@/components/HomePage/Hero';
import Footer from '@/components/HomePage/Footer';
import CTA from '@/components/HomePage/CTA';
import CodeExample from '@/components/HomePage/CodeExample';
import Features from '@/components/HomePage/Features';

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

  const howItWorks = [
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
      content: "You can invite empoloyees to your company and manage them. Just send them invitation using email and they can join your company and start using it",
      image: "./invite.png"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      
      <Hero/>
      <Features />

      <div>
        {
          howItWorks.map((item, index) => (
            <CodeExample step={item.step} title={item.title} content={item.content} image={item.image}/>
          ))
        }
      </div>

      {/* <CTA /> */}
      <Footer/>

      {/* Hero Section
      <section 
        ref={heroRef}
        className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">
              Transform Your Sleep Tonight
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover personalized sleep solutions with our elegant and intuitive platform designed for better rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-lg border-gray-300 text-gray-900 hover:bg-gray-100"
                onClick={scrollToFeatures}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative reveal">
            <div className="glass-card rounded-xl overflow-hidden shadow-xl transform transition-all hover:scale-[1.02] duration-500">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                alt="Serene bedroom"
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Peaceful Sleep Starts Here</h3>
                <p className="text-gray-600">A serene interface designed for your restful nights</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-purple-50 p-5 rounded-xl shadow-md transform rotate-3 hover:rotate-0 transition-all duration-300">
              <Moon className="text-purple-500 h-10 w-10" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      {/* <section 
        ref={featuresRef}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Designed for Better Sleep</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers tools to track, enhance, and schedule your sleep in one beautiful interface.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-xl reveal">
              <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Moon className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Sleep Tracking</h3>
              <p className="text-gray-600">Monitor your sleep patterns and improve your rest with detailed insights.</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl reveal">
              <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                <Headphones className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Guided Meditations</h3>
              <p className="text-gray-600">Relax with curated audio sessions to ease into deep sleep.</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl reveal">
              <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Sleep Schedule</h3>
              <p className="text-gray-600">Plan your sleep routine with personalized reminders.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}

    </div>
  );
};

export default Index;