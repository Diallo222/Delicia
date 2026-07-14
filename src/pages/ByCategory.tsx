import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { MealCard } from "../components/meal";
import { AutoComplete } from "../components/autoComplete";
import type { Category } from "../store/categories/types";
import {
  filterByCategory,
  getMealCategories,
} from "../store/categories/categoriesSlice";
import { EmptyComponent } from "../components/empty";
import { BarLoader } from "../components/loaders";
import { RequestError } from "../components/errors";
import { styles } from "../styles";

const ByCategory = () => {
  const location = useLocation();
  const preset =
    (location.state as { category?: string } | null)?.category ?? "";
  const {
    categories,
    loading,
    error,
    filteredData,
    filterLoading,
    filterError,
  } = useAppSelector((state) => state.categories);

  const [category, setCategory] = useState(preset);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMealCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!preset || !categories.length) return;
    dispatch(filterByCategory({ category: preset }));
  }, [preset, categories.length, dispatch]);

  const handleClick = (selectedItem: Category) => {
    dispatch(filterByCategory({ category: selectedItem.strCategory }));
    setCategory(selectedItem.strCategory);
  };

  const activeCategory = category || preset;

  return (
    <div className={`${styles.paddingX} min-h-[80vh] pb-24 pt-10`}>
      <p className="font-body text-xs uppercase tracking-[0.25em] text-amber">
        Browse
      </p>
      <h1 className={styles.sectionHeadText}>Meals by category</h1>
      <p className="mt-2 mb-10 max-w-xl font-body text-muted">
        Choose a cuisine style or dish type and we’ll plate the matches.
      </p>

      <AutoComplete
        placeholder="Search categories…"
        options={categories}
        accessOptions={(c) => c.strCategory}
        onfindPress={handleClick}
        loading={filterLoading || loading}
        buttonLabel="Find meals"
        openOnFocus
      />

      {(filterError || error) && (
        <RequestError error={filterError || error} />
      )}

      {activeCategory && (
        <p className="mt-10 font-body text-sm uppercase tracking-[0.2em] text-muted">
          Showing · <span className="text-amber">{activeCategory}</span>
        </p>
      )}

      {filterLoading ? (
        <BarLoader placeholder="Looking for meals…" />
      ) : filteredData.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
          {filteredData.map((meal, i) => (
            <MealCard key={meal.idMeal} meal={meal} index={i} />
          ))}
        </div>
      ) : (
        <EmptyComponent
          placeholder={activeCategory ? "No meals found" : "Pick a category"}
        />
      )}
    </div>
  );
};

export default ByCategory;
