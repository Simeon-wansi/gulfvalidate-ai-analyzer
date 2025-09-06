import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle, BarChart3, Globe, Cog, FileText, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { onDemandApi, type AnalysisRequest } from "@/services/ondemandApi";
import { toast } from "@/components/ui/sonner";

interface FormData {
  businessDescription: string;
  targetMarkets: string;
  businessStage: string;
  businessModel: string;
  documentFile?: File;
}

const AnalysisForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    businessDescription: "",
    targetMarkets: "",
    businessStage: "",
    businessModel: ""
  });

  const steps = [
    { number: 1, title: "Business Details", icon: FileText },
    { number: 2, title: "Market Selection", icon: Globe },
    { number: 3, title: "Business Stage", icon: Cog },
    { number: 4, title: "Business Model", icon: BarChart3 }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const request: AnalysisRequest = {
        businessDescription: formData.businessDescription,
        targetMarkets: formData.targetMarkets,
        businessStage: formData.businessStage,
        businessModel: formData.businessModel,
        documentFile: formData.documentFile
      };

      // Store analysis request for the analysis page
      localStorage.setItem('analysisRequest', JSON.stringify(request));
      
      // Start the analysis
      const sessionId = await onDemandApi.startAnalysis(request);
      localStorage.setItem('analysisSessionId', sessionId);
      
      toast.success("Analysis started successfully!");
      navigate('/analysis');
      
    } catch (error) {
      console.error('Analysis failed:', error);
      toast.error("Failed to start analysis. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setFormData({ ...formData, documentFile: file });
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setFormData({ ...formData, documentFile: file });
      }
    }
  };

  const validateFile = (file: File): boolean => {
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PDF, Word document, or text file.");
      return false;
    }

    if (file.size > maxSize) {
      toast.error("File size must be less than 10MB.");
      return false;
    }

    return true;
  };

  const removeFile = () => {
    setFormData({ ...formData, documentFile: undefined });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.businessDescription.length >= 50;
      case 2:
        return formData.targetMarkets !== "";
      case 3:
        return formData.businessStage !== "";
      case 4:
        return formData.businessModel !== "";
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Progress Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-center mb-8">Business Analysis Form</h1>
          
          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                
                return (
                  <div key={step.number} className="flex items-center">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300
                      ${isCompleted ? 'bg-success text-success-foreground' : 
                        isActive ? 'bg-primary text-primary-foreground' : 
                        'bg-muted text-muted-foreground'}
                    `}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <IconComponent className="w-6 h-6" />
                      )}
                    </div>
                    <div className="ml-3 hidden md:block">
                      <div className={`font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                        Step {step.number}
                      </div>
                      <div className="text-sm text-muted-foreground">{step.title}</div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-4 transition-colors duration-300 ${
                        isCompleted ? 'bg-success' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <Card className="card-professional">
          <div className="p-8">
            {currentStep === 1 && (
              <div className="fade-up animate-in">
                <h2 className="text-2xl font-semibold mb-6">Describe Your Business</h2>
                <p className="text-muted-foreground mb-6">
                  Provide a detailed description of your business idea, including what problem it solves, 
                  your target customers, and your unique value proposition.
                </p>
                
                {/* File Upload Section */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Upload Business Plan or Pitch Deck (Optional)</label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {formData.documentFile ? (
                      <div className="flex items-center justify-between bg-muted p-3 rounded">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-primary" />
                          <span className="text-sm font-medium">{formData.documentFile.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ({Math.round(formData.documentFile.size / 1024)} KB)
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removeFile}
                          className="h-8 w-8 p-0 hover:bg-destructive/20"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-2">
                          Drag and drop your document here, or{" "}
                          <label className="text-primary hover:text-primary/80 cursor-pointer font-medium">
                            browse files
                            <Input
                              type="file"
                              className="hidden"
                              accept=".pdf,.docx,.txt"
                              onChange={handleFileInput}
                            />
                          </label>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Supports PDF, Word documents, and text files (max 10MB)
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <Textarea
                  placeholder="Example: AI-powered credit scoring platform for SMEs in the GCC region using alternative data sources like social media and transaction history. B2B SaaS model targeting banks and financial institutions..."
                  className="input-professional min-h-[200px] text-base"
                  value={formData.businessDescription}
                  onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                />
                <div className="text-sm text-muted-foreground mt-2">
                  {formData.businessDescription.length}/500 characters (minimum 50)
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="fade-up animate-in">
                <h2 className="text-2xl font-semibold mb-6">Select Target Markets</h2>
                <p className="text-muted-foreground mb-6">
                  Choose which Gulf markets you plan to target with your business.
                </p>
                <Select value={formData.targetMarkets} onValueChange={(value) => setFormData({ ...formData, targetMarkets: value })}>
                  <SelectTrigger className="select-professional">
                    <SelectValue placeholder="Select your target markets" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-border shadow-[var(--shadow-medium)]">
                    <SelectItem value="uae-saudi">UAE & Saudi Arabia</SelectItem>
                    <SelectItem value="uae-saudi-qatar">UAE, Saudi Arabia & Qatar</SelectItem>
                    <SelectItem value="all-gcc">All GCC Countries</SelectItem>
                    <SelectItem value="kuwait-bahrain">Kuwait & Bahrain</SelectItem>
                    <SelectItem value="oman">Oman Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {currentStep === 3 && (
              <div className="fade-up animate-in">
                <h2 className="text-2xl font-semibold mb-6">Business Stage</h2>
                <p className="text-muted-foreground mb-6">
                  What stage is your business currently in?
                </p>
                <Select value={formData.businessStage} onValueChange={(value) => setFormData({ ...formData, businessStage: value })}>
                  <SelectTrigger className="select-professional">
                    <SelectValue placeholder="Select your business stage" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-border shadow-[var(--shadow-medium)]">
                    <SelectItem value="idea">Idea Stage</SelectItem>
                    <SelectItem value="mvp">MVP Development</SelectItem>
                    <SelectItem value="early-revenue">Early Revenue</SelectItem>
                    <SelectItem value="growth">Growth Stage</SelectItem>
                    <SelectItem value="scaling">Scaling</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {currentStep === 4 && (
              <div className="fade-up animate-in">
                <h2 className="text-2xl font-semibold mb-6">Business Model</h2>
                <p className="text-muted-foreground mb-6">
                  What type of business model best describes your startup?
                </p>
                <Select value={formData.businessModel} onValueChange={(value) => setFormData({ ...formData, businessModel: value })}>
                  <SelectTrigger className="select-professional">
                    <SelectValue placeholder="Select your business model" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-border shadow-[var(--shadow-medium)]">
                    <SelectItem value="b2b-saas">B2B SaaS</SelectItem>
                    <SelectItem value="b2c-app">B2C App</SelectItem>
                    <SelectItem value="marketplace">Marketplace</SelectItem>
                    <SelectItem value="e-commerce">E-commerce</SelectItem>
                    <SelectItem value="fintech">Fintech</SelectItem>
                    <SelectItem value="healthtech">HealthTech</SelectItem>
                    <SelectItem value="edtech">EdTech</SelectItem>
                    <SelectItem value="logistics">Logistics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-8 py-3"
              >
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!isStepValid() || isSubmitting}
                className="btn-hero px-8"
              >
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner w-5 h-5 mr-2"></div>
                    Starting Analysis...
                  </>
                ) : (
                  <>
                    {currentStep === 4 ? 'Start Analysis' : 'Next'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisForm;