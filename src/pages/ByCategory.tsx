import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useSearchParams } from "react-router-dom";

const ByCategory: React.FC = () => {
  const { categories, filteredData, filterLoading, filterError } =
    useAppSelector((state) => state.categories);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  console.log(filteredData);

  return (
    <div>
      <h1>By Category</h1>
      <p className="text-black">Selected category: {category}</p>
      {/* Render your category-based content here */}
    </div>
  );
};

export default ByCategory;
