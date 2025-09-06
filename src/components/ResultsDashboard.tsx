import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ShareResults from "@/components/ShareResults";
import { 
  BarChart3, 
  DollarSign, 
  Cog, 
  Shield, 
  Globe, 
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAnalysisFromUrl } from "@/services/shareService";
import type { AnalysisResult } from "@/services/ondemandApi";
import { debugAnalysis, debugLocalStorage } from "@/utils/debug";

const mockResults: AnalysisResult = {
  overallScore: 78,
  interpretation: "Highly Viable",
  scores: {
    market: 85,
    financial: 72,
    technical: 88,
    legal: 68,
    cultural: 82,
    competitive: 75
  },
  strengths: [
    "Strong market demand in UAE and Saudi Arabia",
    "Scalable SaaS business model with recurring revenue",
    "Technical implementation is feasible with existing technology",
    "Good cultural fit for Gulf business practices"
  ],
  concerns: [
    "Regulatory compliance requires additional attention",
    "High competition in fintech space",
    "Initial customer acquisition may be challenging"
  ],
  recommendations: [
    "Focus on regulatory compliance early in development",
    "Partner with local financial institutions for credibility",
    "Develop strong customer acquisition strategy",
    "Consider gradual market expansion starting with UAE"
  ],
  agentResponses: []
};

const ResultsDashboard = () => {
  // ✅ ALL HOOKS MUST BE AT THE TOP - BEFORE ANY CONDITIONS
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // ✅ ALL useEffect hooks BEFORE any early returns
  useEffect(() => {
    const loadResults = () => {
      console.log('🔍 Loading analysis results...');
      debugLocalStorage();
      
      try {
        // Try to get results from URL (for shared links)
        const urlResults = getAnalysisFromUrl();
        if (urlResults) {
          console.log('✅ Results loaded from URL');
          debugAnalysis('URL Results Loaded', urlResults);
          setResults(urlResults);
          setIsLoading(false);
          return;
        }

        // Otherwise, get from localStorage (from analysis flow)
        const storedResults = localStorage.getItem("analysisResults");
        console.log('📦 Raw localStorage data:', storedResults ? 'Found' : 'Not found');
        
        if (storedResults) {
          try {
            const parsed = JSON.parse(storedResults);
            console.log('✅ Results loaded from localStorage');
            debugAnalysis('LocalStorage Results Loaded', parsed);
            setResults(parsed);
          } catch (parseError) {
            console.error('❌ Failed to parse stored results:', parseError);
            setLoadError('Failed to parse stored analysis results');
            debugAnalysis('Parse Error', { storedResults, error: parseError });
          }
        } else {
          console.warn('⚠️ No stored results found, using mock data');
          setResults(mockResults);
        }
      } catch (error) {
        console.error('❌ Error loading results:', error);
        setLoadError('Failed to load analysis results');
        debugAnalysis('Load Error', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadResults();
  }, []);

  useEffect(() => {
    if (results) {
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [results]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Helper functions AFTER hooks but BEFORE early returns
  const getScoreColor = (score: number) => {
    if (score >= 80) return "score-excellent";
    if (score >= 65) return "score-good";
    if (score >= 50) return "score-fair";
    return "score-poor";
  };

  const getInterpretationColor = (score: number) => {
    if (score >= 80) return "text-success bg-success/10";
    if (score >= 65) return "text-primary bg-primary/10";
    if (score >= 50) return "text-warning bg-warning/10";
    return "text-destructive bg-destructive/10";
  };

  // ✅ Early returns ONLY after all hooks
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Loading Results...</h2>
          <p className="text-muted-foreground">Please wait while we prepare your analysis</p>
        </div>
      </div>
    );
  }

  // Error state
  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background">
        <Card className="card-professional text-center max-w-md">
          <div className="p-8">
            <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-destructive">Error Loading Results</h2>
            <p className="text-muted-foreground mb-6">{loadError}</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => window.location.reload()} variant="outline">
                Retry
              </Button>
              <Button onClick={() => navigate('/analyze')} className="btn-hero">
                New Analysis
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // No results state
  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background">
        <Card className="card-professional text-center max-w-md">
          <div className="p-8">
            <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Results Found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find any analysis results. Please start a new analysis.
            </p>
            <Button onClick={() => navigate('/analyze')} className="btn-hero">
              Start Analysis
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // ✅ Main component logic AFTER all early returns
  const scoreMetrics = [
    { label: "Market Opportunity", score: results.scores.market, icon: TrendingUp, color: "text-success" },
    { label: "Financial Viability", score: results.scores.financial, icon: DollarSign, color: "text-primary" },
    { label: "Technical Feasibility", score: results.scores.technical, icon: Cog, color: "text-primary-light" },
    { label: "Legal Compliance", score: results.scores.legal, icon: Shield, color: "text-warning" },
    { label: "Cultural Fit", score: results.scores.cultural, icon: Globe, color: "text-success" },
    { label: "Competitive Position", score: results.scores.competitive, icon: Users, color: "text-primary" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Analysis Results</h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive feasibility analysis for your startup
          </p>
        </div>

        {/* Overall Score Section */}
        <Card className="card-professional mb-12">
          <div className="p-8 text-center">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              
              {/* Score Circle */}
              <div className="flex-shrink-0">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="hsl(var(--muted))"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="hsl(var(--primary))"
                      strokeWidth="8"
                      strokeDasharray={`${animationComplete ? results.overallScore * 2.51 : 0} 251.2`}
                      strokeLinecap="round"
                      className="transition-all duration-2000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className={`text-4xl font-bold ${getScoreColor(results.overallScore)}`}>
                        {animationComplete ? results.overallScore : 0}
                      </div>
                      <div className="text-sm text-muted-foreground">/ 100</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interpretation */}
              <div className="flex-1 text-left lg:text-left">
                <div className={`inline-block px-6 py-3 rounded-full font-semibold text-lg mb-6 ${getInterpretationColor(results.overallScore)}`}>
                  {results.interpretation}
                </div>
                <h2 className="text-2xl font-bold mb-4">Your startup shows strong potential for success</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Based on our comprehensive analysis using 11 AI agents, your business demonstrates 
                  solid viability across multiple dimensions. The analysis reveals several key strengths 
                  while highlighting important areas for improvement.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {scoreMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card key={index} className="card-metric">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <IconComponent className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-muted-foreground">{metric.label}</h3>
                    <div className={`text-2xl font-bold ${getScoreColor(metric.score)}`}>
                      {metric.score}/100
                    </div>
                  </div>
                </div>
                <Progress 
                  value={animationComplete ? metric.score : 0} 
                  className="h-2"
                />
              </Card>
            );
          })}
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Strengths */}
          <Card className="card-professional">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold">Key Strengths</h3>
              </div>
              <div className="space-y-4">
                {results.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{strength}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Concerns */}
          <Card className="card-professional">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-warning" />
                </div>
                <h3 className="text-xl font-semibold">Critical Concerns</h3>
              </div>
              <div className="space-y-4">
                {results.concerns.map((concern, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{concern}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Recommendations */}
          <Card className="card-professional">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Priority Recommendations</h3>
              </div>
              <div className="space-y-4">
                {results.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-sm text-muted-foreground">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <Card className="card-professional">
          <div className="p-8">
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <ShareResults analysisResult={results} />
              <Button 
                variant="outline" 
                onClick={() => navigate('/analyze')}
                className="border-accent text-accent hover:bg-accent/5"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                New Analysis
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/contact')}
                className="border-success text-success hover:bg-success/5"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Consultation
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResultsDashboard;