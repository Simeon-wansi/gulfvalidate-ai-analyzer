import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Users, Globe, Shield, DollarSign, Cog } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AnalysisProgress = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);

  const stages = [
    { name: "Parsing business description", icon: BarChart3, duration: 8 },
    { name: "Analyzing market opportunity", icon: TrendingUp, duration: 12 },
    { name: "Evaluating competition", icon: Users, duration: 10 },
    { name: "Assessing financial viability", icon: DollarSign, duration: 8 },
    { name: "Checking technical feasibility", icon: Cog, duration: 6 },
    { name: "Reviewing legal compliance", icon: Shield, duration: 7 },
    { name: "Analyzing cultural fit", icon: Globe, duration: 9 },
    { name: "Generating final report", icon: BarChart3, duration: 5 },
  ];

  useEffect(() => {
    let totalDuration = 0;
    let currentDuration = 0;
    
    const timer = setInterval(() => {
      if (currentStage < stages.length) {
        const stageDuration = stages[currentStage].duration * 1000; // Convert to milliseconds
        currentDuration += 200; // Update every 200ms
        
        if (currentDuration >= stageDuration) {
          setCurrentStage(prev => prev + 1);
          currentDuration = 0;
          totalDuration += stageDuration;
        }
        
        // Calculate overall progress
        const stageProgress = (currentDuration / stageDuration) * 100;
        const completedStages = currentStage;
        const overallProgress = ((completedStages * 100) + stageProgress) / stages.length;
        setProgress(Math.min(overallProgress, 100));
      } else {
        setProgress(100);
        setTimeout(() => {
          navigate('/results');
        }, 1500);
      }
    }, 200);

    return () => clearInterval(timer);
  }, [currentStage, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center py-12">
      <div className="container mx-auto px-6 max-w-2xl">
        <Card className="card-professional text-center">
          <div className="p-12">
            {/* Header */}
            <div className="mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="loading-spinner w-10 h-10"></div>
              </div>
              <h1 className="text-3xl font-bold mb-4">Analyzing Your Startup</h1>
              <p className="text-muted-foreground text-lg">
                Our AI agents are working to provide you with comprehensive insights
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-12">
              <Progress 
                value={progress} 
                className="h-3 mb-4 bg-secondary" 
                style={{
                  background: 'hsl(var(--secondary))',
                }}
              />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold text-primary">{Math.round(progress)}%</span>
              </div>
            </div>

            {/* Current Stage */}
            <div className="mb-12">
              {currentStage < stages.length && (
                <div className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl">
                  {(() => {
                    const IconComponent = stages[currentStage].icon;
                    return <IconComponent className="w-8 h-8 text-primary animate-pulse" />;
                  })()}
                  <span className="text-lg font-medium text-primary">
                    {stages[currentStage].name}...
                  </span>
                </div>
              )}
              
              {currentStage >= stages.length && (
                <div className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-success/10 to-success/5 rounded-xl">
                  <BarChart3 className="w-8 h-8 text-success" />
                  <span className="text-lg font-medium text-success">
                    Analysis complete! Redirecting to results...
                  </span>
                </div>
              )}
            </div>

            {/* Stages List */}
            <div className="grid grid-cols-1 gap-3">
              {stages.map((stage, index) => {
                const IconComponent = stage.icon;
                const isCompleted = index < currentStage;
                const isCurrent = index === currentStage;
                const isPending = index > currentStage;
                
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${
                      isCompleted
                        ? 'bg-success/10 text-success'
                        : isCurrent
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted/30 text-muted-foreground'
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 ${isCurrent ? 'animate-pulse' : ''}`} />
                    <span className="font-medium">{stage.name}</span>
                    {isCompleted && <span className="ml-auto text-sm">✓</span>}
                  </div>
                );
              })}
            </div>

            {/* Time Estimate */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Analysis typically takes 30-60 seconds
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisProgress;