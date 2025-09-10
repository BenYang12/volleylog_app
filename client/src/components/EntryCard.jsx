import { useState } from "react";

export default function EntryCard({ entry, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    date: entry.date ? new Date(entry.date).toISOString().slice(0, 10) : "",
    squat: entry.squat,
    bench: entry.bench,
    clean: entry.clean,
    vertical: entry.vertical,
    bodyweight: entry.bodyweight,
    note: entry.note || "",
  });
  const d = entry.date ? new Date(entry.date) : null;
  const dateStr = d && !isNaN(d) ? d.toLocaleDateString() : "";

  function handleChange(e) {
    const { name, value } = e.target;
    const numeric = [
      "squat",
      "bench",
      "clean",
      "vertical",
      "bodyweight",
    ].includes(name);
    setForm((f) => ({
      ...f,
      [name]: numeric ? (value === "" ? "" : Number(value)) : value,
    }));
  }

  async function handleSave() {
    await onEdit(entry._id, {
      ...form,
      date: form.date ? new Date(form.date) : undefined,
    });
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className="card">
        <h3>Edit Entry</h3>
        <div className="row" style={{ gap: "0.5rem", flexWrap: "wrap" }}>
          <label style={{ minWidth: 80 }}>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>
        <div className="row" style={{ gap: "0.5rem", flexWrap: "wrap" }}>
          <label style={{ minWidth: 80 }}>Squat</label>
          <input
            type="number"
            name="squat"
            value={form.squat}
            onChange={handleChange}
          />
          <label style={{ minWidth: 80 }}>Bench</label>
          <input
            type="number"
            name="bench"
            value={form.bench}
            onChange={handleChange}
          />
        </div>
        <div className="row" style={{ gap: "0.5rem", flexWrap: "wrap" }}>
          <label style={{ minWidth: 80 }}>Clean</label>
          <input
            type="number"
            name="clean"
            value={form.clean}
            onChange={handleChange}
          />
          <label style={{ minWidth: 80 }}>Vertical</label>
          <input
            type="number"
            name="vertical"
            value={form.vertical}
            onChange={handleChange}
          />
        </div>
        <div className="row" style={{ gap: "0.5rem", flexWrap: "wrap" }}>
          <label style={{ minWidth: 80 }}>Bodywt</label>
          <input
            type="number"
            name="bodyweight"
            value={form.bodyweight}
            onChange={handleChange}
          />
        </div>
        <div className="row" style={{ width: "100%" }}>
          <textarea
            name="note"
            rows="2"
            style={{ width: "100%" }}
            placeholder="Optional note"
            value={form.note}
            onChange={handleChange}
          />
        </div>
        <div className="row" style={{ gap: ".5rem", marginTop: ".5rem" }}>
          <button className="btn" onClick={handleSave}>
            Save
          </button>
          <button className="delete" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Training Log</h3>
      <div className="row">
        <span className="badge">Date</span> <span>{dateStr}</span>
      </div>
      <div className="row">
        <span className="badge">Squat</span> <span>{entry.squat} lb</span>
      </div>
      <div className="row">
        <span className="badge">Bench</span> <span>{entry.bench} lb</span>
      </div>
      <div className="row">
        <span className="badge">Hang Clean</span> <span>{entry.clean} lb</span>
      </div>
      <div className="row">
        <span className="badge">Vertical</span> <span>{entry.vertical} in</span>
      </div>
      <div className="row">
        <span className="badge">Bodyweight</span>{" "}
        <span>{entry.bodyweight} lb</span>
      </div>
      {entry.note && (
        <div className="row">
          <small>“{entry.note}”</small>
        </div>
      )}
      <div className="row" style={{ gap: ".5rem", marginTop: ".75rem" }}>
        <button className="btn" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button className="delete" onClick={() => onDelete(entry._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
