// Authentication Routes
//Endpoint : Method : Description
//register : POST   : Hashes password with bcrypt and creates new user
//login    : POST   : Verifies credentials and stores user in session
//logout   : POST   : Destroys Session
//me       : GET    : Returns current user if logged in

//I use bcrypt for password security
//I use PostgreSQL unique constraint to prevent duplicate registrations (A PostgreSQL UNIQUE constraint ensures that all values in a specified column or a group of columns are distinct within a table. This means no two rows can have the same value or combination of values in the constrained columns. )

import { Router } from "express";
import bcrypt from "bcrypt"; // secure password hashing, never store raw passwords, only hashes
import { pool } from "../db.js"; //PostgreSQLL connection pool, pool.query() to talk to users table

const router = Router();
//Router() lets me create mini Express app must for auth routes, plug into main app with app.use("/api/auth", authRoutes); in index.js
//“I split authentication into its own route module using express.Router(), and I use bcrypt plus a Postgres connection pool (pg.Pool) to securely store and verify user credentials.”

//“I modularized my authentication logic into its own Express router. It uses bcrypt to hash and verify passwords and uses a shared pg.Pool instance to talk to the Postgres users table.”

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { email, password } = req.body; //reads email and password into req.body
  if (!email || !password)
    //validation
    return res.status(400).json({ error: "password and email required" });

  try {
    const hash = await bcrypt.hash(password, 10); //salt rounds (cost factor), higher is slower but more secure
    const { rows } = await pool.query(
      // RUNS SQL
      "INSERT INTO users(email, password_hash) VALUES($1, $2) RETURNING id, email",
      [email, hash],
    );
    //pool.query() inserts a new row into users table

    req.session.user = { id: rows[0].id, email: rows[0].email }; // create session, stored server-side by express-session
    //browser gets a session ID cookie that points to this data

    res.json(req.session.user); //send a JSON-formatted response to the client and then end the response process
  } catch (e) {
    if (e.code === "23505")
      return res.status(400).json({ error: "Email is already registered" });
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    const user = rows[0];
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });

    req.session.user = { id: user.id, email: user.email };
    res.json(req.session.user);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
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
