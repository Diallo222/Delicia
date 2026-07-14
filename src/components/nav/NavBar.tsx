import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const links: { to: string; label: string; end?: boolean }[] = [
  { to: "/", label: "Home", end: true },
  { to: "/ByCategory", label: "Categories" },
  { to: "/ByIngredient", label: "Ingredients" },
  { to: "/ByName", label: "Search" },
];

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/85 backdrop-blur-md">
      <nav className="container-page flex items-center justify-between gap-6 py-4 md:py-5">
        <motion.button
          type="button"
          onClick={() => navigate("/")}
          className="font-display text-2xl md:text-3xl tracking-tight text-amber uppercase"
          whileHover={{ scale: 1.04, rotate: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        >
          Delicia.
        </motion.button>

        <ul className="flex items-center gap-4 md:gap-8">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  [
                    "font-body text-xs md:text-sm uppercase tracking-[0.18em] transition-colors",
                    isActive ? "text-amber" : "text-muted hover:text-ink",
                  ].join(" ")
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
