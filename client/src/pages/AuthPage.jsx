//handles switching between login

import { api } from "../services/api.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage({ onAuthed }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    setError("");
    setSubmitting(true);
    const path = mode === "login" ? "/auth/login" : "/auth/register";
    const res = await api.post(path, { email, password });
    if (!res.ok) {
      const msg = (await res.json()).error || "Failed";
      setError(msg);
      setSubmitting(false);
      return;
    }
    const user = await res.json();
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
            type="email"
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

        <button type="submit" disabled={submitting}>
          {submitting ? "Please wait…" : mode === "login" ? "Login" : "Create account"}
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
