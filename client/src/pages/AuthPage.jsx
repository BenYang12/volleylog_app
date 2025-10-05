import { api } from "../services/api.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage({ onAuthed }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault(); // don't reload page
    setError("");
    const path = mode === "login" ? "/auth/login" : "/auth/register";
    const res = await api.post(path, { email, password });
    if (!res.ok) {
      // show server error
      const msg = (await res.json()).error || "Failed";
      setError(msg);
      return;
    }
    const user = await res.json(); // success → store user + go home
    onAuthed(user);
    navigate("/");
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{mode === "login" ? "Login" : "Register"}</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "0.5rem", maxWidth: 360 }}
      >
        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit">
          {mode === "login" ? "Login" : "Create account"}
        </button>
      </form>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <p style={{ marginTop: "1rem" }}>
        {mode === "login" ? (
          <>
            No account?{" "}
            <button onClick={() => setMode("register")}>Register</button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button onClick={() => setMode("login")}>Login</button>
          </>
        )}
      </p>
    </div>
  );
}
