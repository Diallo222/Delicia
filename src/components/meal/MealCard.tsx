import { motion } from "motion/react";
import { useAppDispatch } from "../../store/hooks";
import type { Meal } from "../../store/meal/types";
import { getMealDetails } from "../../store/meal/mealSlice";
import { useTransitionNavigate } from "../transition";

interface MealCardProps {
  meal: Meal;
  index?: number;
}

const MealCard = ({ meal, index = 0 }: MealCardProps) => {
  const navigate = useTransitionNavigate();
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
        className="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent opacity-90" />
      <div className="absolute inset-x-0 bottom-0 p-3 md:p-6">
        <p className="font-display text-base md:text-2xl text-foam uppercase leading-tight text-balance line-clamp-2">
          {meal.strMeal}
        </p>
        <span className="mt-2 inline-block font-body text-xs uppercase tracking-[0.2em] text-amber">
          View recipe →
        </span>
      </div>
    </motion.button>
  );
};

export default MealCard;
