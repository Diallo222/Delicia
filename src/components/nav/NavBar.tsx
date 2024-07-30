import React, { useState } from "react";
import { styles } from "../../styles";
import NavButton from "./NavButton";

const Navbar: React.FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <nav className={`${styles.paddingX} w-full flex items-center`}>
      <div className="mt-4">
        <a href="/" className="text-4xl font-medium text-amber-500 hover:text-black">DELICIA.</a>
      </div>
      {/* <div className="container mx-auto ">
        <div className="flex items-center  h-16">
          <div className="hidden md:flex space-x-8 mx-auto">
            <NavButton label="Home" path="/" />
            <NavButton label="By Ingredients" path="/ByIngredient" />
            <NavButton label="By Name" path="/ByName" />
          </div>

          <button
            className="block md:hidden absolute right-6"
            onClick={() => setVisible(!visible)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        <div
          className={` ${
            visible ? "block" : "hidden"
          } p-6 black-gradient bg-zinc-900 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-20 rounded-xl`}
        >
          <div className="space-y-4 flex flex-col">
            <NavButton label="Home" path="/" />
            <NavButton label="By Ingredients" path="/ByIngredient" />
            <NavButton label="By Name" path="/ByName" />
          </div>
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;
