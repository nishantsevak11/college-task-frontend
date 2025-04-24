
import { ArrowRight, List } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <>
      <section className="bg-gradient-to-r from-gray-50 to-blue-50 min-h-[80vh] w-full flex flex-col items-center relative overflow-hidden py-16">
        {/* Announcement banner */}
        <div className="mb-16 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-full flex items-center gap-2 animate-fade-in">
          <List className="h-4 w-4 text-blue-600" />
          <span className="text-gray-800 text-sm font-medium">Simple Easy Task Management</span>
          {/* <span className="text-blue-600 text-sm font-medium flex items-center gap-1">
            Learn more <ArrowRight className="h-3 w-3" />
          </span> */}
        </div>
        
        {/* Main hero content */}
        <div className="container mx-auto px-6 text-center max-w-4xl animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Manage Tasks with
            <br />
            Unmatched Efficiency
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Transform your workflow with intelligent task management. <span className="font-semibold">Automate</span> repetitive tasks, 
            collaborate seamlessly, and boost productivity.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={"dashboard"} className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Get Started
            </Link>
            <button onClick={scrollToFeatures} className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors">
              Features <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Dashboard Preview */}
        <div className="mt-16 w-full max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-xl p-4 animate-fade-in">
            <div className="aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <div className="p-6">
              <img src="./dash.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        
        <div ref={featuresRef}></div>
      </section>
    </>
  );
};

export default Hero;
