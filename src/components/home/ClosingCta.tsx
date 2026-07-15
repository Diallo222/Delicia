import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTransitionNavigate } from "../transition";
import { prefersReducedMotion } from "../../providers/motionPrefs";

gsap.registerPlugin(ScrollTrigger);

const ClosingCta = () => {
  const navigate = useTransitionNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reduceMotion = prefersReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !sectionRef.current || !titleRef.current) return;

      gsap.fromTo(
        titleRef.current,
        { y: "0.55em", clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          ease: "power3.out",
          clearProps: "clipPath,transform",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [reduceMotion] }
  );

  return (
    <section ref={sectionRef} className="section-pad container-page text-center">
      <div className="overflow-hidden">
        <h2 ref={titleRef} className="type-display text-ink will-change-transform">
          Hungry yet?
        </h2>
      </div>
      <p className="mx-auto mt-5 max-w-lg type-body-lg text-muted text-balance">
        Search thousands of recipes by name, category, or ingredient.
      </p>
      <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          data-cursor-hover
          onClick={() => navigate("/ByName")}
          className="bg-amber px-8 py-4 type-cta text-ink transition-colors hover:bg-amber-hot"
        >
          Search by name
        </button>
        <button
          type="button"
          data-cursor-hover
          onClick={() => navigate("/ByCategory")}
          className="border-2 border-ink/20 px-8 py-4 type-cta text-ink transition-colors hover:border-amber hover:text-amber"
        >
          Start browsing
        </button>
      </div>
    </section>
  );
};

export default ClosingCta;
