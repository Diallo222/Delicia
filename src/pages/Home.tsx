import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { burgerBack, salad } from "../assets";
import Marquee from "../components/parallax/Marquee";
import { useTransitionNavigate } from "../components/transition";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getMealCategories } from "../store/categories/categoriesSlice";
import { prefersReducedMotion } from "../providers/motionPrefs";

gsap.registerPlugin(ScrollTrigger);

const brand = "DELICIA".split("");

const Home = () => {
  const navigate = useTransitionNavigate();
  const dispatch = useAppDispatch();
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { categories } = useAppSelector((s) => s.categories);
  const reduceMotion = prefersReducedMotion();

  useEffect(() => {
    if (!categories.length) {
      dispatch(getMealCategories());
    }
  }, [categories.length, dispatch]);

  useGSAP(
    () => {
      if (reduceMotion || !imageRef.current || !heroRef.current) return;

      gsap.to(imageRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: heroRef, dependencies: [reduceMotion] }
  );

  return (
    <div className="w-full">
      <section
        ref={heroRef}
        className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden"
      >
        <motion.div
          ref={imageRef}
          className="absolute inset-0 z-0 will-change-transform"
          initial={reduceMotion ? false : { scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-x-0 bottom-0 mx-auto h-[55%] max-[700px]:h-[40%] w-[90%] max-w-3xl rounded-t-full bg-amber" />
          <img
            src={burgerBack}
            alt=""
            className="absolute inset-x-0 bottom-0 mx-auto h-[70%] max-[700px]:h-[45%] w-auto max-w-[90%] object-contain object-bottom"
          />
        </motion.div>

        <div className="container-page relative z-10 pb-28 pt-24 max-[700px]:pb-16 md:pb-48 md:pt-32">
          <h1
            className="font-display text-[clamp(2.75rem,14vw,9rem)] leading-[0.85] tracking-tight text-ink uppercase"
            aria-label="Delicia"
          >
            {brand.map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                className="inline-block"
                initial={reduceMotion ? false : { y: "0.35em" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.05 + i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-xl font-body text-lg md:text-2xl text-muted text-balance"
            initial={reduceMotion ? false : { y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            The art of cooking — find the meal you're craving.
          </motion.p>

          <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <motion.button
              type="button"
              data-cursor-hover
              onClick={() => navigate("/ByCategory")}
              className="font-display text-left text-xl md:text-3xl text-amber uppercase underline-offset-8 hover:underline"
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              By categories →
            </motion.button>
            <motion.button
              type="button"
              data-cursor-hover
              onClick={() => navigate("/ByIngredient")}
              className="font-display text-left text-xl md:text-3xl text-ink uppercase underline-offset-8 hover:underline"
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              By ingredients →
            </motion.button>
          </div>
        </div>
      </section>

      <Marquee text="Bite now" image={burgerBack} direction="left" />
      <Marquee text="Taste now" image={salad} direction="right" className="-mt-2" />

      <section className="section-pad container-page">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.25em] text-amber">
              Discover
            </p>
            <h2 className="font-display mt-2 text-4xl md:text-6xl text-ink uppercase">
              Categories
            </h2>
          </div>
          <button
            type="button"
            data-cursor-hover
            onClick={() => navigate("/ByCategory")}
            className="font-body text-sm uppercase tracking-[0.2em] text-muted hover:text-amber transition-colors"
          >
            View all
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {(categories.slice(0, 10).length
            ? categories.slice(0, 10)
            : Array.from({ length: 6 }).map((_, i) => ({
                idCategory: String(i),
                strCategory: "Loading",
                strCategoryThumb: "",
              }))
          ).map((cat) => (
            <button
              key={cat.idCategory}
              type="button"
              data-cursor-hover
              onClick={() => {
                if (cat.strCategory === "Loading") return;
                navigate("/ByCategory", {
                  state: { category: cat.strCategory },
                });
              }}
              className="group relative h-56 w-44 shrink-0 snap-start overflow-hidden bg-night md:h-72 md:w-56"
            >
              {cat.strCategoryThumb ? (
                <img
                  src={cat.strCategoryThumb}
                  alt=""
                  className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="h-full w-full bg-night-soft animate-pulse" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 right-4 font-display text-xl md:text-2xl text-foam uppercase">
                {cat.strCategory}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-ink/10 bg-night">
        <div className="container-page section-pad grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.25em] text-amber">
              Cook with what you have
            </p>
            <h2 className="font-display mt-3 text-4xl md:text-6xl text-foam uppercase text-balance">
              Start from an ingredient
            </h2>
            <p className="mt-4 max-w-md font-body text-foam/70 text-lg">
              Pick a staple from your kitchen and discover meals that put it
              center stage.
            </p>
            <button
              type="button"
              data-cursor-hover
              onClick={() => navigate("/ByIngredient")}
              className="mt-8 bg-amber px-8 py-4 font-display text-lg text-ink uppercase transition-colors hover:bg-amber-hot"
            >
              Explore ingredients
            </button>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-t-full bg-amber/30">
            <img
              src={salad}
              alt=""
              className="h-full w-full object-contain p-6"
            />
          </div>
        </div>
      </section>

      <section className="section-pad container-page text-center">
        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-ink uppercase tracking-tight">
          Hungry yet?
        </h2>
        <p className="mx-auto mt-4 max-w-lg font-body text-lg text-muted">
          Search thousands of recipes by name, category, or ingredient.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            data-cursor-hover
            onClick={() => navigate("/ByName")}
            className="bg-amber px-8 py-4 font-display text-lg text-ink uppercase hover:bg-amber-hot transition-colors"
          >
            Search by name
          </button>
          <button
            type="button"
            data-cursor-hover
            onClick={() => navigate("/ByCategory")}
            className="border-2 border-ink/20 px-8 py-4 font-display text-lg text-ink uppercase hover:border-amber hover:text-amber transition-colors"
          >
            Start browsing
          </button>
        </div>
      </section>

      <footer className="border-t border-ink/10 py-10">
        <div className="container-page flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-xl text-amber uppercase">Delicia.</p>
          <p className="font-body text-sm text-muted">
            Recipe data courtesy of{" "}
            <a
              href="https://www.themealdb.com/"
              target="_blank"
              rel="noreferrer"
              className="text-ink hover:text-amber transition-colors"
            >
              TheMealDB
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
