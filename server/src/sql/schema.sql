/*Creates two tables*/


CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

/*Tracks performance metrics linked to user_id*/
/*Columns: date, squat_lbs, bench_lbs, shoulder_lbs, vertical_jump_lbs, plank_seconds, sprint_seconds.*/
CREATE TABLE IF NOT EXISTS metrics (
  id SERIAL PRIMARY KEY, /*SERIAL -> Auto-incrementing integer, */
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, /*CASCADE -> if user is deleted from table, all metrics with that user_id are automatically deleted*/
  date DATE NOT NULL,
  squat_lbs INTEGER NOT NULL,
  bench_lbs INTEGER NOT NULL,
  shoulder_lbs INTEGER NOT NULL,
  vertical_jump_lbs INTEGER NOT NULL,
  plank_seconds INTEGER NOT NULL,
  sprint_seconds NUMERIC(4,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

/*IF NOT EXISTS -> indempotent*/
/*REFERENCES users(id) -> foreign key constrain, user_id must match an existing id in the users table. */




