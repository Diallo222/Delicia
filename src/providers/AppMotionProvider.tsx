import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

type AppMotionProviderProps = {
  children: ReactNode;
};

export default function AppMotionProvider({ children }: AppMotionProviderProps) {
  return (
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  );
}
