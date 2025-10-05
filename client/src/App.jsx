import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import Home from "./pages/Home.jsx";
import Charts from "./pages/Charts.jsx";
import { api } from "./services/api.js";

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check session on load
  useEffect(() => {
    api.get("/auth/me").then((res) => {
      if (res.ok) return res.json().then(setUser);
    });
  }, []);

  function handleLogout() {
    api.post("/auth/logout").then(() => {
      setUser(null);
      navigate("/auth");
    });
  }

  return (
    <>
      <NavBar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/auth" element={<AuthPage onAuthed={setUser} />} />
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/charts"
          element={user ? <Charts /> : <Navigate to="/auth" replace />}
        />
        <Route path="*" element={<Navigate to={user ? "/" : "/auth"} />} />
      </Routes>
    </>
  );
}
