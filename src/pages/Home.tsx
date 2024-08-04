import React from "react";
import { WelcomeText } from "../components/home";
import { styles } from "../styles";
import { burgerBack, salad } from "../assets";
import { NavButton } from "../components/nav";
import { ParallaxStickers } from "../components/parallax";
import { FoodImage } from "../components/shared";

const Home: React.FC = () => {
  return (
    <div className={` ${styles.paddingX} h-full w-full`}>
      <div className={styles.container}>
        <WelcomeText />

        <div className=" flex flex-col justify-center items-center md:items-start w-full mt-2 gap-4 ">
          <p className="text-2xl text-amber-500 z-10 text-center ">
            Find recipes for delicious meals
          </p>
          <NavButton
            text="By Categories"
            image={burgerBack}
            path="/ByCategory"
          />
          <NavButton text="By Ingredients" image={salad} path="/ByIngredient" />
        </div>
      </div>
      <ParallaxStickers
        rotate="rotate-[10deg] md:rotate-[4deg]"
        baseVelocity={-10}
      >
        BITE NOW
        <img src={burgerBack} className="w-12 h-12 md:w-20 md:h-20 object-contain" />
      </ParallaxStickers>
      <FoodImage image={burgerBack} />
      <ParallaxStickers
        rotate="rotate-[-10deg] md:rotate-[-4deg]"
        baseVelocity={10}
      >
        TASTE NOW
        <img src={salad} className="w-12 h-12 md:w-20 md:h-20 object-contain" />
      </ParallaxStickers>
    </div>
  );
};

export default Home;
