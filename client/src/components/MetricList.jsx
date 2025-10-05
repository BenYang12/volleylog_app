export default function MetricList({ items, onEdit, onDelete }) {
  // Empty state: show a reminder
  if (!items.length) return <p>No entries yet. Log your first one!</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Squat</th>
          <th>Bench</th>
          <th>Shoulder</th>
          <th>Vert</th>
          <th>Plank</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {items.map((row) => (
          <tr key={row.id}>
            <td>{row.date}</td>
            {/* Numeric metrics (lbs/seconds). Render directly. */}
            <td>{row.squat_lbs}</td>
            <td>{row.bench_lbs}</td>
            <td>{row.shoulder_lbs}</td>
            <td>{row.vertical_jump_lbs}</td>
            <td>{row.plank_seconds}</td>

            <td className="table__actions">
              <button className="btn" onClick={() => onEdit(row)}>
                Edit
              </button>

              {/* Delete by id. Parent handles confirm + API call. */}
              <button
                className="btn btn--danger"
                onClick={() => onDelete(row.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
