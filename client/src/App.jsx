import { useEffect, useState } from "react";
import { fetchEntries, createEntry, deleteEntry, updateEntry } from "./api";
import EntryForm from "./components/EntryForm.jsx";
import EntryCard from "./components/EntryCard.jsx";
import "./index.css";

export default function App() {
  //I'll have to use state variables to deal with loading, entries and error
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  //load function
  async function load() {
    try {
      setLoading(true);
      setErr("");
      const data = await fetchEntries();
      setEntries(data);
    } catch (e) {
      setErr(e.message || "Failed to load.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);
  //add entry function
  async function addEntry(payload) {
    try {
      setErr("");
      await createEntry(payload);
      await load();
    } catch (error) {
      setErr(String(error.message || error));
    }
  }

  //remove function
  async function removeEntry(id) {
    try {
      setErr("");
      await deleteEntry(id);
      setEntries((prev) => prev.filter((e) => e._id !== id));
    } catch (error) {
      setErr(String(error.message || error));
    }
  }

  //edit function
  async function editEntry(id, payload) {
    try {
      setErr("");
      const updated = await updateEntry(id, payload);
      // optimistic update
      setEntries((prev) => prev.map((e) => (e._id === id ? updated : e)));
    } catch (e) {
      setErr(String(e.message || e));
    }
  }

  return (
    <div className="container">
      <h1>Volleylog 🏐</h1>
      <p className="footer">
        Log your squat, bench, hang clean, vertical jump, and bodyweight to
        track progress, set measurable goals, stay motivated, and prevent injury
        through data-driven training insights.
      </p>

      <EntryForm onAdd={addEntry} />
      {err && (
        <div className="card" style={{ borderColor: "#7f1d1d" }}>
          {err}
        </div>
      )}

      {loading ? (
        <div className="card">Loading...</div>
      ) : entries.length === 0 ? (
        <div className="card">No entries yet—add your first above!</div>
      ) : (
        <div className="grid">
          {entries.map((e) => (
            <EntryCard
              key={e._id}
              entry={e}
              onDelete={removeEntry}
              onEdit={editEntry}
            />
          ))}
        </div>
      )}
    </div>
  );
}
