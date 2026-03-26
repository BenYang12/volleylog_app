//Database Connection
//uses pg.Pool to. manage PostgreSQL connections
//loads connection string from process.env.DATABASE_URL

//has initialization function (init) that reads sql/schema.sql and executees it to set up tables
//used by routes to run queries (pool.query())

import dotenv from "dotenv";
import { resolve } from "path";
import { fileURLToPath } from "url"; //helps me build file paths that work on any OS
import pg from "pg"; //PostgreSQL driver for Node.js -> how my Node app connects to a Postgres database.
//fs module provides a lot of very useful functionality to access and interact with the file system
//just require it
import { readFileSync } from "fs"; //lets me read contents of a file from disk (schema.sql)
//I use pg to connect to PostgreSQL, dotenv and environment variables for configuration, and fs + path to load my SQL schema from a file so I can initialzie the database tables programatically.

dotenv.config(); //environment variable
const { Pool } = pg; //pulls Pool class off of pg library -> instead of establishing a new connection to the PostgreSQL server for every database query, pg.Pool maintains a set of open connections that can be reused
//I use pg.Pool to manage a pool of database connections, which is more efficient for a web server than opening a new connection for every request

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
//create connection pool to PostgreSQL database
//connection string is something like postgresql://username@localhost:5432/volleylog
//after doing this i can do this anywhere in my backend...
//import { pool } from "../db.js";
//const result = await pool.query("SELECT * FROM users");

//Big idea: Pool manages multiple connections to Postgres so concurrent requests can be handled efficiently. I share a single pool instance across my app and call pool.query() in my routes to interact with the database.

async function init() {
  //special function to initialize database schema
  const __dirname = fileURLToPath(new URL(".", import.meta.url)); //get current folder's path
  //because my project uses ES modules and NOT CommonJS, I reconstruct __dirname with fileURLToPath so I can resolve relative paths like the location of my schema.sql file

  const schema = readFileSync(resolve(__dirname, "sql", "schema.sql"), "utf8"); //resolve builds full path to sql/schema.sql, readFileSync() opens file, reads its content as a string, and becomes a big string containing all CREATE TABLE statements
  //Instead of hardcoding SQL in my JS, I keep schema in schema.sql and read it from disk when initing database.

  await pool.query(schema);
  //sends full schema string to Postgres, which executes all statements
  //1. connects to whatever database DATABASE_URL points to, creates users and metrics tables if they're not already there
  //does NOT create database itself, just handles tables. We create DB manually using psql

  //“I have a small init script that reads schema.sql and runs it via pool.query(). That initializes my database schema by creating the necessary tables. The actual database object is created separately; the Node script just manages table setup.”
  console.log("Database initialized");
  process.exit(0);
}

if (process.argv[2] === "init") {
  init().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
//I wired up a small CLI entry point using process.argv so I can run npm run db:init to initialize schema.

//My db.js file sets up the connection to PostgreSQL using pg.Pool, with the connection string read from an environment variable via dotenv. I export a shared pool instance that the rest of my app uses to run SQL queries.
//I also define an init function that reads a schema.sql file from disk and runs it with pool.query() to create the users and metrics tables if they don’t exist. I expose this as a small CLI script (npm run db:init) using process.argv, so initializing the schema is just a one-line command. This keeps database configuration and schema management simple and consistent across environments.”
