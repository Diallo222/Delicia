import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { burgerBack } from "../../assets";
import { useTransitionNavigate } from "../transition";
import { prefersReducedMotion } from "../../providers/motionPrefs";

gsap.registerPlugin(ScrollTrigger);

const brand = "DELICIA".split("");

const Hero = () => {
  const navigate = useTransitionNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);
  const reduceMotion = prefersReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !heroRef.current) return;

      // Translate-only parallax on a dedicated layer so it never fights
      // Motion's enter scale (which lives on the child).
      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          y: 120,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.35,
          },
        });
      }

      if (brandRef.current) {
        gsap.to(brandRef.current, {
          y: -40,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.35,
          },
        });
      }
    },
    { scope: heroRef, dependencies: [reduceMotion] }
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden"
    >
      <div
        ref={parallaxRef}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <motion.div
          className="absolute inset-0"
          initial={reduceMotion ? false : { scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "50% 100%" }}
        >
          <div className="absolute inset-x-0 bottom-0 h-[48%] max-[700px]:h-[38%] w-full">
            <div className="mx-auto h-full w-full max-w-[1100px] rounded-t-[50%] bg-amber" />
          </div>
          <img
            src={burgerBack}
            alt=""
            className="absolute inset-x-0 bottom-0 mx-auto h-[78%] max-[700px]:h-[52%] w-auto max-w-[min(96vw,920px)] object-contain object-bottom drop-shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
          />
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[55%] bg-gradient-to-t from-cream via-cream/70 to-transparent"
        aria-hidden
      />

      <div className="container-page relative z-10 pb-24 pt-28 max-[700px]:pb-14 md:pb-36 md:pt-36">
        <h1
          ref={brandRef}
          className="type-hero text-ink will-change-transform"
          aria-label="Delicia"
        >
          {brand.map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              className="inline-block"
              initial={reduceMotion ? false : { y: "0.4em" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.06 + i * 0.045,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mt-6 max-w-md type-body-lg text-muted text-balance md:mt-8"
          initial={reduceMotion ? false : { y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.65, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          The art of cooking — find the meal you&apos;re craving.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-5 md:mt-12 md:flex-row md:items-center md:gap-10"
          initial={reduceMotion ? false : { y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.65, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            type="button"
            data-cursor-hover
            onClick={() => navigate("/ByCategory")}
            className="bg-amber px-8 py-4 type-cta text-ink transition-colors hover:bg-amber-hot w-fit"
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            transition={{ type: "spring", stiffness: 360, damping: 22 }}
          >
            By categories →
          </motion.button>
          <motion.button
            type="button"
            data-cursor-hover
            onClick={() => navigate("/ByIngredient")}
            className="type-title text-left text-ink underline-offset-8 hover:underline w-fit"
            whileHover={reduceMotion ? undefined : { x: 8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            By ingredients →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
