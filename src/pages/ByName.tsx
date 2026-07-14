import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  getMealByName,
  getMealsbyLetter,
} from "../store/meal/mealSlice";
import { MealCard } from "../components/meal";
import { EmptyComponent } from "../components/empty";
import { BarLoader } from "../components/loaders";
import { RequestError } from "../components/errors";
import { styles } from "../styles";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const ByName = () => {
  const dispatch = useAppDispatch();
  const { meal, mealLoading, mealError, data, loading, error } =
    useAppSelector((state) => state.meal);

  const [query, setQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const results = useMemo(() => {
    if (activeLetter) return data || [];
    return meal || [];
  }, [activeLetter, data, meal]);

  const isLoading = activeLetter ? loading : mealLoading;
  const err = activeLetter ? error : mealError;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setActiveLetter(null);
    dispatch(getMealByName({ name: trimmed }));
  };

  const handleLetter = (letter: string) => {
    setActiveLetter(letter);
    setQuery("");
    dispatch(getMealsbyLetter({ letter }));
  };

  return (
    <div className={`${styles.paddingX} min-h-[80vh] pb-24 pt-10`}>
      <p className="type-label text-amber">Search</p>
      <h1 className={styles.sectionHeadText}>Find by name</h1>
      <p className="mt-2 mb-10 max-w-xl type-body text-muted">
        Type a dish name, or jump the alphabet.
      </p>

      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-4 md:flex-row md:items-stretch max-w-3xl"
      >
        <div className="min-w-0 flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Arrabiata, Curry…"
            className="w-full border-0 border-b-2 border-ink/15 bg-transparent px-0 py-4 type-title md:text-4xl text-ink placeholder:text-muted/50 focus:border-amber focus:ring-0 outline-none transition-colors"
          />
        </div>
        <button
          type="submit"
          data-cursor-hover
          className="shrink-0 bg-amber px-8 py-4 type-cta text-ink hover:bg-amber-hot transition-colors"
        >
          Search
        </button>
      </form>

      <div className="mt-10 flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {LETTERS.map((letter) => (
          <button
            key={letter}
            type="button"
            data-cursor-hover
            onClick={() => handleLetter(letter)}
            className={[
              "h-10 w-10 shrink-0 snap-start type-cta text-sm transition-colors",
              activeLetter === letter
                ? "bg-amber text-ink"
                : "bg-night text-muted hover:text-amber",
            ].join(" ")}
          >
            {letter}
          </button>
        ))}
      </div>

      {err && <RequestError error={err} />}

      {isLoading ? (
        <BarLoader placeholder="Searching the kitchen…" />
      ) : results?.length ? (
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
          {results.map((m, i) => (
            <MealCard key={m.idMeal} meal={m} index={i} />
          ))}
        </div>
      ) : (
        <EmptyComponent
          placeholder={
            query || activeLetter
              ? "No meals found"
              : "Search or pick a letter"
          }
        />
      )}
    </div>
  );
};

export default ByName;
