import { Users, Code, Brain, Rocket } from "lucide-react";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Simeon Wansi",
      role: "Founder & CEO",
      image: "/api/placeholder/150/150",
      bio: "Visionary entrepreneur with deep expertise in GCC markets and AI-driven business solutions.",
      expertise: ["GCC Markets", "AI Strategy", "Business Development"]
    },
    {
      name: "Development Team",
      role: "Technical Excellence",
      image: "/api/placeholder/150/150",
      bio: "Experienced engineers specializing in AI integration and scalable web applications.",
      expertise: ["AI Integration", "React/TypeScript", "Cloud Architecture"]
    },
    {
      name: "Research Team",
      role: "Market Intelligence",
      image: "/api/placeholder/150/150",
      bio: "Regional experts providing deep insights into GCC business landscapes and regulations.",
      expertise: ["Market Research", "Regulatory Analysis", "Cultural Intelligence"]
    }
  ];

  const companyValues = [
    {
      icon: Brain,
      title: "Innovation First",
      description: "Leveraging cutting-edge AI to solve real business challenges"
    },
    {
      icon: Users,
      title: "Client Success",
      description: "Committed to empowering entrepreneurs with actionable insights"
    },
    {
      icon: Code,
      title: "Technical Excellence",
      description: "Building reliable, scalable, and secure platform solutions"
    },
    {
      icon: Rocket,
      title: "GCC Focus",
      description: "Deep specialization in Gulf region markets and opportunities"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Team Header */}
        <div className="text-center mb-16 fade-up animate-in">
          <h2 className="text-4xl font-bold mb-6">Meet the 42Bytes Team</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A passionate team of entrepreneurs, engineers, and GCC market experts dedicated 
            to transforming startup validation through AI-powered insights.
          </p>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 fade-up animate-in">
          {teamMembers.map((member, index) => (
            <div key={index} className="card-professional text-center group">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Users className="w-16 h-16 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-primary font-medium mb-4">{member.role}</p>
              <p className="text-muted-foreground text-sm mb-6">{member.bio}</p>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {member.expertise.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Company Values */}
        <div className="fade-up animate-in">
          <h3 className="text-3xl font-bold text-center mb-12">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="card-professional text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-4">{value.title}</h4>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 fade-up animate-in">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2025</div>
            <div className="text-muted-foreground text-sm">Founded</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground text-sm">Startups Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">6</div>
            <div className="text-muted-foreground text-sm">GCC Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">78%</div>
            <div className="text-muted-foreground text-sm">Avg Success Score</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 fade-up animate-in">
          <div className="card-professional max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Join Our Mission</h3>
            <p className="text-muted-foreground mb-6">
              We're building the future of startup validation in the GCC region. 
              Connect with us to be part of this exciting journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-hero">Get Started Today</button>
              <button className="btn-accent">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
