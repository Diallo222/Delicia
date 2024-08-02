import React from "react";

const WelcomeText: React.FC = () => {
  return (
    <div className="flex justify-center items-center flex-col  mt-4 space-y-4">
      <h1 className="text-5xl md:text-9xl text-black text-center ">THE ART OF COOKING.</h1>
      <p className="text-2xl md:text-5xl text-amber-500 z-10 text-center ">
        Find recipes for delicious meals
      </p>
    </div>
  );
};

export default WelcomeText;
