import jsPDF from "jspdf";
import { AnalysisResult } from "./ondemandApi";

export interface PDFReportData {
  overallScore: number;
  interpretation: string;
  scores: {
    market: number;
    financial: number;
    technical: number;
    legal: number;
    cultural: number;
    competitive: number;
  };
  strengths: string[];
  concerns: string[];
  recommendations: string[];
}

export const generatePdf = async (analysisResult: AnalysisResult, fileName: string = "GulfValidate-Analysis-Report"): Promise<void> => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    console.log('🔄 Starting PDF generation...');
    
    // Header
    pdf.setFontSize(24);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(37, 99, 235); // Primary blue
    pdf.text('GulfValidate Analysis Report', margin, 30);
    
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(100, 100, 100);
    pdf.text('AI-powered startup validation for Gulf markets', margin, 40);
    
    // Date and score header
    pdf.setFontSize(10);
    pdf.setTextColor(150, 150, 150);
    pdf.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth - margin - 50, 30);
    
    // Overall Score Section
    let yPosition = 60;
    pdf.setFontSize(18);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text('Overall Feasibility Score', margin, yPosition);
    
    yPosition += 15;
    pdf.setFontSize(42);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(34, 197, 94); // Success green
    pdf.text(`${analysisResult.overallScore}/100`, margin, yPosition);
    
    yPosition += 10;
    pdf.setFontSize(16);
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Interpretation: ${analysisResult.interpretation}`, margin, yPosition);
    
    // Dimension Scores Section
    yPosition += 25;
    pdf.setFontSize(16);
    pdf.setFont(undefined, 'bold');
    pdf.text('Dimension Analysis', margin, yPosition);
    
    yPosition += 15;
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'normal');
    
    const scoreLabels = [
      { label: 'Market Opportunity', score: analysisResult.scores.market },
      { label: 'Financial Viability', score: analysisResult.scores.financial },
      { label: 'Technical Feasibility', score: analysisResult.scores.technical },
      { label: 'Legal Compliance', score: analysisResult.scores.legal },
      { label: 'Cultural Fit', score: analysisResult.scores.cultural },
      { label: 'Competitive Position', score: analysisResult.scores.competitive }
    ];
    
    scoreLabels.forEach(({ label, score }) => {
      const scoreColor = score >= 80 ? [34, 197, 94] as const : score >= 65 ? [59, 130, 246] as const : score >= 50 ? [245, 158, 11] as const : [239, 68, 68] as const;
      
      pdf.setTextColor(0, 0, 0);
      pdf.text(`${label}:`, margin, yPosition);
      
      pdf.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
      pdf.setFont(undefined, 'bold');
      pdf.text(`${score}/100`, margin + 60, yPosition);
      
      pdf.setFont(undefined, 'normal');
      yPosition += 8;
    });
    
    // Check if we need a new page
    if (yPosition > pageHeight - 80) {
      pdf.addPage();
      yPosition = 30;
    }
    
    // Key Strengths Section
    yPosition += 15;
    pdf.setFontSize(16);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(34, 197, 94); // Green for strengths
    pdf.text('Key Strengths', margin, yPosition);
    
    yPosition += 12;
    pdf.setFontSize(11);
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(0, 0, 0);
    
    analysisResult.strengths.forEach((strength, index) => {
      const bulletText = `${index + 1}. ${strength}`;
      const lines = pdf.splitTextToSize(bulletText, contentWidth);
      
      if (yPosition + (lines.length * 6) > pageHeight - 20) {
        pdf.addPage();
        yPosition = 30;
      }
      
      pdf.text(lines, margin, yPosition);
      yPosition += lines.length * 6 + 3;
    });
    
    // Critical Concerns Section
    yPosition += 10;
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = 30;
    }
    
    pdf.setFontSize(16);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(239, 68, 68); // Red for concerns
    pdf.text('Critical Concerns', margin, yPosition);
    
    yPosition += 12;
    pdf.setFontSize(11);
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(0, 0, 0);
    
    analysisResult.concerns.forEach((concern, index) => {
      const bulletText = `${index + 1}. ${concern}`;
      const lines = pdf.splitTextToSize(bulletText, contentWidth);
      
      if (yPosition + (lines.length * 6) > pageHeight - 20) {
        pdf.addPage();
        yPosition = 30;
      }
      
      pdf.text(lines, margin, yPosition);
      yPosition += lines.length * 6 + 3;
    });
    
    // Priority Recommendations Section
    yPosition += 10;
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = 30;
    }
    
    pdf.setFontSize(16);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(59, 130, 246); // Blue for recommendations
    pdf.text('Priority Recommendations', margin, yPosition);
    
    yPosition += 12;
    pdf.setFontSize(11);
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(0, 0, 0);
    
    analysisResult.recommendations.forEach((rec, index) => {
      const bulletText = `${index + 1}. ${rec}`;
      const lines = pdf.splitTextToSize(bulletText, contentWidth);
      
      if (yPosition + (lines.length * 6) > pageHeight - 20) {
        pdf.addPage();
        yPosition = 30;
      }
      
      pdf.text(lines, margin, yPosition);
      yPosition += lines.length * 6 + 3;
    });
    
    // Footer on last page
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(9);
      pdf.setTextColor(100, 100, 100);
      
      // Page number
      pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 20, pageHeight - 10);
      
      // Footer text only on last page
      if (i === totalPages) {
        pdf.text('Generated by GulfValidate - AI-powered startup validation', margin, pageHeight - 10);
      }
    }
    
    console.log('✅ PDF generation completed successfully');
    
    // Save the PDF
    pdf.save(`${fileName}.pdf`);
    
  } catch (error) {
    console.error('❌ PDF generation error:', error);
    throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
