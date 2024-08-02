import React from "react";
import { useNavigate } from "react-router-dom";
interface NavButtonProps {
  image: string;
  text: string;
  path: string;
}
const NavButton: React.FC<NavButtonProps> = ({image, text, path }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(path);
  };
  return (
    <button
      onClick={handleClick}
      className="text-black bg-amber-400 md:bg-transparent text-xl flex flex-row items-center  px-1 md:px-6 py-1 rounded-3xl    hover:bg-amber-400 transition-colors"
    >
      <img src={image} alt="" className="w-20 h-20 object-contain bg-amber-400 p-1 rounded-full" />
      <span className="ml-2">{text}</span>
    </button>
  );
};

export default NavButton;
