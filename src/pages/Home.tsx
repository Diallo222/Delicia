import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  filterByCategory,
  getMealCategories,
} from "../store/categories/categoriesSlice";
import { AutoComplete } from "../components/autoComplete";
import { WelcomeText } from "../components/home";
import { styles } from "../styles";
import { burger, burgerBack } from "../assets";

interface Category {
  strCategory: string;
}
const Home: React.FC = () => {
  const { categories, loading, error } = useAppSelector(
    (state) => state.categories
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMealCategories());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleClick = (selectedItem: Category) => {
    dispatch(filterByCategory({ category: selectedItem.strCategory }));
    navigate(`/ByCategory?category=${selectedItem.strCategory}`);
  };

  return (
    <div className={` ${styles.paddingX} h-full w-full`}>
      <div className="container mx-auto flex flex-col justify-center items-center">
        <WelcomeText />
        <div className="mt-10">
          <p className="text-2xl text-amber-500 text-center font-extralight uppercase">
            Search for your meals NOW
          </p>
          <div className="flex  justify-center items-center">
            <AutoComplete
              label="Find meal by category"
              options={categories}
              accessOptions={(category) => category.strCategory}
              onfindPress={handleClick}
            />
          </div>
        </div>
        <img
          className="w-[550px] h-[550px] object-contain rounded-full"
          src={burgerBack}
        />
      </div>
    </div>
  );
};

export default Home;
