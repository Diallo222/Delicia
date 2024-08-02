import React from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "../../styles";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <nav className={`${styles.paddingX} w-full flex items-center`}>
      <button
        onClick={handleClick}
        className=" mt-4 text-4xl outline-none py-1 px-2 bg-transparent font-medium text-amber-500 hover:text-black hover:bg-amber-400 transition-colors "
      >
        DELICIA.
      </button>
    </nav>
  );
};

export default Navbar;
