import React from "react";
import { useNavigate } from "react-router-dom";
interface NavButtonProps {
  label: string;
  path: string;
}
const NavButton: React.FC<NavButtonProps> = ({ label, path }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(path);
  };
  return (
    <button
      onClick={handleClick}
      className="text-amber-100 text-xl bg-zinc-800 px-2 md:px-6 py-2 rounded-md hover:border-dotted  hover:text-zinc-900 hover:bg-amber-400 transition-colors"
    >
      {label}
    </button>
  );
};

export default NavButton;
