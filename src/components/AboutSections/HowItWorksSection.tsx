import { FileText, BarChart3, TrendingUp, CheckCircle, Zap, Shield } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: FileText,
      title: "1. Submit Your Idea",
      description: "Provide your business details and upload your business plan or pitch deck through our secure form."
    },
    {
      icon: Zap,
      title: "2. AI Analysis",
      description: "Our 11 specialized AI agents analyze your submission across 6 critical dimensions for the GCC market."
    },

    {
      icon: BarChart3,
      title: "3. Comprehensive Scoring",
      description: "Receive detailed scores for market, financial, technical, legal, cultural, and competitive feasibility."
    },
    {
      icon: TrendingUp,
      title: "4. Actionable Insights",
      description: "Get key strengths, critical concerns, and priority recommendations to guide your next steps."
    },
    {
      icon: CheckCircle,
      title: "5. Make Informed Decisions",
      description: "Use your investment-grade report to refine your strategy, pitch to investors, and accelerate growth."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/10 via-background to-secondary/10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16 fade-up animate-in">
          <h2 className="text-4xl font-bold mb-6">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A streamlined process to transform your startup idea into a validated, 
            investment-ready business plan for the GCC region.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 to-accent/20 hidden md:block"></div>

          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            const IconComponent = step.icon;

            return (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center mb-12 fade-up animate-in`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Content */}
                <div className={`w-full md:w-5/12 ${isEven ? 'md:order-1' : 'md:order-3'}`}>
                  <div className="card-professional group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="w-full md:w-2/12 flex justify-center md:order-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full border-4 border-background shadow-md"></div>
                </div>

                {/* Spacer */}
                <div className={`w-full md:w-5/12 ${isEven ? 'md:order-3' : 'md:order-1'}`}></div>
              </div>
            );
          })}
        </div>

        {/* 6-Dimension Analysis */}
        <div className="mt-20 fade-up animate-in">
          <h3 className="text-3xl font-bold text-center mb-12">Our 6-Dimension Analysis Framework</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Market Research",
              "Financial Feasibility",
              "Technical Viability",
              "Legal & Regulatory",
              "Cultural Adaptation",
              "Competitive Analysis"
            ].map((dimension, index) => (
              <div key={index} className="card-professional flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold">{dimension}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
