import HeroAbout from "@/components/AboutSections/HeroAbout";
import TechnologySection from "@/components/AboutSections/TechnologySection";
import TeamSection from "@/components/AboutSections/TeamSection";
import HowItWorksSection from "@/components/AboutSections/HowItWorksSection";

const About = () => {
  return (
    <div className="min-h-screen">
      <main>
        <HeroAbout />
        <TechnologySection />
        <HowItWorksSection />
        <TeamSection />
      </main>
    </div>
  );
};

export default About;
