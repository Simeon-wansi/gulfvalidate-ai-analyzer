import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <header className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground sticky top-0 z-50 shadow-[var(--shadow-medium)]">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">GulfValidate</h1>
              <p className="text-xs text-primary-foreground/80">AI-powered startup validation</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => navigate('/')}
              className={`font-medium transition-colors hover:text-accent ${
                location.pathname === '/' ? 'text-accent' : 'text-primary-foreground/90'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => navigate('/analyze')}
              className={`font-medium transition-colors hover:text-accent ${
                location.pathname === '/analyze' ? 'text-accent' : 'text-primary-foreground/90'
              }`}
            >
              Analyze
            </button>
            <button 
              onClick={() => navigate('/about')}
              className={`font-medium transition-colors hover:text-accent ${
                location.pathname === '/about' ? 'text-accent' : 'text-primary-foreground/90'
              }`}
            >
              About
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className={`font-medium transition-colors hover:text-accent ${
                location.pathname === '/contact' ? 'text-accent' : 'text-primary-foreground/90'
              }`}
            >
              Contact
            </button>
          </nav>

          {location.pathname === '/' && (
            <Button 
              onClick={() => navigate('/analyze')}
              className="btn-accent hidden md:block"
            >
              Start Analysis
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;