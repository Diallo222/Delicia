import React from "react";
import { styles } from "../../styles";

const Navbar: React.FC = () => {

  return (
    <nav className={`${styles.paddingX} w-full flex items-center`}>
      <div className="mt-4">
        <a href="/" className="text-4xl font-medium text-amber-500 hover:text-black">DELICIA.</a>
      </div>
    </nav>
  );
};

export default Navbar;
