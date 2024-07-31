import React, { useState, useEffect, ReactNode, ErrorInfo } from "react";
import { BarLoader } from "../loaders";

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error: Error, errorInfo: ErrorInfo) => {
      console.error("Error caught in ErrorBoundary:", error, errorInfo);
      setHasError(true);
    };

    window.addEventListener("error", errorHandler);
    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  if (hasError) {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-5xl text-red-600">OOPS ! Something went wrong </h1>
        <p className="text-3xl">Try refreshing the page</p>
      </div>
    );
  }

  return (
    <React.Suspense fallback={<BarLoader placeholder="Loading..." />}>
      {children}
    </React.Suspense>
  );
};

export default ErrorBoundary;
