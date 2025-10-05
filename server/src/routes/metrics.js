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
  } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO metrics(user_id, date, squat_lbs, bench_lbs, shoulder_lbs, vertical_jump_lbs, plank_seconds)
     VALUES($1,$2,$3,$4,$5,$6,$7)
     RETURNING id, user_id, date, squat_lbs, bench_lbs, shoulder_lbs, vertical_jump_lbs, plank_seconds`,
    [
      u.id,
      date,
      squat_lbs,
      bench_lbs,
      shoulder_lbs,
      vertical_jump_lbs,
      plank_seconds,
    ],
  );
  res.status(201).json(rows[0]);
});

// Read
router.get("/", async (req, res) => {
  const u = req.session.user;
  const { rows } = await pool.query(
    `SELECT id, user_id, to_char(date, 'YYYY-MM-DD') AS date,
            squat_lbs, bench_lbs, shoulder_lbs, vertical_jump_lbs, plank_seconds
     FROM metrics WHERE user_id=$1 ORDER BY date ASC, id ASC`,
    [u.id],
  );
  res.json(rows);
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
  } = req.body;
  const { rowCount, rows } = await pool.query(
    `UPDATE metrics SET date=$1, squat_lbs=$2, bench_lbs=$3, shoulder_lbs=$4, vertical_jump_lbs=$5, plank_seconds=$6
     WHERE id=$7 AND user_id=$8
     RETURNING id, user_id, date, squat_lbs, bench_lbs, shoulder_lbs, vertical_jump_lbs, plank_seconds`,
    [
      date,
      squat_lbs,
      bench_lbs,
      shoulder_lbs,
      vertical_jump_lbs,
      plank_seconds,
      id,
      u.id,
    ],
  );
  if (!rowCount) return res.status(404).json({ error: "Not found" });
  res.json(rows[0]);
});

// Delete
router.delete("/:id", async (req, res) => {
  const u = req.session.user;
  const id = Number(req.params.id);
  const { rowCount } = await pool.query(
    "DELETE FROM metrics WHERE id=$1 AND user_id=$2",
    [id, u.id],
  );
  if (!rowCount) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

export default router;
