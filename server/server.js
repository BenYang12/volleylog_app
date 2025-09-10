//connect to MongoDB Atlas, mount middleware and routes, seeds sample data, and listen for HTTP requests
import express from "express"; //create HTTP server and define routes/middleware
import mongoose from "mongoose"; //handles schemas and DB connection
import cors from "cors"; //middleware
import entriesRouter from "./routes/entries.js";
import Entry from "./models/Entry.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7500;
const ATLAS_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("Volleylog API is running")); //check if API is up
app.use("/api/entries", entriesRouter); //mounts entriesRouter so that any route defined as "/" inside the router is reachable at "/api/entries"

// Seed sample cards on first run
async function seedIfEmpty() {
  const count = await Entry.countDocuments();
  if (count > 0) return;

  await Entry.insertMany([
    {
      date: new Date(),
      squat: 185,
      bench: 135,
      clean: 145,
      vertical: 40,
      bodyweight: 168,
      note: "Example 1",
    },
    {
      date: new Date(Date.now() - 86400000),
      squat: 275,
      bench: 190,
      clean: 165,
      vertical: 27,
      bodyweight: 169,
      note: "Example 2",
    },
    {
      date: new Date(Date.now() - 2 * 86400000),
      squat: 265,
      bench: 185,
      clean: 145,
      vertical: 25,
      bodyweight: 167,
    },
  ]);

  console.log(" Example 3");
}

//now its time to connnect to MongoDB and start server
mongoose
  .connect(ATLAS_URI)
  .then(async () => {
    console.log("MongoDB Atlas connected");
    await seedIfEmpty();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
