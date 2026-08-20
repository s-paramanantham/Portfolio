import { Logger } from '../../../../helpers/Logger';

export interface ErrorBoundaryState {
  readonly hasError: boolean;
  readonly error: Error | null;
}

export class ErrorBoundaryViewModel {
  public static getInitialState(): ErrorBoundaryState {
    return {
      hasError: false,
      error: null,
    };
  }

  public static handleError(error: Error, errorInfo: React.ErrorInfo): ErrorBoundaryState {
    Logger.error('Unhandled React Error Boundary Exception', error, {
      componentStack: errorInfo.componentStack,
    });
    return {
      hasError: true,
      error,
    };
  }

  public static handleReset(): ErrorBoundaryState {
    return {
      hasError: false,
      error: null,
    };
  }
}
