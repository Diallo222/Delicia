import { Outlet } from "react-router-dom";
import { NavBar } from "../components/nav";
import { CustomCursor, TransitionProvider } from "../components/transition";

const Layout = () => {
  return (
    <TransitionProvider>
      <div className="grain relative min-h-screen bg-cream text-ink overflow-x-hidden">
        <CustomCursor />
        <NavBar />
        <main id="main">
          <Outlet />
        </main>
      </div>
    </TransitionProvider>
  );
};

export default Layout;
