import React from "react";

interface EmptyComponentProps {
  placeholder: string;
  image?: string;
}
const EmptyComponent: React.FC<EmptyComponentProps> = ({
  placeholder,
  image,
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <p className=" text-xl md:text-5xl text-amber-400">{placeholder}</p>
      <img src={image} alt="" />
    </div>
  );
};

export default EmptyComponent;
