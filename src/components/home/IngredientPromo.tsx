import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { salad } from "../../assets";
import { useTransitionNavigate } from "../transition";
import { prefersReducedMotion } from "../../providers/motionPrefs";

gsap.registerPlugin(ScrollTrigger);

const IngredientPromo = () => {
  const navigate = useTransitionNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const reduceMotion = prefersReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 25%",
          scrub: 1.1,
        },
      });

      if (copyRef.current) {
        tl.fromTo(
          copyRef.current,
          { x: -64, opacity: 0.25 },
          { x: 0, opacity: 1, ease: "none" },
          0
        );
      }

      if (mediaRef.current) {
        tl.fromTo(
          mediaRef.current,
          { x: 72, scale: 0.78, opacity: 0.35 },
          { x: 0, scale: 1, opacity: 1, ease: "none" },
          0
        );
      }
    },
    { scope: sectionRef, dependencies: [reduceMotion] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-ink/10 bg-night"
    >
      <div className="container-page section-pad grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <div ref={copyRef} className="will-change-transform">
          <p className="type-label text-amber">Cook with what you have</p>
          <h2 className="type-display mt-3 text-foam text-balance">
            Start from an ingredient
          </h2>
          <p className="mt-5 max-w-md type-body-lg text-foam/70">
            Pick a staple from your kitchen and discover meals that put it
            center stage.
          </p>
          <button
            type="button"
            data-cursor-hover
            onClick={() => navigate("/ByIngredient")}
            className="mt-10 bg-amber px-8 py-4 type-cta text-ink transition-colors hover:bg-amber-hot"
          >
            Explore ingredients
          </button>
        </div>

        <div
          ref={mediaRef}
          className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-t-full bg-amber/25 will-change-transform md:max-w-none"
        >
          <img
            src={salad}
            alt=""
            className="h-full w-full object-contain p-4 md:p-8"
          />
        </div>
      </div>
    </section>
  );
};

export default IngredientPromo;
