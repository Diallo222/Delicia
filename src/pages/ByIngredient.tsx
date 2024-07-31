import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { MealCard } from "../components/meal";
import { styles } from "../styles";
import { AutoComplete } from "../components/autoComplete";
import {
  getAllIngredients,
  filterByIngredient,
} from "../store/ingredient/ingredientSlice";
import { EmptyComponent } from "../components/empty";
import { burgerBack } from "../assets";
import { Ingredient } from "../store/ingredient/types";

const ByIngredient: React.FC = () => {
  const { ingredients, filteredData, filterLoading, filterError } =
    useAppSelector((state) => state.ingredients);

  const [ingredient, setIngredient] = useState<Ingredient>({} as Ingredient);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllIngredients());
  }, [dispatch]);

  const handleClick = (selectedItem: Ingredient) => {
    dispatch(filterByIngredient({ ingredient: selectedItem.strIngredient }));
    setIngredient(selectedItem);
  };

  return (
    <div className={` ${styles.paddingX} h-full w-full`}>
      <div className={styles.container}>
        <h1 className={styles.sectionHeadText}>
          Find Meals By Main Ingredients
        </h1>
        <AutoComplete
          placeholder="Find meal by ingredient"
          options={ingredients}
          accessOptions={(ingredient) => ingredient.strIngredient}
          onfindPress={handleClick}
          loading={filterLoading}
          buttonLabel="Find Meal"
        />
        {ingredient && (
          <div className="space-y-4 mt-4">
           
            <p className="text-black">{ingredient.strDescription}</p>
            <h2 className="text-4xl text-amber-500 text-center font-extralight uppercase">
              {ingredient.strIngredient} Meals
            </h2>
          </div>
        )}
        <div className="flex flex-wrap gap-8 py-4 justify-center">
          {filteredData.length > 0 ? (
            filteredData.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))
          ) : filterLoading ? (
            <p>Loading...</p>
          ) : (
            <EmptyComponent
              placeholder={
                ingredient ? "No meal found" : "Choose an ingredient"
              }
              image={burgerBack}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ByIngredient;
