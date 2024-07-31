import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { MealCard } from "../components/meal";
import { styles } from "../styles";
import { AutoComplete } from "../components/autoComplete";
import {
  filterByCategory,
  getMealCategories,
} from "../store/categories/categoriesSlice";
import { EmptyComponent } from "../components/empty";
import { salad } from "../assets";
import { BarLoader } from "../components/loaders";

interface Category {
  strCategory: string;
}
const ByCategory: React.FC = () => {
  const { categories, filteredData, filterLoading, filterError } =
    useAppSelector((state) => state.categories);

  const [category, setCategory] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMealCategories());
  }, [dispatch]);
  const handleClick = (selectedItem: Category) => {
    dispatch(filterByCategory({ category: selectedItem.strCategory }));
    setCategory(selectedItem.strCategory);
  };

  return (
    <div className={` ${styles.paddingX} h-full w-full`}>
      <div className={styles.container}>
        <h1 className={styles.sectionHeadText}>Find Meals By Category</h1>
        <AutoComplete
          placeholder="Find meal by category"
          options={categories}
          accessOptions={(category) => category.strCategory}
          onfindPress={handleClick}
          loading={filterLoading}
          buttonLabel="Find Meal"
        />
        {category && (
          <p className="text-black text-2xl text-center my-4">
            Selected category: {category}
          </p>
        )}
        <div className="flex flex-wrap gap-8 py-4 justify-center">
          {filteredData.length > 0 ? (
            filteredData.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))
          ) : filterLoading ? (
            <BarLoader placeholder="Looking for meals ..." />
          ) : (
            <EmptyComponent
              placeholder={category ? "No meal found" : "Choose a category"}
              image={salad}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ByCategory;
