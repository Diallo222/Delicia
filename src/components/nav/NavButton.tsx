import React from "react";

interface NavButtonProps {
  label: string;
  path: string;
}
const NavButton: React.FC<NavButtonProps> = ({ label, path }) => {
  return (
    <a href={path} className="text-amber-100 text-xl bg-zinc-800 px-2 md:px-6 py-2 rounded-md hover:border-dotted  hover:text-zinc-900 hover:bg-amber-400 transition-colors">
      {label}
    </a>
  );
};

export default NavButton;
