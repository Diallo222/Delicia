import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/nav";

function Layout() {
  return (
    <div className=" bg-slate-100 w-screen h-screen">
      <NavBar />
      <div className="flex-1 bg-slate-100">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
