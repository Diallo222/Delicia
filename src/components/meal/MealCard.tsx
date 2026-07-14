import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import type { Meal } from "../../store/meal/types";
import { getMealDetails } from "../../store/meal/mealSlice";

interface MealCardProps {
  meal: Meal;
  index?: number;
}

const MealCard = ({ meal, index = 0 }: MealCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(getMealDetails({ id: meal.idMeal }));
    navigate(`/MealDetail?id=${meal.idMeal}`);
  };

  return (
    <motion.button
      type="button"
      data-cursor-hover
      onClick={handleClick}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: (index % 6) * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative aspect-[4/5] w-full overflow-hidden bg-night text-left"
    >
      <motion.img
        layoutId={`meal-image-${meal.idMeal}`}
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <p className="font-display text-xl md:text-2xl text-foam uppercase leading-tight text-balance">
          {meal.strMeal}
        </p>
        <span className="mt-2 inline-block font-body text-xs uppercase tracking-[0.2em] text-amber opacity-0 group-hover:opacity-100 transition-opacity">
          View recipe →
        </span>
      </div>
    </motion.button>
  );
};

export default MealCard;
