import { Outlet } from "react-router-dom";
import { NavBar } from "../components/nav";
import { CustomCursor, PageTransition } from "../components/transition";

const Layout = () => {
  return (
    <div className="grain relative min-h-screen bg-cream text-ink overflow-x-hidden">
      <CustomCursor />
      <PageTransition />
      <NavBar />
      <main id="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
