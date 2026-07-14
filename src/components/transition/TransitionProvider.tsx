import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  resolvePath,
  useLocation,
  useNavigate,
  type NavigateOptions,
  type To,
} from "react-router-dom";
import gsap from "gsap";
import { prefersReducedMotion } from "../../providers/motionPrefs";

type TransitionContextValue = {
  navigateWithTransition: (to: To, options?: NavigateOptions) => void;
  isTransitioning: boolean;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

/** Keep curtain parked below the viewport and non-interactive. */
const parkCurtain = (el: HTMLElement) => {
  gsap.killTweensOf(el);
  gsap.set(el, {
    yPercent: 100,
    pointerEvents: "none",
    clearProps: "transform",
  });
  gsap.set(el, { yPercent: 100, pointerEvents: "none" });
};

const locationKey = (pathname: string, search: string) =>
  `${pathname}${search}`;

const toKey = (to: To, fromPathname: string) => {
  const resolved = resolvePath(to, fromPathname);
  return locationKey(resolved.pathname, resolved.search);
};

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const curtainRef = useRef<HTMLDivElement>(null);
  const inFlight = useRef(false);
  const intentionalNav = useRef(false);
  const prevKey = useRef(locationKey(location.pathname, location.search));
  const [isTransitioning, setIsTransitioning] = useState(false);

  useLayoutEffect(() => {
    const el = curtainRef.current;
    if (el) parkCurtain(el);
  }, []);

  const finish = useCallback((el: HTMLElement) => {
    parkCurtain(el);
    inFlight.current = false;
    setIsTransitioning(false);
  }, []);

  const revealFromCover = useCallback(
    (el: HTMLElement) => {
      gsap.killTweensOf(el);
      gsap.set(el, { yPercent: 0, pointerEvents: "auto" });
      gsap
        .timeline({
          defaults: { ease: "power4.inOut" },
          onInterrupt: () => finish(el),
          onComplete: () => finish(el),
        })
        .to(el, { yPercent: -100, duration: 0.4, delay: 0.05 })
        .set(el, { yPercent: 100, pointerEvents: "none" });
    },
    [finish]
  );

  const navigateWithTransition = useCallback(
    (to: To, options?: NavigateOptions) => {
      if (inFlight.current) return;

      const next = toKey(to, location.pathname);
      const current = locationKey(location.pathname, location.search);
      if (next === current && options?.state === undefined) return;

      if (prefersReducedMotion()) {
        intentionalNav.current = true;
        navigate(to, options);
        return;
      }

      const el = curtainRef.current;
      if (!el) {
        intentionalNav.current = true;
        navigate(to, options);
        return;
      }

      inFlight.current = true;
      setIsTransitioning(true);

      gsap.killTweensOf(el);
      gsap
        .timeline({
          defaults: { ease: "power4.inOut" },
          onInterrupt: () => finish(el),
        })
        .set(el, { yPercent: 100, pointerEvents: "auto" })
        .to(el, { yPercent: 0, duration: 0.35 })
        .add(() => {
          intentionalNav.current = true;
          navigate(to, options);
        })
        .to({}, { duration: 0.05 })
        .to(el, { yPercent: -100, duration: 0.4 })
        .set(el, { yPercent: 100, pointerEvents: "none" })
        .add(() => {
          inFlight.current = false;
          setIsTransitioning(false);
        });
    },
    [finish, location.pathname, location.search, navigate]
  );

  // Back/forward (or any navigation we didn't initiate): snap-cover then reveal
  useLayoutEffect(() => {
    const key = locationKey(location.pathname, location.search);
    if (key === prevKey.current) return;

    if (intentionalNav.current) {
      intentionalNav.current = false;
      prevKey.current = key;
      return;
    }

    prevKey.current = key;
    const el = curtainRef.current;
    if (!el || prefersReducedMotion()) return;

    inFlight.current = true;
    setIsTransitioning(true);
    revealFromCover(el);
  }, [location.pathname, location.search, revealFromCover]);

  const value = useMemo(
    () => ({ navigateWithTransition, isTransitioning }),
    [navigateWithTransition, isTransitioning]
  );

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <div
        ref={curtainRef}
        className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-amber"
        style={{ transform: "translate3d(0, 100%, 0)" }}
        aria-hidden="true"
      >
        <span className="type-display text-ink">
          Delicia.
        </span>
      </div>
    </TransitionContext.Provider>
  );
};

export const useTransitionNavigate = () => {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error(
      "useTransitionNavigate must be used within TransitionProvider"
    );
  }
  return ctx.navigateWithTransition;
};

export const useIsTransitioning = () => {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("useIsTransitioning must be used within TransitionProvider");
  }
  return ctx.isTransitioning;
};
