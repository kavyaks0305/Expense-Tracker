import { NavLink } from "react-router-dom";

import './Navigation.scss'

function Navigation() {
  return (
    <aside className="sidebar">
      <div className="user-container">
        <div>user name</div>
      </div>

      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>

        <NavLink to="/transactions">Transactions</NavLink>
      </nav>
    </aside>
  );
}

export default Navigation;
