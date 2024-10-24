import React from "react";
import { motion } from "framer-motion";
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

        <div className=" flex flex-col justify-center items-center lg:items-start w-full mt-4 gap-8 lg:gap-4 ">
          <NavButton
            text="By Categories"
            image={burgerBack}
            path="/ByCategory"
          />
          <NavButton text="By Ingredients" image={salad} path="/ByIngredient" />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <ParallaxStickers
          rotate="rotate-[10deg] md:rotate-[4deg]"
          baseVelocity={-10}
        >
          BITE NOW
          <img
            src={burgerBack}
            className="w-12 h-12 md:w-20 md:h-20 object-contain"
          />
        </ParallaxStickers>
        <FoodImage image={burgerBack} />
        <ParallaxStickers
          rotate="rotate-[-10deg] md:rotate-[-4deg]"
          baseVelocity={10}
        >
          TASTE NOW
          <img
            src={salad}
            className="w-12 h-12 md:w-20 md:h-20 object-contain"
          />
        </ParallaxStickers>
      </motion.div>
    </div>
  );
};

export default Home;
