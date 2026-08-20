import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { ErrorBoundaryViewModel, ErrorBoundaryState } from './ErrorBoundary.vm';
import { Button } from '../Button/Button';

export interface ErrorBoundaryProps {
  readonly children: ReactNode;
  readonly fallbackTitle?: string;
  readonly fallbackMessage?: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = ErrorBoundaryViewModel.getInitialState();
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const nextState = ErrorBoundaryViewModel.handleError(error, errorInfo);
    this.setState(nextState);
  }

  private handleReset = (): void => {
    this.setState(ErrorBoundaryViewModel.handleReset());
  };

  public override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="min-h-[300px] flex flex-col items-center justify-center p-8 bg-slate-950/90 border border-red-500/30 rounded-2xl text-center max-w-lg mx-auto my-8 shadow-2xl"
        >
          <div className="w-14 h-14 rounded-full bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-400 mb-4 animate-pulse">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            {this.props.fallbackTitle || 'Something went wrong'}
          </h3>
          <p className="text-sm text-slate-400 mb-6 max-w-sm">
            {this.props.fallbackMessage ||
              (this.state.error?.message ?? 'An unexpected rendering error occurred. Please try reloading.')}
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={this.handleReset}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
