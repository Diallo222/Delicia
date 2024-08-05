import React from "react";

const WelcomeText: React.FC = () => {
  return (
    <div className="flex justify-center items-center flex-col  mt-2 space-y-2 z-10">
      <h1 className="text-5xl md:text-9xl text-black text-center ">THE ART OF COOKING.</h1>
      <p className="text-2xl md:text-5xl text-zinc-900 text-center ">
        Find recipes for delicious meals
      </p>
    </div>
  );
};

export default WelcomeText;
