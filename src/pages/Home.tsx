import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getMealCategories } from "../store/categories/categoriesSlice";
import { AutoComplete } from "../components/autoComplete";
import { WelcomeText } from "../components/home";
import { styles } from "../styles";
import { burger, burgerBack } from "../assets";
const Home: React.FC = () => {
  const { categories, loading, error } = useAppSelector(
    (state) => state.categories
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMealCategories());
  }, [dispatch]);

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
            />
          </div>
        </div>
        <img className="w-[550px] h-[550px] object-contain rounded-full mt-[-60px]" src={burgerBack} />
      </div>
    </div>
  );
};

export default Home;
