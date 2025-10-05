import { useEffect, useState } from "react";

// A blank “template” for the form state.

const empty = {
  date: "",
  squat_lbs: "",
  bench_lbs: "",
  shoulder_lbs: "",
  vertical_jump_lbs: "",
  plank_seconds: "",
};

export default function MetricForm({ initial = null, onSave, onCancel }) {
  // Local form state
  const [form, setForm] = useState(empty);

  // When `initial` changes, load those values into the form.
  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  //my handleupdate funciton
  // Helper to update a single field by key
  function update(k, v) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  //handlesubmit function
  function submit(e) {
    e.preventDefault(); //don't forget this
    onSave({
      ...form,
      squat_lbs: Number(form.squat_lbs),
      bench_lbs: Number(form.bench_lbs),
      shoulder_lbs: Number(form.shoulder_lbs),
      vertical_jump_lbs: Number(form.vertical_jump_lbs),
      plank_seconds: Number(form.plank_seconds),
    });
    if (!initial) setForm(empty);
  }

  return (
    <form className="form" onSubmit={submit}>
      <label>
        Date
        <input
          type="date"
          value={form.date}
          onChange={(e) => update("date", e.target.value)}
          required
        />
      </label>

      {/* Squat */}
      <label>
        Barbell Squat (lbs)
        <input
          value={form.squat_lbs}
          onChange={(e) => update("squat_lbs", e.target.value)}
          required
        />
      </label>

      <label>
        Barbell Bench Press (lbs)
        <input
          value={form.bench_lbs}
          onChange={(e) => update("bench_lbs", e.target.value)}
          required
        />
      </label>

      <label>
        Shoulder Press (lbs)
        <input
          value={form.shoulder_lbs}
          onChange={(e) => update("shoulder_lbs", e.target.value)}
          required
        />
      </label>

      <label>
        Vertical Jump (inches)
        <input
          value={form.vertical_jump_lbs}
          onChange={(e) => update("vertical_jump_lbs", e.target.value)}
          required
        />
      </label>

      <label>
        Plank (seconds)
        <input
          value={form.plank_seconds}
          onChange={(e) => update("plank_seconds", e.target.value)}
          required
        />
      </label>

      <div className="btn-row">
        <button type="submit" className="btn btn--primary">
          {initial ? "Update" : "Add Entry"}
        </button>

        {initial && (
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
