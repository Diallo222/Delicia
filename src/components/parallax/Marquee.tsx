import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReducedMotion } from "../../providers/motionPrefs";

type MarqueeProps = {
  text: string;
  image: string;
  direction?: "left" | "right";
  className?: string;
};

const Marquee = ({
  text,
  image,
  direction = "left",
  className = "",
}: MarqueeProps) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !trackRef.current) return;
      const distance = trackRef.current.scrollWidth / 2;
      gsap.to(trackRef.current, {
        x: direction === "left" ? -distance : distance,
        duration: 28,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % distance),
        },
      });
    },
    { dependencies: [direction] }
  );

  const chunk = (
    <span className="inline-flex items-center gap-6 px-6">
      <span className="font-display text-4xl md:text-6xl uppercase tracking-tight text-foam">
        {text}
      </span>
      <img
        src={image}
        alt=""
        className="h-12 w-12 md:h-16 md:w-16 object-contain"
      />
    </span>
  );

  return (
    <div
      className={`relative z-20 overflow-hidden border-y border-cream/10 bg-night py-4 ${className}`}
    >
      <div
        ref={trackRef}
        className="flex w-max whitespace-nowrap will-change-transform"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i}>{chunk}</span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
export { Marquee };
