import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Users, Globe, Shield, DollarSign, Cog, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { onDemandApi, type AnalysisRequest, type AnalysisResult } from "@/services/ondemandApi";
import { toast } from "@/components/ui/sonner";

interface AgentProgress {
  name: string;
  icon: any;
  status: 'pending' | 'running' | 'completed' | 'error';
  progress: number;
  result?: any;
}

const AnalysisProgress = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [agents, setAgents] = useState<AgentProgress[]>([
    { name: "Document Parser", icon: BarChart3, status: 'pending', progress: 0 },
    { name: "Market Research", icon: TrendingUp, status: 'pending', progress: 0 },
    { name: "Financial Analysis", icon: DollarSign, status: 'pending', progress: 0 },
    { name: "Technical Viability", icon: Cog, status: 'pending', progress: 0 },
    { name: "Legal Compliance", icon: Shield, status: 'pending', progress: 0 },
    { name: "Cultural Adaptation", icon: Globe, status: 'pending', progress: 0 },
    { name: "Competition Analysis", icon: Users, status: 'pending', progress: 0 },
    { name: "Final Scoring", icon: BarChart3, status: 'pending', progress: 0 },
  ]);

  useEffect(() => {
    startRealAnalysis();
  }, []);

  const startRealAnalysis = async () => {
    try {
      // Get the analysis request from localStorage
      const storedRequest = localStorage.getItem('analysisRequest');
      if (!storedRequest) {
        setError('No analysis request found');
        return;
      }

      const analysisRequest: AnalysisRequest = JSON.parse(storedRequest);
      
      // Start the comprehensive analysis
      await runComprehensiveAnalysis(analysisRequest);
      
    } catch (error) {
      console.error('Analysis failed:', error);
      setError('Analysis failed. Please try again.');
      toast.error('Analysis failed. Please try again.');
    }
  };

  const runComprehensiveAnalysis = async (request: AnalysisRequest) => {
    const agentSequence = [
      { index: 0, name: 'Document Parser', delay: 2000 },
      { index: 1, name: 'Market Research', delay: 3000 },
      { index: 2, name: 'Financial Feasibility', delay: 2500 },
      { index: 3, name: 'Technical Viability', delay: 2000 },
      { index: 4, name: 'Legal Regulatory', delay: 2800 },
      { index: 5, name: 'Cultural Adaptation', delay: 2200 },
      { index: 6, name: 'Competition Analysis', delay: 3200 },
      { index: 7, name: 'Final Scoring', delay: 1500 }
    ];

    // Start the comprehensive analysis in the background
    const analysisPromise = onDemandApi.getComprehensiveAnalysis(request);

    // Simulate progress for visual feedback
    for (let i = 0; i < agentSequence.length; i++) {
      const agent = agentSequence[i];
      
      // Set agent to running
      updateAgentStatus(agent.index, 'running', 10);
      setCurrentStage(agent.index);
      
      try {
        // Simulate progress for visual feedback
        await simulateProgress(agent.index, agent.delay);
        
        // Mark agent as completed
        updateAgentStatus(agent.index, 'completed', 100);
        
        // Update overall progress
        const overallProgress = ((i + 1) / agentSequence.length) * 85; // Leave 15% for final processing
        setProgress(overallProgress);
        
      } catch (error) {
        console.error(`Agent ${agent.name} simulation failed:`, error);
        updateAgentStatus(agent.index, 'error', 0);
        // Continue with other agents even if one fails
      }
    }

    // Wait for the actual analysis to complete
    try {
      setProgress(90);
      const finalResult = await analysisPromise;
      
      // Store results for the results page
      localStorage.setItem('analysisResults', JSON.stringify(finalResult));
      
      setProgress(100);
      setAnalysisComplete(true);
      
      // Redirect to results after a short delay
      setTimeout(() => {
        navigate('/results');
      }, 2000);
      
    } catch (error) {
      console.error('Comprehensive analysis failed:', error);
      setError('Failed to generate comprehensive analysis');
    }
  };

  const simulateProgress = async (agentIndex: number, duration: number) => {
    const steps = 20;
    const stepDuration = duration / steps;
    
    for (let step = 1; step <= steps; step++) {
      await new Promise(resolve => setTimeout(resolve, stepDuration));
      const progress = (step / steps) * 90; // Max 90% during simulation
      updateAgentStatus(agentIndex, 'running', progress);
    }
  };

  const updateAgentStatus = (index: number, status: AgentProgress['status'], progress: number) => {
    setAgents(prev => prev.map((agent, i) => 
      i === index ? { ...agent, status, progress } : agent
    ));
  };

  const getStatusIcon = (status: AgentProgress['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      case 'running':
        return <div className="loading-spinner w-5 h-5"></div>;
      default:
        return null;
    }
  };

  const getStatusColor = (status: AgentProgress['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'error':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'running':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted/30 text-muted-foreground border-border';
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center py-12">
        <div className="container mx-auto px-6 max-w-2xl">
          <Card className="card-professional text-center">
            <div className="p-12">
              <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-4 text-destructive">Analysis Failed</h1>
              <p className="text-muted-foreground text-lg mb-8">{error}</p>
              <button 
                onClick={() => navigate('/analyze')} 
                className="btn-hero"
              >
                Try Again
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <Card className="card-professional text-center">
          <div className="p-12">
            {/* Header */}
            <div className="mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                {analysisComplete ? (
                  <CheckCircle className="w-10 h-10 text-primary-foreground" />
                ) : (
                  <div className="loading-spinner w-10 h-10"></div>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-4">
                {analysisComplete ? 'Analysis Complete!' : 'Analyzing Your Startup'}
              </h1>
              <p className="text-muted-foreground text-lg">
                {analysisComplete 
                  ? 'Your comprehensive business analysis is ready'
                  : 'Our AI agents are working to provide you with comprehensive insights'
                }
              </p>
            </div>

            {/* Overall Progress Bar */}
            <div className="mb-12">
              <Progress 
                value={progress} 
                className="h-4 mb-4 bg-secondary" 
              />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-semibold text-primary">{Math.round(progress)}%</span>
              </div>
            </div>

            {/* Current Stage Indicator */}
            {!analysisComplete && currentStage < agents.length && (
              <div className="mb-12">
                <div className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl">
                  {(() => {
                    const IconComponent = agents[currentStage].icon;
                    return <IconComponent className="w-8 h-8 text-primary animate-pulse" />;
                  })()}
                  <span className="text-lg font-medium text-primary">
                    Running {agents[currentStage].name}...
                  </span>
                </div>
              </div>
            )}

            {/* Agent Progress Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {agents.map((agent, index) => {
                const IconComponent = agent.icon;
                
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${getStatusColor(agent.status)}`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <IconComponent className="w-6 h-6" />
                      <div className="text-left">
                        <span className="font-medium">{agent.name}</span>
                        <div className="text-sm opacity-75">
                          {agent.status === 'pending' && 'Waiting...'}
                          {agent.status === 'running' && `${Math.round(agent.progress)}%`}
                          {agent.status === 'completed' && 'Complete'}
                          {agent.status === 'error' && 'Failed'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {agent.status === 'running' && (
                        <div className="w-16">
                          <Progress value={agent.progress} className="h-2" />
                        </div>
                      )}
                      {getStatusIcon(agent.status)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Completion Message */}
            {analysisComplete && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-success/10 to-success/5 rounded-xl mb-6">
                  <CheckCircle className="w-8 h-8 text-success" />
                  <span className="text-lg font-medium text-success">
                    Analysis complete! Redirecting to results...
                  </span>
                </div>
              </div>
            )}

            {/* Time Estimate */}
            {!analysisComplete && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Estimated completion time: {Math.max(0, Math.round((100 - progress) * 0.3))} seconds remaining
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisProgress;