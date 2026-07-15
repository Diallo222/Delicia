import { useTransitionNavigate } from "../transition";

const links = [
  { to: "/ByCategory", label: "Categories" },
  { to: "/ByIngredient", label: "Ingredients" },
  { to: "/ByName", label: "Search" },
] as const;

const HomeFooter = () => {
  const navigate = useTransitionNavigate();

  return (
    <footer className="border-t border-ink/10 py-12 md:py-16">
      <div className="container-page flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="type-nav-logo text-amber">Delicia.</p>
          <p className="mt-3 max-w-xs type-body text-muted">
            The art of cooking — recipes worth craving.
          </p>
        </div>

        <nav className="flex flex-wrap gap-6 md:gap-8" aria-label="Footer">
          {links.map((link) => (
            <button
              key={link.to}
              type="button"
              data-cursor-hover
              onClick={() => navigate(link.to)}
              className="type-meta text-muted transition-colors hover:text-amber"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="container-page mt-10 flex flex-col gap-2 border-t border-ink/10 pt-8 md:flex-row md:items-center md:justify-between">
        <p className="type-meta text-muted normal-case tracking-normal">
          Recipe data courtesy of{" "}
          <a
            href="https://www.themealdb.com/"
            target="_blank"
            rel="noreferrer"
            className="text-ink transition-colors hover:text-amber"
          >
            TheMealDB
          </a>
        </p>
      </div>
    </footer>
  );
};

export default HomeFooter;
