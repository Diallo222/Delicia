import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getMealCategories } from "../store/categories/categoriesSlice";
import {AutoComplete} from "../components/autoComplete";

const Home: React.FC = () => {
  const { categories, loading, error } = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMealCategories());
  }, [dispatch]);

  return (
    <div className="bg-slate-100">
      <h1 className="text-3xl text-black">HELLO</h1>
      {!loading && !error && (
        <AutoComplete
          options={categories}
          accessOptions={(category) => category.strCategory}
        />
      )}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Home;
