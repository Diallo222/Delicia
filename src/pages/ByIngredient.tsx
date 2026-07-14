import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { MealCard } from "../components/meal";
import { AutoComplete } from "../components/autoComplete";
import {
  getAllIngredients,
  filterByIngredient,
} from "../store/ingredient/ingredientSlice";
import { EmptyComponent } from "../components/empty";
import type { Ingredient } from "../store/ingredient/types";
import { BarLoader } from "../components/loaders";
import { RequestError } from "../components/errors";
import { styles } from "../styles";

const ByIngredient = () => {
  const {
    ingredients,
    loading,
    error,
    filteredData,
    filterLoading,
    filterError,
  } = useAppSelector((state) => state.ingredients);

  const [ingredient, setIngredient] = useState<Ingredient | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllIngredients());
  }, [dispatch]);

  const handleClick = (selectedItem: Ingredient) => {
    dispatch(filterByIngredient({ ingredient: selectedItem.strIngredient }));
    setIngredient(selectedItem);
  };

  return (
    <div className={`${styles.paddingX} min-h-[80vh] pb-24 pt-10`}>
      <p className="font-body text-xs uppercase tracking-[0.25em] text-amber">
        Browse
      </p>
      <h1 className={styles.sectionHeadText}>Meals by ingredient</h1>
      <p className="mt-2 mb-10 max-w-xl font-body text-muted">
        Lead with what’s already in your pantry.
      </p>

      <AutoComplete
        placeholder="Search ingredients…"
        options={ingredients}
        accessOptions={(ing) => ing.strIngredient}
        onfindPress={handleClick}
        loading={loading || filterLoading}
        buttonLabel="Find meals"
        openOnFocus
      />

      {(filterError || error) && (
        <RequestError error={filterError || error} />
      )}

      {ingredient?.strDescription && (
        <div className="mt-10 max-w-3xl space-y-3 border-l-2 border-amber pl-6">
          <h2 className="font-display text-2xl text-amber">
            {ingredient.strIngredient}
          </h2>
          <p className="font-body text-muted leading-relaxed">
            {ingredient.strDescription}
          </p>
        </div>
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
          placeholder={
            ingredient ? "No meals found" : "Choose an ingredient"
          }
        />
      )}
    </div>
  );
};

export default ByIngredient;
