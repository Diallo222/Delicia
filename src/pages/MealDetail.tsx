import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { BiSolidCategory } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Meal } from "../store/meal/types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getMealDetails } from "../store/meal/mealSlice";
import { RequestError } from "../components/errors";
import { BarLoader } from "../components/loaders";
import { prefersReducedMotion } from "../providers/motionPrefs";

gsap.registerPlugin(ScrollTrigger);

function getIngredientsWithMeasures(meal: Meal): string[] {
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient?.trim()) {
      ingredients.push(
        [measure?.trim(), ingredient.trim()].filter(Boolean).join(" ")
      );
    }
  }
  return ingredients;
}

function getInstructionSteps(instructions?: string): string[] {
  if (!instructions) return [];
  return instructions
    .split(/\r?\n|\.\s+(?=[A-Z])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 12);
}

const MealDetail = () => {
  const [params] = useSearchParams();
  const id = params.get("id");
  const dispatch = useAppDispatch();
  const { details, detailsLoading, detailsError } = useAppSelector(
    (state) => state.meal
  );
  const heroRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (id && (!details || details.idMeal !== id)) {
      dispatch(getMealDetails({ id }));
    }
  }, [id, details, dispatch]);

  const ingredients = useMemo(
    () => (details ? getIngredientsWithMeasures(details) : []),
    [details]
  );
  const steps = useMemo(
    () => getInstructionSteps(details?.strInstructions),
    [details]
  );

  useGSAP(
    () => {
      if (prefersReducedMotion() || !details) return;

      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 48, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power4.out" }
        );
      }

      if (heroRef.current) {
        gsap.to(heroRef.current.querySelector("img"), {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.3,
            },
          }
        );
      }
    },
    { dependencies: [details?.idMeal] }
  );

  if (detailsLoading && !details) {
    return <BarLoader placeholder="Plating your meal…" />;
  }

  return (
    <div className="relative pb-24">
      <div
        ref={progressRef}
        className="fixed left-0 top-0 z-[41] h-[3px] w-full origin-left scale-x-0 bg-amber"
      />

      {detailsError && (
        <div className="container-page pt-10">
          <RequestError error={detailsError} />
        </div>
      )}

      {details && (
        <>
          <div
            ref={heroRef}
            className="relative h-[50svh] min-h-[280px] md:h-[70vh] md:min-h-[420px] overflow-hidden"
          >
            <motion.img
              layoutId={`meal-image-${details.idMeal}`}
              src={details.strMealThumb}
              alt={details.strMeal}
              className="h-[120%] w-full object-cover will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 container-page pb-6 md:pb-10">
              <h1
                ref={titleRef}
                className="font-display max-w-4xl text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-foam uppercase tracking-tight text-balance"
              >
                {details.strMeal}
              </h1>
            </div>
          </div>

          <div className="container-page mt-10 grid gap-12 lg:grid-cols-[1fr_320px]">
            <div className="space-y-16 order-2 lg:order-none">
              <section>
                <h2 className="font-display text-3xl md:text-4xl text-amber uppercase">
                  Ingredients
                </h2>
                <ul className="mt-6 divide-y divide-ink/10">
                  {ingredients.map((item, index) => (
                    <motion.li
                      key={`${item}-${index}`}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.03 }}
                      className="flex gap-4 py-3 font-body text-base md:text-lg text-ink"
                    >
                      <span className="font-display text-amber tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-display text-3xl md:text-4xl text-amber uppercase">
                  Method
                </h2>
                <ol className="mt-6 space-y-6">
                  {(steps.length
                    ? steps
                    : [details.strInstructions || ""]
                  ).map((step, index) => (
                    <motion.li
                      key={`step-${index}`}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      className="grid gap-3 md:grid-cols-[4rem_1fr]"
                    >
                      <span className="font-display text-3xl md:text-4xl text-ink/15">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="font-body text-base md:text-lg leading-relaxed text-muted">
                        {step}
                      </p>
                    </motion.li>
                  ))}
                </ol>
              </section>
            </div>

            <aside className="order-first lg:order-none lg:sticky lg:top-28 h-fit space-y-6 border border-ink/10 bg-night p-6">
              <div className="space-y-4">
                <p className="flex items-center gap-3 font-body text-foam">
                  <BiSolidCategory className="text-amber shrink-0" size={22} />
                  {details.strCategory}
                </p>
                <p className="flex items-center gap-3 font-body text-foam">
                  <FaLocationDot className="text-amber shrink-0" size={22} />
                  {details.strArea}
                </p>
              </div>
              {details.strYoutube && (
                <button
                  type="button"
                  data-cursor-hover
                  onClick={() => window.open(details.strYoutube, "_blank")}
                  className="flex w-full items-center justify-center gap-2 bg-amber px-4 py-3 font-display font-normal text-ink uppercase hover:bg-amber-hot transition-colors"
                >
                  <TbBrandYoutubeFilled size={22} />
                  Watch tutorial
                </button>
              )}
            </aside>
          </div>
        </>
      )}
    </div>
  );
};

export default MealDetail;
