import React from "react";
import { Meal } from "../store/meal/types";
import { styles } from "../styles";
import { useAppSelector } from "../store/hooks";
import { RequestError } from "../components/errors";
import { BarLoader } from "../components/loaders";

function getIngredientsWithMeasures(meal: Meal): string[] {
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = (meal as any)[`strIngredient${i}`];
    const measure = (meal as any)[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }
  return ingredients;
}
const MealDetail: React.FC = () => {
  const { details, detailsLoading, detailsError } = useAppSelector(
    (state) => state.meal
  );

  const ingredientsWithMeasures =
    details && getIngredientsWithMeasures(details);
  const handleClick = () => {
    window.open(details?.strYoutube, "_blank");
  };
  return (
    <div className={` ${styles.paddingX} h-full w-full`}>
      <div className="container mx-auto flex flex-col justify-center items-center">
        {detailsError && <RequestError error={detailsError} />}
        {detailsLoading && (
          <BarLoader placeholder="Looking for meal ingredints..." />
        )}

        {details && (
          <>
            <div className="flex flex-col gap-2 md:gap-12 p-1 md:p-4 justify-between items-center w-full  rounded-xl ">
              <div className="w-full md:w-2/3 flex flex-col md:flex-row justify-center gap-4 ">
                <img
                  className="w-80 h-80  rounded-ss-3xl rounded-ee-3xl object-cover"
                  src={details?.strMealThumb}
                  alt=""
                />
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-7xl text-amber-500 my-3">
                    {details?.strMeal}
                  </h1>
                  <p className="text-amber-500 text-2xl">
                    Categorie : {details?.strCategory}
                  </p>
                  <p className="text-amber-500 text-2xl">
                    Area : {details?.strArea}
                  </p>
                  <button
                    onClick={handleClick}
                    className=" text-red-600 text-xl bg-zinc-800 px-6 py-2 rounded-md hover:border-dotted  hover:text-zinc-900 hover:bg-amber-400 transition-colors"
                  >
                    Youtube Tutorial
                  </button>
                </div>
              </div>

              <div className="w-full lg:w-2/3  overflow-y-auto h-full   md:h-[500px]  bg-zinc-900 p-4 rounded-2xl">
                <h1 className="text-amber-400 my-2">Instructions</h1>
                <p className="text-amber-100 text-base">
                  {details?.strInstructions}
                </p>
                <h1 className="text-amber-400 my-2">Measures</h1>
                <ul>
                  {ingredientsWithMeasures &&
                    ingredientsWithMeasures.map((item, index) => (
                      <li className="text-amber-100" key={index}>
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MealDetail;
