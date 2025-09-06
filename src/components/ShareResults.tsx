import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Share2, Link, Copy, Download } from "lucide-react";
import { generateShareableUrl, copyToClipboard } from "@/services/shareService";
import { generatePdf } from "@/services/pdfGenerator";
import { AnalysisResult } from "@/services/ondemandApi";

interface ShareResultsProps {
  analysisResult: AnalysisResult;
}

const ShareResults = ({ analysisResult }: ShareResultsProps) => {
  const [shareUrl, setShareUrl] = useState("");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleShare = () => {
    const url = generateShareableUrl(analysisResult);
    setShareUrl(url);
  };

  const handleCopy = () => {
    copyToClipboard(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      console.log('🔄 Starting PDF generation...', { analysisResult });
      await generatePdf(analysisResult, "analysis-report");
      console.log('✅ PDF generation completed successfully');
      toast.success("PDF report downloaded successfully!");
    } catch (error) {
      console.error('❌ PDF generation failed:', error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Popover onOpenChange={handleShare}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="btn-accent">
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 card-professional p-4">
          <div className="space-y-4">
            <h4 className="font-semibold">Share Analysis Report</h4>
            <div className="flex items-center gap-2">
              <Link className="w-5 h-5 text-muted-foreground" />
              <Input value={shareUrl} readOnly className="input-professional" />
              <Button size="sm" onClick={handleCopy} className="p-2">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Anyone with this link can view the analysis report.
            </p>
          </div>
        </PopoverContent>
      </Popover>

      <Button onClick={handleDownloadPdf} disabled={isGeneratingPdf} className="btn-hero">
        {isGeneratingPdf ? (
          <>
            <div className="loading-spinner w-5 h-5 mr-2"></div>
            Generating...
          </>
        ) : (
          <>
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </>
        )}
      </Button>
    </div>
  );
};

export default ShareResults;
