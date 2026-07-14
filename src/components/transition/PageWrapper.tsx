import type { ReactNode } from "react";

type PageWrapperProps = {
  children: ReactNode;
};

/** Thin wrapper — route theater lives in PageTransition (single system). */
const PageWrapper = ({ children }: PageWrapperProps) => {
  return <div className="min-h-[60vh]">{children}</div>;
};

export default PageWrapper;
