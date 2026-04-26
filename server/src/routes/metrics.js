//Metrics CRUD API, protected by requireAuth middleware
//POST /api/metrics/ creates a new metric entry for logged-in user
//GET /api/metrics/  Fetch all metrics for the logged-in user
//PUT /api/metrics/:id Update specific metric (only if owned by user)
//DELETE /api/metrics/:id Delete specific metric (only if owned by user)
import { pool } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { Router } from "express";

const router = Router();
router.use(requireAuth);

// Create
router.post("/", async (req, res) => {
  const u = req.session.user;
  const {
    date,
    squat_lbs,
    bench_lbs,
    shoulder_lbs,
    vertical_jump_lbs,
    plank_seconds,
    sprint_seconds,
  } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO metrics(user_id, date, squat_lbs, bench_lbs, shoulder_lbs, vertical_jump_lbs, plank_seconds, sprint_seconds)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING id, user_id, date, squat_lbs, bench_lbs, shoulder_lbs, vertical_jump_lbs, plank_seconds, sprint_seconds`,
      [
        u.id,
        date,
        squat_lbs,
        bench_lbs,
        shoulder_lbs,
        vertical_jump_lbs,
        plank_seconds,
        sprint_seconds,
      ],
    );
    res.status(201).json(rows[0]);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// Read
router.get("/", async (req, res) => {
  const u = req.session.user;
  try {
    const { rows } = await pool.query(
      `SELECT id, user_id, to_char(date, 'YYYY-MM-DD') AS date,
              squat_lbs, bench_lbs, shoulder_lbs, vertical_jump_lbs, plank_seconds, sprint_seconds
       FROM metrics WHERE user_id=$1 ORDER BY date ASC, id ASC`,
      [u.id],
    );
    res.json(rows);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// Update
router.put("/:id", async (req, res) => {
  const u = req.session.user;
  const id = Number(req.params.id);
  const {
    date,
    squat_lbs,
    bench_lbs,
    shoulder_lbs,
    vertical_jump_lbs,
    plank_seconds,
    sprint_seconds,
  } = req.body;
  try {
    const { rowCount, rows } = await pool.query(
      `UPDATE metrics SET date=$1, squat_lbs=$2, bench_lbs=$3, shoulder_lbs=$4, vertical_jump_lbs=$5, plank_seconds=$6, sprint_seconds=$7
       WHERE id=$8 AND user_id=$9
       RETURNING id, user_id, date, squat_lbs, bench_lbs, shoulder_lbs, vertical_jump_lbs, plank_seconds, sprint_seconds`,
      [
        date,
        squat_lbs,
        bench_lbs,
        shoulder_lbs,
        vertical_jump_lbs,
        plank_seconds,
        sprint_seconds,
        id,
        u.id,
      ],
    );
    if (!rowCount) return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  const u = req.session.user;
  const id = Number(req.params.id);
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM metrics WHERE id=$1 AND user_id=$2",
      [id, u.id],
    );
    if (!rowCount) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
