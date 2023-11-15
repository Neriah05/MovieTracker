import { useState } from "react";
import { NavLink } from "react-router-dom";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="main-nav">
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        More ▼
      </div>

      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/" className="main-nav-link">
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className="main-nav-link">
            MOVIES
          </NavLink>
        </li>
        <li>
          <NavLink to="/tvseries" className="main-nav-link">
            TV SERIES
          </NavLink>
        </li>
        <li>
          <NavLink to="/categories" className="main-nav-link">
            CATEGORIES
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
