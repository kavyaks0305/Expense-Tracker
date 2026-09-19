import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import './MainLayout.scss'

function MainLayout() {
  return (
    <div className="main-layout">
      <Navigation />

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
