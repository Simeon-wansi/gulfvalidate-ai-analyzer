import { TrendingUp, Target, Globe, BarChart3 } from "lucide-react";

const HeroAbout = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16 fade-up animate-in">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-8">
            <TrendingUp className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Empowering GCC Entrepreneurs
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            GulfValidate provides AI-driven startup validation specifically designed for the Gulf Cooperation Council markets. 
            We help entrepreneurs make informed decisions through comprehensive feasibility analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="card-professional text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">GCC-Focused Analysis</h3>
            <p className="text-muted-foreground">
              Specialized validation for UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman markets
            </p>
          </div>

          <div className="card-professional text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">AI-Powered Insights</h3>
            <p className="text-muted-foreground">
              Leveraging advanced AI agents for comprehensive business analysis and market validation
            </p>
          </div>

          <div className="card-professional text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Cultural Intelligence</h3>
            <p className="text-muted-foreground">
              Deep understanding of regional business practices, regulations, and cultural nuances
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroAbout;
