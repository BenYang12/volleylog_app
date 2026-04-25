//Decides who is logged in (user state)
//Decides what routes exist (/, /auth, /charts)
//Decides what page to show based on whether someone is logged in
import { useEffect, useState } from "react"; //useState stores state inside component, useEffect runs code at certain times (on initial load)
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"; //useNavigate is for programmatically changing URL

import NavBar from "./components/NavBar.jsx"; //components
import AuthPage from "./pages/AuthPage.jsx";
import Home from "./pages/Home.jsx";
import Charts from "./pages/Charts.jsx";

import { api } from "./services/api.js"; //helper for talking to backend

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => {
        if (res.status === 200) return res.json().then(setUser);
      })
      .finally(() => setLoading(false));
  }, []);

  function handleLogout() {
    api.post("/auth/logout").then(() => {
      //hit auth/logout on backend
      setUser(null); //clear local user state
      navigate("/auth"); //redirect to /auth
    });
  }

  if (loading) return null;

  return (
    <>
      <NavBar user={user} onLogout={handleLogout} />{" "}
      {/*passes logged-in user and logout handler into navbar */}
      <Routes>
        <Route path="/auth" element={<AuthPage onAuthed={setUser} />} />
        {/* /auth route shows AuthPage */}
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/auth" replace />}
        />
        {/* if user exists -> show the page (Home or Charts), if null, go to /auth using <Navigate> */}
        <Route
          path="/charts"
          element={user ? <Charts /> : <Navigate to="/auth" replace />}
        />
        <Route path="*" element={<Navigate to={user ? "/" : "/auth"} />} />
      </Routes>
    </>
  );
}
