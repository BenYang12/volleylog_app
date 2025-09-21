//NavLink is a link component that knows if it's active -> enhanced version of Link component
//I will use NavLink cus its easier to style
//useNavigate is a hook -> returns function that allows me to navigate to different routes in response to events/conditions, rather than user interaction
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function NavBar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); //get current logged-in user

  async function handleLogout() {
    await logout(); //clear session server-side
    navigate("/login");
  }

  return (
    <nav>
      <NavLink to="/metrics">Metrics</NavLink>
      <NavLink to="/progress">Progress</NavLink>
      <div style={{ marginLeft: "auto" }}>
        {user ? (
          <>
            <span style={{ marginRight: 13, opacity: 0.8 }}>
              Hi, {user.username}
            </span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </nav>
  );
}
