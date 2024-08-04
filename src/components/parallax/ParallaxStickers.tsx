import React, { useRef } from "react";
import {
  motion,
  useVelocity,
  useSpring,
  useTransform,
  useScroll,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface ParallaxStickersProps {
  rotate?: string;
  children: React.ReactNode;
  baseVelocity: number;
}

const childrenClassName = "flex flex-row items-center justify-center gap-4 mx-20";
const ParallaxStickers: React.FC<ParallaxStickersProps> = ({
  rotate,
  children,
  baseVelocity = 100,
}) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    //switch scrolling directions.

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    // moving based on direction factor and velocity factor
    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });
  return (
    <motion.div
      className={`flex flex-nowrap absolute overflow-hidden whitespace-nowrap  left-0 right-0 bottom-10 w-full px-2 py-1 md:py-3 bg-zinc-900 ${rotate}`}
    >
      <motion.div
        className="flex flex-nowrap uppercase text-2xl md:text-6xl text-amber-100"
        style={{ x }}
      >
        <span className={childrenClassName}>{children} </span>
        <span className={childrenClassName}>{children} </span>
        <span className={childrenClassName}>{children} </span>
        <span className={childrenClassName}>{children} </span>
        <span className={childrenClassName}>{children} </span>
        <span className={childrenClassName}>{children} </span>
        <span className={childrenClassName}>{children} </span>
        <span className={childrenClassName}>{children} </span>
      </motion.div>
    </motion.div>
  );
};

export default ParallaxStickers;
