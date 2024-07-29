import React from "react";

const WelcomeText: React.FC = () => {
  return (
    <div className="flex justify-center items-center flex-col  mt-8 space-y-4">
      <h1 className="text-4xl md:text-9xl text-black ">THE ART OF COOKING.</h1>
      <p className="text-2xl md:text-5xl text-black z-10">
        Find recipes for delicious meals
      </p>
    </div>
  );
};

export default WelcomeText;
