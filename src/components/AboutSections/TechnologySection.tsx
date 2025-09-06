import { Brain, Zap, Database, Shield, Globe, BarChart3, TrendingUp, Users, FileText, Calculator, Scale } from "lucide-react";

const TechnologySection = () => {
  const agents = [
    {
      icon: Brain,
      name: "Master Orchestrator",
      description: "Coordinates comprehensive analysis across all specialized agents",
      specialty: "Analysis Coordination"
    },
    {
      icon: FileText,
      name: "Document Parser",
      description: "Extracts insights from business plans, pitch decks, and documents",
      specialty: "Document Analysis"
    },
    {
      icon: TrendingUp,
      name: "Market Research",
      description: "Analyzes GCC market opportunities, size, and growth potential",
      specialty: "Market Intelligence"
    },
    {
      icon: Calculator,
      name: "Financial Feasibility",
      description: "Evaluates revenue models, unit economics, and funding requirements",
      specialty: "Financial Analysis"
    },
    {
      icon: Zap,
      name: "Technical Viability",
      description: "Assesses implementation complexity and scalability requirements",
      specialty: "Technical Assessment"
    },
    {
      icon: Scale,
      name: "Legal & Regulatory",
      description: "Reviews compliance requirements and legal considerations",
      specialty: "Legal Compliance"
    },
    {
      icon: Globe,
      name: "Cultural Adaptation",
      description: "Analyzes cultural fit and localization needs for GCC markets",
      specialty: "Cultural Intelligence"
    },
    {
      icon: Users,
      name: "Competition Analysis",
      description: "Evaluates competitive landscape and positioning opportunities",
      specialty: "Competitive Intelligence"
    },
    {
      icon: Database,
      name: "Research & Insights",
      description: "Gathers comprehensive data and industry insights",
      specialty: "Data Research"
    },
    {
      icon: BarChart3,
      name: "Summary Scoring",
      description: "Generates final scores and comprehensive assessment",
      specialty: "Performance Scoring"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/10 via-background to-secondary/10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16 fade-up animate-in">
          <h2 className="text-4xl font-bold mb-6">Advanced AI Technology Stack</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powered by OnDemand.io's cutting-edge AI platform, our system deploys 11 specialized 
            agents working in harmony to deliver comprehensive startup validation.
          </p>
        </div>

        {/* Technology Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 fade-up animate-in">
          <div className="card-professional">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold">OnDemand.io Integration</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Our platform leverages OnDemand.io's enterprise-grade AI infrastructure to deliver 
              reliable, scalable, and accurate business analysis.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                99.9% uptime reliability
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                Enterprise-grade security
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                Real-time processing
              </li>
            </ul>
          </div>

          <div className="card-professional">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold">6-Dimension Analysis</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Every startup is evaluated across six critical dimensions specifically calibrated 
              for the GCC business environment.
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                Market Research
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                Financial Feasibility
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                Technical Viability
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                Legal Compliance
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                Cultural Adaptation
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                Competition Analysis
              </div>
            </div>
          </div>
        </div>

        {/* AI Agents Grid */}
        <div className="fade-up animate-in">
          <h3 className="text-3xl font-bold text-center mb-12">Our Specialized AI Agents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, index) => {
              const IconComponent = agent.icon;
              return (
                <div key={index} className="card-professional group hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">{agent.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{agent.description}</p>
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {agent.specialty}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 fade-up animate-in">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">99.2%</div>
            <div className="text-muted-foreground">Analysis Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">&lt;30s</div>
            <div className="text-muted-foreground">Average Processing Time</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">11</div>
            <div className="text-muted-foreground">Specialized AI Agents</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
