//Route Handler file
//Define API endpoints for volleylog entries
//I'll import express here because it lets me create routes and handle HTTP requests
import express from "express";
import Entry from "../models/Entry.js";

//group related routes here, then export for use in server.js
//create mini Express app just for these routes
const router = express.Router();

//fetch all workout logs
//use "/" for root path of router, relative to where router is mounted in main server file
router.get("/", async (_req, res) => {
  try {
    const entries = await Entry.find().sort({ createdAt: -1 }); //sort by newest first
    res.json(entries); //if succesful, sends data back as JSON
  } catch (err) {
    console.log("Get /api/entries error:", err);
    res.status(500).send("Failed to fetch workout logs"); //500 refers to internal server error
  }
});

//Create a post
//router.post("/") listens for POST requests to /api/entries
//req.body will contain data sent by client
router.post("/", async (req, res) => {
  try {
    console.log("POST", req.body);
    const { squat, bench, clean, vertical, bodyweight, date, note } = req.body; //destructuring
    const required = [squat, bench, clean, vertical, bodyweight];
    const hasInvalidField = required.some(
      (v) => v === undefined || v === "" || Number.isNaN(Number(v)),
    );
    if (hasInvalidField) {
      return res.status(400).send("Missing/Invalid numeric fields");
    }
    //if everythign checks out, I will create a new document in MongoDB
    const entry = await Entry.create({
      squat: Number(squat),
      bench: Number(bench),
      clean: Number(clean),
      vertical: Number(vertical),
      bodyweight: Number(bodyweight),
      date: date ? new Date(date) : undefined,
      note,
    });
    res.status(201).json(entry); //used by server to indicate new resource succesfully created as result of client request
  } catch (error) {
    console.error("POST , error");
    res.status(400).send("Failed to create entry.");
  }
});

// Edit
//PUT request is used to create/completely replace a resource on a server at a known URL
//router.put("/:id") listens for PUT requests like /api/entries/123
router.put("/:id", async (req, res) => {
  try {
    console.log("PUT, req.body");
    const updates = {};
    const fields = [
      "squat",
      "bench",
      "clean",
      "vertical",
      "bodyweight",
      "date",
      "note",
    ];

    for (const f of fields) {
      if (req.body[f] !== undefined)
        updates[f] = f === "date" ? new Date(req.body[f]) : req.body[f];
    }

    // validate numeric fields if provided
    ["squat", "bench", "clean", "vertical", "bodyweight"].forEach((k) => {
      if (updates[k] !== undefined) {
        if (updates[k] === "" || Number.isNaN(Number(updates[k]))) {
          throw new Error(`Invalid value for ${k}`);
        }
        updates[k] = Number(updates[k]);
      }
    });

    const updated = await Entry.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).send("Entry not found.");
    res.json(updated);
  } catch (err) {
    console.error("PUT /api/entries error:", err.message || err);
    res.status(400).send("Failed to update entry.");
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Entry.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/entries error:", err);
    res.status(400).send("Failed to delete entry.");
  }
});

export default router;
