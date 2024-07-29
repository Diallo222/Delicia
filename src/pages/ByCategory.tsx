import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useSearchParams } from "react-router-dom";
import { MealCard } from "../components/meal";

const ByCategory: React.FC = () => {
  const { categories, filteredData, filterLoading, filterError } =
    useAppSelector((state) => state.categories);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  console.log(filteredData);

  return (
    <div>
      <div className="container mx-auto flex flex-col justify-center items-center">
        <h1 className="text-5xl text-black my-3">Meals By Category</h1>
        <p className="text-black text-2xl">Selected category: {category}</p>
        <div className="flex flex-wrap gap-8 py-4 justify-center">
          {filteredData.length > 0
            ? filteredData.map((meal) => (
                <MealCard key={meal.idMeal} meal={meal} />
              ))
            : "No results found"}
        </div>
      </div>

      {/* Render your category-based content here */}
    </div>
  );
};

export default ByCategory;
