import React, { Component, type ReactNode, type ErrorInfo } from "react";
import { BarLoader } from "../loaders";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream px-6 text-center">
          <h1 className="font-display text-5xl md:text-7xl text-amber uppercase">
            Oops
          </h1>
          <p className="font-body text-xl text-muted">
            Something went wrong. Try refreshing the page.
          </p>
        </div>
      );
    }

    return (
      <React.Suspense fallback={<BarLoader placeholder="Loading…" />}>
        {this.props.children}
      </React.Suspense>
    );
  }
}

export default ErrorBoundary;
