import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { prefersReducedMotion } from "../../providers/motionPrefs";

/** Keep curtain parked below the viewport and non-interactive. */
const parkCurtain = (el: HTMLElement) => {
  gsap.killTweensOf(el);
  gsap.set(el, {
    yPercent: 100,
    pointerEvents: "none",
    clearProps: "transform",
  });
  // clearProps removes inline transform — re-apply park position
  gsap.set(el, { yPercent: 100, pointerEvents: "none" });
};

const PageTransition = () => {
  const { pathname } = useLocation();
  const curtainRef = useRef<HTMLDivElement>(null);
  const prevPath = useRef(pathname);

  useEffect(() => {
    const el = curtainRef.current;
    if (!el) return;

    // Skip first paint — no wipe on initial load
    if (prevPath.current === pathname) {
      parkCurtain(el);
      return;
    }
    prevPath.current = pathname;

    if (prefersReducedMotion()) {
      parkCurtain(el);
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onInterrupt: () => parkCurtain(el),
    });

    tl.set(el, { yPercent: 100, pointerEvents: "auto" })
      .to(el, { yPercent: 0, duration: 0.4 })
      .to(el, { yPercent: -100, duration: 0.5, delay: 0.05 })
      .set(el, { yPercent: 100, pointerEvents: "none" });

    return () => {
      tl.kill();
      parkCurtain(el);
    };
  }, [pathname]);

  return (
    <div
      ref={curtainRef}
      className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-amber"
      style={{ transform: "translate3d(0, 100%, 0)" }}
      aria-hidden="true"
    >
      <span className="font-display text-4xl md:text-6xl text-ink uppercase tracking-tight">
        Delicia.
      </span>
    </div>
  );
};

export default PageTransition;
