import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import metricsRoutes from "./routes/metrics.js";

import cors from "cors";

dotenv.config(); // load .env -> process.env

const app = express();
app.use(express.json()); // parse JSON bodies

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true, // send/receive cookies
  }),
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "devsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    },
  }),
);

// Route modules
app.use("/api/auth", authRoutes);
app.use("/api/metrics", metricsRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
