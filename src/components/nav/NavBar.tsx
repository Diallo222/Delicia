import { useEffect, useId, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const links: { to: string; label: string; end?: boolean }[] = [
  { to: "/", label: "Home", end: true },
  { to: "/ByCategory", label: "Categories" },
  { to: "/ByIngredient", label: "Ingredients" },
  { to: "/ByName", label: "Search" },
];

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);
  const menuId = useId();

  // Close drawer when the route changes (React: adjust state during render)
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/85 backdrop-blur-md pt-[env(safe-area-inset-top)]">
      <nav className="container-page flex items-center justify-between gap-4 py-4 md:gap-6 md:py-5">
        <motion.button
          type="button"
          onClick={() => navigate("/")}
          className="font-display text-2xl md:text-3xl tracking-tight text-amber uppercase shrink-0"
          whileHover={{ scale: 1.04, rotate: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        >
          Delicia.
        </motion.button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  [
                    "font-body text-sm uppercase tracking-[0.18em] transition-colors",
                    isActive ? "text-amber" : "text-muted hover:text-ink",
                  ].join(" ")
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden relative z-50 flex h-11 w-11 items-center justify-center text-ink"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close" : "Menu"}</span>
          <span className="flex w-6 flex-col gap-1.5">
            <span
              className={[
                "block h-0.5 w-full bg-ink transition-transform origin-center",
                open ? "translate-y-2 rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-0.5 w-full bg-ink transition-opacity",
                open ? "opacity-0" : "opacity-100",
              ].join(" ")}
            />
            <span
              className={[
                "block h-0.5 w-full bg-ink transition-transform origin-center",
                open ? "-translate-y-2 -rotate-45" : "",
              ].join(" ")}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-ink/10 bg-cream"
          >
            <ul className="container-page flex flex-col gap-1 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      [
                        "block py-3 font-display text-2xl uppercase tracking-tight transition-colors",
                        isActive ? "text-amber" : "text-ink",
                      ].join(" ")
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
