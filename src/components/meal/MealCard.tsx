import React from "react";
import { Meal } from "../../store/meal/types";
interface MealCardProps {
    meal: Meal;
}
const MealCard: React.FC<MealCardProps> = ({ meal  }) => {
  return (
    <div>
      <p>{meal.strMeal}</p>
    </div>
  )
};

export default MealCard;
