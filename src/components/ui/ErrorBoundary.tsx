import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from 'lucide-react';
import { Button, Card, Badge } from './index';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Accessible, resilient Error Boundary component that catches unhandled JavaScript rendering
 * exceptions in its child component tree, preventing full app crashes and displaying a user-friendly
 * recovery interface.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ErrorBoundary] Unhandled render error caught:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleReload = (): void => {
    window.location.href = '/';
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-nova-bg dark:bg-slate-950 flex items-center justify-center p-6 font-sans">
          <Card className="max-w-xl w-full bg-white dark:bg-slate-900 border-2 border-rose-200 dark:border-rose-900/60 p-8 rounded-3xl shadow-2xl space-y-6 text-center">
            {/* Warning Icon Badge */}
            <div className="w-16 h-16 rounded-3xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto shadow-md">
              <AlertTriangle className="w-8 h-8 animate-bounce" />
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <Badge variant="coral" className="gap-1.5 mx-auto">
                <ShieldAlert className="w-3.5 h-3.5" />
                Component Error Boundary
              </Badge>
              <h1 className="text-2xl font-black text-nova-charcoal dark:text-slate-100 pt-1">
                Something went wrong
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-md mx-auto">
                An unexpected error occurred while rendering this section. Don't worry — your learning progress has been saved automatically.
              </p>
            </div>

            {/* Dev Mode Error Details Stack */}
            {process.env.NODE_ENV !== 'production' && this.state.error && (
              <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl border border-slate-800 text-left overflow-x-auto text-[11px] font-mono space-y-1 max-h-40">
                <div className="text-rose-400 font-bold">{this.state.error.toString()}</div>
                {this.state.errorInfo?.componentStack && (
                  <div className="text-slate-400 whitespace-pre-wrap text-[10px]">
                    {this.state.errorInfo.componentStack}
                  </div>
                )}
              </div>
            )}

            {/* Recovery Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                variant="coral"
                size="md"
                onClick={this.handleReset}
                aria-label="Try re-rendering component"
                className="w-full sm:w-auto gap-2 font-bold text-xs min-h-[44px]"
              >
                <RefreshCw className="w-4 h-4" /> Try Again
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={this.handleReload}
                aria-label="Return to NOVA homepage"
                className="w-full sm:w-auto gap-2 font-bold text-xs min-h-[44px]"
              >
                <Home className="w-4 h-4" /> Return Home
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
