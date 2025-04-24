
import { Link } from "react-router-dom";
import { List } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white py-12 px-6 md:px-12 border-t border-gray-200">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <Link to="/" className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <span className="bg-black text-white w-8 h-8 rounded-md flex items-center justify-center">T</span>
              CompanyBuddy
            </Link>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-medium text-sm mb-3 text-gray-900">Pages</h4>
              <ul className="space-y-2">
                <li><Link to="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm">Dashboard</Link></li>
                
              </ul>
              <ul className="space-y-2">
                <li><Link to="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm">Login</Link></li>
                
              </ul>
            </div>
            
        
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 text-center text-gray-500 text-sm">
          <p>© 2025 CompanyBuddy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
