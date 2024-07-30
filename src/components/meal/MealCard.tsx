import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { Meal } from "../../store/meal/types";
import { getMealDetails } from "../../store/meal/mealSlice";
interface MealCardProps {
  meal: Meal;
}
const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleCick = () => {
    dispatch(getMealDetails({ id: meal.idMeal }));
    navigate(`/MealDetail?id=${meal.idMeal}`);
  };
  return (
    <div className="bg-zinc-800 rounded-2xl p-2 gap-1 md:gap-4 w-42 md:w-96 flex flex-col md:flex-row  items-center">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className=" rounded-2xl h-40 w-40"
      />
      <div className="flex flex-col justify-center items-center gap-1 md:gap-4">
        <p className="text-amber-100 text-center w-40 md:w-full ">
          {meal.strMeal}
        </p>
        <button
          onClick={handleCick}
          className=" text-zinc-600  bg-amber-400 px-4 py-2 rounded-md hover:border-dotted  hover:text-zinc-900 hover:bg-amber-400 transition-colors"
        >
          View Ingredients
        </button>
      </div>
    </div>
  );
};

export default MealCard;
