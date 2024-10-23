import React from "react";
import { styles } from "../../styles";
import { FoodImage } from "../shared";

interface EmptyComponentProps {
  placeholder: string;
  image: string;
}
const EmptyComponent: React.FC<EmptyComponentProps> = ({
  placeholder,
  image,
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <p className=" text-xl md:text-4xl text-black z-10">{placeholder}</p>
      <FoodImage image={image} />
    </div>
  );
};

export default EmptyComponent;
