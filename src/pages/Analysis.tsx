import AnalysisProgress from "@/components/AnalysisProgress";
import { AnalysisErrorBoundary } from "@/components/AnalysisErrorBoundary";

const Analysis = () => {
  return (
    <div className="min-h-screen">
      <AnalysisErrorBoundary>
        <AnalysisProgress />
      </AnalysisErrorBoundary>
    </div>
  );
};

export default Analysis;