import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Category } from "../../store/categories/types";
import { useTransitionNavigate } from "../transition";
import { prefersReducedMotion } from "../../providers/motionPrefs";

gsap.registerPlugin(ScrollTrigger);

type CategoryGalleryProps = {
  categories: Category[];
};

const CategoryGallery = ({ categories }: CategoryGalleryProps) => {
  const navigate = useTransitionNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = prefersReducedMotion();

  const items =
    categories.slice(0, 10).length > 0
      ? categories.slice(0, 10)
      : Array.from({ length: 6 }).map((_, i) => ({
          idCategory: String(i),
          strCategory: "Loading",
          strCategoryThumb: "",
          strCategoryDescription: "",
        }));

  useGSAP(
    () => {
      if (reduceMotion || !sectionRef.current || !trackRef.current) return;

      const tiles = trackRef.current.querySelectorAll("[data-cat-tile]");
      gsap.fromTo(
        tiles,
        { y: 48, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [reduceMotion, items.length] }
  );

  return (
    <section ref={sectionRef} className="section-pad overflow-hidden">
      <div className="container-page mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="type-label text-amber">Discover</p>
          <h2 className="type-display mt-2 text-ink">Categories</h2>
        </div>
        <button
          type="button"
          data-cursor-hover
          onClick={() => navigate("/ByCategory")}
          className="type-meta text-muted transition-colors hover:text-amber"
        >
          View all →
        </button>
      </div>

      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto px-[max(1.25rem,calc((100vw-1400px)/2+4rem))] pb-6 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden"
        data-lenis-prevent
      >
        {items.map((cat) => (
          <button
            key={cat.idCategory}
            type="button"
            data-cat-tile
            data-cursor-hover
            onClick={() => {
              if (cat.strCategory === "Loading") return;
              navigate("/ByCategory", {
                state: { category: cat.strCategory },
              });
            }}
            className="group relative h-64 w-52 shrink-0 snap-start overflow-hidden bg-night will-change-transform md:h-[22rem] md:w-72"
          >
            {cat.strCategoryThumb ? (
              <img
                src={cat.strCategoryThumb}
                alt=""
                className="h-full w-full object-cover opacity-85 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
            ) : (
              <div className="h-full w-full animate-pulse bg-night-soft" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
            <span className="absolute bottom-5 left-5 right-5 type-title text-foam transition-transform duration-500 group-hover:-translate-y-1">
              {cat.strCategory}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryGallery;
