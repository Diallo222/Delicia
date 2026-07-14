import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "../../providers/motionPrefs";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const enabled =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !prefersReducedMotion();

  useEffect(() => {
    if (!enabled) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    document.body.classList.add("cursor-none");

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.25, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.25, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onEnter = () => {
      gsap.to(cursor, { scale: 2.4, duration: 0.25, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.25, ease: "power2.out" });
    };

    window.addEventListener("mousemove", onMove);

    const interactives = () =>
      document.querySelectorAll("a, button, [data-cursor-hover]");

    const bind = () => {
      interactives().forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    bind();
    const observer = new MutationObserver(bind);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
      interactives().forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[95] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber mix-blend-difference"
      aria-hidden="true"
    />
  );
};

export default CustomCursor;
