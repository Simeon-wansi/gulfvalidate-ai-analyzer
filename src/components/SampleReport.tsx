import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
  Rocket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SampleReportProps {
  isOpen: boolean;
  onClose: () => void;
}

const sampleData = {
  startupName: "DeliveryFlow - AI logistics platform for UAE",
  overallScore: 82,
  interpretation: "Highly Viable",
  scores: {
    market: 88,
    financial: 78,
    technical: 85,
    legal: 72,
    cultural: 84,
    competitive: 79,
  },
  strengths: [
    "Strong market demand for efficient logistics solutions in UAE's growing e-commerce sector.",
    "Government support through UAE's logistics strategy and smart city initiatives.",
    "Advanced AI technology provides significant competitive advantage in route optimization.",
    "High smartphone penetration and tech-savvy population ready for digital logistics solutions.",
  ],
  concerns: [
    "Intense competition from established logistics giants like Aramex and international players.",
    "Regulatory complexity around autonomous delivery and data privacy in the UAE.",
    "High initial capital requirements for fleet expansion and technology infrastructure.",
  ],
  recommendations: [
    "Partner with major e-commerce platforms and local retailers to establish market presence.",
    "Start with a focused pilot program in Dubai's tech-forward districts like DIFC and Dubai Internet City.",
    "Develop strategic alliances with local logistics companies to leverage existing infrastructure.",
    "Focus on B2B logistics first to generate steady revenue before expanding to consumer market.",
    "Engage early with RTA and relevant authorities to ensure compliance with emerging regulations.",
  ],
};

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

const scoreMetrics = [
  { label: "Market Opportunity", score: sampleData.scores.market, icon: TrendingUp, color: "text-success" },
  { label: "Financial Viability", score: sampleData.scores.financial, icon: DollarSign, color: "text-primary" },
  { label: "Technical Feasibility", score: sampleData.scores.technical, icon: Cog, color: "text-primary-light" },
  { label: "Legal Compliance", score: sampleData.scores.legal, icon: Shield, color: "text-warning" },
  { label: "Cultural Fit", score: sampleData.scores.cultural, icon: Globe, color: "text-success" },
  { label: "Competitive Position", score: sampleData.scores.competitive, icon: Users, color: "text-primary" }
];

export function SampleReport({ isOpen, onClose }: SampleReportProps) {
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setAnimationComplete(true), 300);
      return () => clearTimeout(timer);
    } else {
      setAnimationComplete(false);
    }
  }, [isOpen]);

  const handleStartAnalysis = () => {
    onClose();
    navigate("/analyze");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-center">
            Sample Analysis: <span className="text-primary">{sampleData.startupName}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-8">
          {/* Overall Score */}
          <div className="card-professional p-6 text-center">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="hsl(var(--muted))" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="40" fill="transparent" stroke="hsl(var(--primary))"
                      strokeWidth="8" strokeDasharray={`${animationComplete ? sampleData.overallScore * 2.51 : 0} 251.2`}
                      strokeLinecap="round" className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className={`text-4xl font-bold ${getScoreColor(sampleData.overallScore)}`}>
                        {animationComplete ? sampleData.overallScore : 0}
                      </div>
                      <div className="text-sm text-muted-foreground">/ 100</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-left">
                <div className={`inline-block px-4 py-2 rounded-full font-semibold mb-4 ${getInterpretationColor(sampleData.overallScore)}`}>
                  {sampleData.interpretation}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  This sample demonstrates the comprehensive analysis GulfValidate provides, offering deep insights into the viability of a startup within the GCC market.
                </p>
              </div>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {scoreMetrics.map((metric, index) => (
              <div key={index} className="card-metric p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <metric.icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs text-muted-foreground">{metric.label}</h3>
                    <div className={`text-xl font-bold ${getScoreColor(metric.score)}`}>{metric.score}/100</div>
                  </div>
                </div>
                <Progress value={animationComplete ? metric.score : 0} className="h-2" />
              </div>
            ))}
          </div>

          {/* Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card-professional p-4">
              <div className="flex items-center gap-3 mb-4"><CheckCircle className="w-6 h-6 text-success" /> <h3 className="text-lg font-semibold">Key Strengths</h3></div>
              <div className="space-y-3">
                {sampleData.strengths.map((s, i) => <div key={i} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" /><p className="text-xs text-muted-foreground">{s}</p></div>)}
              </div>
            </div>
            <div className="card-professional p-4">
              <div className="flex items-center gap-3 mb-4"><AlertTriangle className="w-6 h-6 text-warning" /> <h3 className="text-lg font-semibold">Critical Concerns</h3></div>
              <div className="space-y-3">
                {sampleData.concerns.map((c, i) => <div key={i} className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-warning mt-1 flex-shrink-0" /><p className="text-xs text-muted-foreground">{c}</p></div>)}
              </div>
            </div>
            <div className="card-professional p-4">
              <div className="flex items-center gap-3 mb-4"><BarChart3 className="w-6 h-6 text-primary" /> <h3 className="text-lg font-semibold">Recommendations</h3></div>
              <div className="space-y-3">
                {sampleData.recommendations.map((r, i) => <div key={i} className="flex items-start gap-2"><div className="w-4 h-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">{i + 1}</div><p className="text-xs text-muted-foreground">{r}</p></div>)}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="p-6 pt-0 bg-background border-t border-border">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button className="btn-hero" onClick={handleStartAnalysis}>
            <Rocket className="w-5 h-5 mr-2" />
            Start Your Analysis
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
