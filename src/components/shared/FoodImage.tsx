import React from "react";

interface FoodImageProps {
  image: string;
}
const FoodImage: React.FC<FoodImageProps> = ({ image }) => {
  return (
    <div className="bg-amber-500 pb-20 px-6 md:px-0 md:pb-12 rounded-t-full absolute bottom-0 left-1/2 transform -translate-x-1/2 ">
    <img src={image} className="w-[300px] h-[200px] md:w-[420px] md:h-[420px] object-contain" />
  </div>
  );
};

export default FoodImage;
