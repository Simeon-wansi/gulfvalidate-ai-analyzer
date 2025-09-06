import React, { Component, ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class AnalysisErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Analysis Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center py-12">
          <div className="container mx-auto px-6 max-w-2xl">
            <Card className="card-professional text-center">
              <div className="p-12">
                <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-4 text-destructive">Analysis Error</h1>
                <p className="text-muted-foreground text-lg mb-4">
                  Something went wrong during the analysis process.
                </p>
                <details className="text-left bg-muted/50 p-4 rounded-lg mb-6 text-sm">
                  <summary className="cursor-pointer font-semibold mb-2">Error Details</summary>
                  <pre className="whitespace-pre-wrap">
                    {this.state.error?.message || 'Unknown error occurred'}
                    {this.state.error?.stack && '\n\nStack trace:\n' + this.state.error.stack}
                  </pre>
                </details>
                <div className="flex gap-4 justify-center">
                  <Button 
                    onClick={() => window.location.reload()} 
                    variant="outline"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Reload Page
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/analyze'} 
                    className="btn-hero"
                  >
                    Start New Analysis
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
