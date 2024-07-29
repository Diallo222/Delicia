import React from "react";

interface NavButtonProps {
  label: string;
  path: string;
}
const NavButton: React.FC<NavButtonProps> = ({ label, path }) => {
  return (
    <a href={path} className="text-amber-100 bg-zinc-800 px-4 py-2 rounded-md hover:border-dotted  hover:text-amber-300 transition-colors">
      {label}
    </a>
  );
};

export default NavButton;
