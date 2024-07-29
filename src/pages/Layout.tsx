import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/nav";

const Layout: React.FC = () => {
  return (
    <div className=" bg-amber-100 w-screen h-screen">
      <NavBar />
      <div className="flex-1 bg-amber-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
