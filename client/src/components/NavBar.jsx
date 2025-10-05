//navbar
//include image to make it look more official

import { Link } from "react-router-dom";

export default function NavBar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="brand">
        <img
          className="brand__logo"
          src="/volleyball.png"
          alt="Volleylog logo"
        />
        <h3 className="brand__name">Volleylog</h3>
      </div>

      {user ? (
        <div className="nav__actions">
          <Link to="/">Home</Link>
          <Link to="/charts">Visualizations</Link>
          <button onClick={onLogout} className="btn btn--ghost">
            Logout
          </button>
        </div>
      ) : (
        <div className="nav__actions">
          <Link to="/auth" className="btn btn--primary">
            Login / Register
          </Link>
        </div>
      )}
    </nav>
  );
}
