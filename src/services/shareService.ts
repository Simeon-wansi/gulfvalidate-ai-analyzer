import { AnalysisResult } from "./ondemandApi";

// Generate a shareable URL by encoding the analysis result in the hash
export const generateShareableUrl = (analysisResult: AnalysisResult): string => {
  try {
    const data = JSON.stringify(analysisResult);
    const encodedData = btoa(data); // Base64 encode
    return `${window.location.origin}/results#data=${encodedData}`;
  } catch (error) {
    console.error("Failed to generate shareable URL:", error);
    return `${window.location.origin}/results`;
  }
};

// Copy text to clipboard
export const copyToClipboard = (text: string): void => {
  navigator.clipboard.writeText(text);
};

// Get analysis data from URL hash
export const getAnalysisFromUrl = (): AnalysisResult | null => {
  try {
    const hash = window.location.hash;
    if (hash.startsWith("#data=")) {
      const encodedData = hash.substring(6);
      const decodedData = atob(encodedData); // Base64 decode
      return JSON.parse(decodedData);
    }
    return null;
  } catch (error) {
    console.error("Failed to parse analysis data from URL:", error);
    return null;
  }
};
