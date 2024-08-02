import React from "react";
import { WelcomeText } from "../components/home";
import { styles } from "../styles";
import { burgerBack, salad } from "../assets";
import { NavButton } from "../components/nav";
import { ParallaxStickers } from "../components/parallax";

const Home: React.FC = () => {
  return (
    <div className={` ${styles.paddingX} h-full w-full`}>
      <div className={styles.container}>
        <WelcomeText />
        <div className=" mt-3">
          <div className="flex  justify-center items-center gap-4 ">
            <NavButton label="By Categories" path="/ByCategory" />
            <NavButton label="By Ingredients" path="/ByIngredient" />
          </div>
        </div>
        <img className={styles.foodImage} src={burgerBack} />
      </div>
      <ParallaxStickers
        rotate="rotate-[10deg] md:rotate-[4deg]"
        baseVelocity={-10}
      >
        BITE NOW
        <img src={burgerBack} className="w-20 h-20 object-contain" />
      </ParallaxStickers>
      <ParallaxStickers
        rotate="rotate-[-10deg] md:rotate-[-4deg]"
        baseVelocity={10}
      >
        TASTE NOW
        <img src={salad} className="w-20 h-20 object-contain" />
      </ParallaxStickers>
    </div>
  );
};

export default Home;
