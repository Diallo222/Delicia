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
      className="text-black bg-amber-400 lg:bg-transparent  flex flex-row items-center   md:px-6 py-1 rounded-full hover:bg-amber-400 hover:border-none transition-colors z-10"
    >
      <img src={image} alt="" className=" w-16 h-16 object-contain bg-amber-400 p-1 rounded-full" />
      <span className="ml-2 text-lg">{text}</span>
    </button>
  );
};

export default NavButton;
