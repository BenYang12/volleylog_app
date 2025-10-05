// Express router for auth endpoints
import { Router } from "express";
import bcrypt from "bcrypt"; // password hashing
import { pool } from "../db.js";

const router = Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "password and email required" });

  try {
    const hash = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      "INSERT INTO users(email, password_hash) VALUES($1, $2) RETURNING id, email",
      [email, hash],
    );
    req.session.user = { id: rows[0].id, email: rows[0].email }; // server-side session
    res.json(req.session.user);
  } catch (e) {
    if (e.code === "23505")
      return res.status(400).json({ error: "Email is already registered" });
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { rows } = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  const user = rows[0];
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(400).json({ error: "Invalid credentials" });

  req.session.user = { id: user.id, email: user.email };
  res.json(req.session.user);
});

// destory session
router.post("/logout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

router.get("/me", (req, res) => {
  if (req.session?.user) return res.json(req.session.user);
  res.status(204).end();
});

export default router;
