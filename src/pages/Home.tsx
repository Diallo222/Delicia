import React from "react";
import { WelcomeText } from "../components/home";
import { styles } from "../styles";
import { burgerBack } from "../assets";
import { NavButton } from "../components/nav";


const Home: React.FC = () => {
  return (
    <div className={` ${styles.paddingX} h-full w-full`}>
      <div className={styles.container}>
        <WelcomeText />
        <div className="mt-10">
          <p className="text-4xl text-amber-500 text-center font-extralight uppercase">
            Search for your meals NOW
          </p>
          <div className="flex  justify-center items-center gap-4 my-2">
            <NavButton label="By Categories" path="/ByCategory" />
            <NavButton label="By Ingredients" path="/ByIngredient" />
          </div>
        </div>
        <img
          className="w-[550px] h-[550px] object-contain "
          src={burgerBack}
        />
      </div>
    </div>
  );
};

export default Home;
