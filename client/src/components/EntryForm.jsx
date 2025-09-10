//import useState
import { useState } from "react";

const num = (n) => (n === "" ? "" : Number(n));

export default function EntryForm({ onAdd }) {
  const [form, setForm] = useState({
    //set initial value of form
    date: "",
    squat: "",
    bench: "",
    clean: "",
    vertical: "",
    bodyweight: "",
    note: "",
  });
  const [loading, setLoading] = useState(false); //intially set false

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

  //submit function
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        date: form.date ? new Date(form.date) : undefined,
        squat: num(form.squat),
        bench: num(form.bench),
        clean: num(form.clean),
        vertical: num(form.vertical),
        bodyweight: num(form.bodyweight),
      };
      await onAdd(payload);
      setForm({
        date: "",
        squat: "",
        bench: "",
        clean: "",
        vertical: "",
        bodyweight: "",
        note: "",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Add Entry</h3>
      <div className="fields">
        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Squat (lb)</label>
          <input
            type="number"
            name="squat"
            value={form.squat}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Bench (lb)</label>
          <input
            type="number"
            name="bench"
            value={form.bench}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Hang Clean (lb)</label>
          <input
            type="number"
            name="clean"
            value={form.clean}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Vertical (in)</label>
          <input
            type="number"
            name="vertical"
            value={form.vertical}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Bodyweight (lb)</label>
          <input
            type="number"
            name="bodyweight"
            value={form.bodyweight}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div style={{ marginTop: ".5rem" }}>
        <label>Note</label>
        <textarea
          name="note"
          rows="2"
          value={form.note}
          onChange={handleChange}
        />
      </div>
      <button className="btn" disabled={loading}>
        {loading ? "Saving..." : "Add Entry"}
      </button>
    </form>
  );
}
