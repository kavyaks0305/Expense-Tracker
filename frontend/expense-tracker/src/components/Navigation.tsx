import { NavLink } from "react-router-dom";
import Profile from "./Profile";

import './Navigation.scss'

function Navigation() {
  return (
    <aside className="sidebar">
      <div className="user-container">
        <Profile/>
      </div>

      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>

        <NavLink to="/transactions">Transactions</NavLink>
      </nav>
    </aside>
  );
}

export default Navigation;
