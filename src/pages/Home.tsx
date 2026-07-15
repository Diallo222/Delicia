import { useEffect } from "react";
import { burgerBack, salad } from "../assets";
import Hero from "../components/home/Hero";
import CategoryGallery from "../components/home/CategoryGallery";
import IngredientPromo from "../components/home/IngredientPromo";
import ClosingCta from "../components/home/ClosingCta";
import HomeFooter from "../components/home/HomeFooter";
import Marquee from "../components/parallax/Marquee";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getMealCategories } from "../store/categories/categoriesSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((s) => s.categories);

  useEffect(() => {
    if (!categories.length) {
      dispatch(getMealCategories());
    }
  }, [categories.length, dispatch]);

  return (
    <div className="w-full">
      <Hero />
      <Marquee text="Bite now" image={burgerBack} direction="left" />
      <Marquee
        text="Taste now"
        image={salad}
        direction="right"
        className="-mt-px"
      />
      <CategoryGallery categories={categories} />
      <IngredientPromo />
      <ClosingCta />
      <HomeFooter />
    </div>
  );
};

export default Home;
