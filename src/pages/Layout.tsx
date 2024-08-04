import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/nav";

const Layout: React.FC = () => {
  return (
    <div className=" bg-amber-100 w-screen h-screen">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Layout;
