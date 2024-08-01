import React, { Component, ReactNode, ErrorInfo } from "react";
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
        <div className="w-screen h-screen bg-amber-100 flex flex-col items-center justify-center space-y-4">
          <h1 className="text-5xl text-red-600">OOPS ! Something went wrong </h1>
          <p className="text-3xl text-amber-500">Try refreshing the page</p>
        </div>
      );
    }

    return (
      <React.Suspense fallback={<BarLoader placeholder="Loading..." />}>
        {this.props.children}
      </React.Suspense>
    );
  }
}

export default ErrorBoundary;
