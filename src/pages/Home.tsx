import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getMealCategories } from "../store/categories/categoriesSlice";
import { AutoComplete } from "../components/autoComplete";
import { styles } from "../styles";
const Home: React.FC = () => {
  const { categories, loading, error } = useAppSelector(
    (state) => state.categories
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMealCategories());
  }, [dispatch]);

  return (
    <div className={` ${styles.paddingX} h-full w-full   `}>
      <div className="container mx-auto flex flex-col justify-center items-center">
        <h1 className="text-3xl text-black">HELLO</h1>
        <div className="flex justify-center items-center gap-10">
          <AutoComplete
            label="Categories"
            options={categories}
            accessOptions={(category) => category.strCategory}
          />
          <AutoComplete
            label="Categories"
            options={categories}
            accessOptions={(category) => category.strCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
