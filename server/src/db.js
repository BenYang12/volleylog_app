import dotenv from "dotenv";
import { resolve } from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import { readFileSync } from "fs";

dotenv.config();
const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function init() {
  const __dirname = fileURLToPath(new URL(".", import.meta.url));
  const schema = readFileSync(resolve(__dirname, "sql", "schema.sql"), "utf8");
  await pool.query(schema);
  console.log("Database initialized");
  process.exit(0);
}

if (process.argv[2] === "init") {
  init().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
