import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Users, Globe, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Startups Analyzed", value: "500+", icon: BarChart3 },
    { label: "Average Feasibility Score", value: "78%", icon: Users },
    { label: "GCC Countries Covered", value: "6", icon: Globe },
    { label: "AI Agents Working", value: "11", icon: Shield },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/30 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Hero Content */}
          <div className="mb-12 fade-up animate-in">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Validate Your Startup
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Before You Build
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              AI-powered market analysis for Gulf entrepreneurs. Get comprehensive feasibility reports 
              with investment-grade insights in just 60 seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => navigate('/analyze')}
                className="btn-hero text-lg"
              >
                Analyze Your Startup
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                className="text-primary border-primary hover:bg-primary/5 px-8 py-4 text-lg font-semibold"
              >
                View Sample Report
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 fade-up animate-in" style={{ animationDelay: '200ms' }}>
            <div className="card-professional text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">11 AI Agents</h3>
              <p className="text-muted-foreground">
                Specialized AI agents analyze every aspect of your business across market, 
                financial, technical, and cultural dimensions.
              </p>
            </div>

            <div className="card-professional text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-light rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">6-Dimension Analysis</h3>
              <p className="text-muted-foreground">
                Comprehensive evaluation covering market opportunity, financial viability, 
                technical feasibility, and Gulf-specific cultural considerations.
              </p>
            </div>

            <div className="card-professional text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-success to-success rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-success-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">GCC Expertise</h3>
              <p className="text-muted-foreground">
                Deep understanding of Gulf markets, regulations, and cultural nuances 
                to ensure your startup fits the regional ecosystem.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 fade-up animate-in" style={{ animationDelay: '400ms' }}>
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="card-metric text-center">
                  <IconComponent className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;