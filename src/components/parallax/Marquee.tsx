import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../../providers/motionPrefs";

gsap.registerPlugin(ScrollTrigger);

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
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !trackRef.current || !rootRef.current)
        return;

      const track = trackRef.current;
      const distance = track.scrollWidth / 2;
      const dir = direction === "left" ? -1 : 1;

      const tween = gsap.to(track, {
        x: dir * distance,
        duration: 32,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % distance),
        },
      });

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = 1 + Math.abs(self.getVelocity()) / 2200;
          tween.timeScale(Math.min(boost, 3.2));
        },
      });
    },
    { dependencies: [direction] }
  );

  const chunk = (
    <span className="inline-flex items-center gap-8 px-8 md:gap-10 md:px-10">
      <span className="type-display text-foam leading-none">{text}</span>
      <img
        src={image}
        alt=""
        className="h-16 w-16 object-contain md:h-24 md:w-24"
      />
    </span>
  );

  return (
    <div
      ref={rootRef}
      className={`relative z-20 overflow-hidden border-y border-cream/10 bg-night py-6 md:py-8 ${className}`}
    >
      <div
        ref={trackRef}
        className="flex w-max whitespace-nowrap will-change-transform"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i}>{chunk}</span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
export { Marquee };
