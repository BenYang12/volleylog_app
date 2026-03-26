//shows logo, links, logout button

import { Link } from "react-router-dom"; // React Router component to change URL without full reload

//props are a mechanism for passing data from a parent component to a child component -> arguments that you can pass into component
export default function NavBar({ user, onLogout }) {
  //two props -> user, onLogout
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
          {/* User exists? -> show routes */}
          <button onClick={onLogout} className="btn btn--ghost">
            Logout
          </button>
        </div>
      ) : (
        <div className="nav__actions">
          <Link to="/auth" className="btn btn--primary">
            Login / Register {/* No User? -> show Login/Register button */}
          </Link>
        </div>
      )}
    </nav>
  );
}
