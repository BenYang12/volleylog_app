import { useCallback, useEffect, useState } from "react";
import MetricList from "../components/MetricList.jsx";
import { api } from "../services/api.js";
import MetricForm from "../components/MetricForm.jsx";

export default function Home() {
  const [editing, setEditing] = useState(null); //state
  const [items, setItems] = useState([]); //state

  const load = useCallback(() => {
    api
      .get("/metrics")
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function createEntry(data) {
    const res = await api.post("/metrics", data);
    if (res.ok) { load(); return true; }
    return false;
  }

  async function updateEntry(data) {
    const res = await api.put(`/metrics/${editing.id}`, data);
    if (res.ok) {
      setEditing(null);
      load();
      return true;
    }
    return false;
  }

  async function deleteEntry(id) {
    if (!confirm("Delete this entry?")) return;
    const res = await api.del(`/metrics/${id}`);
    if (res.ok) load();
  }

  return (
    <div className="container">
      <h2>Home</h2>

      <main className="grid-2">
        <section className="card">
          <MetricForm
            initial={editing}
            onSave={editing ? updateEntry : createEntry}
            onCancel={() => setEditing(null)}
          />
        </section>

        <section className="card">
          <MetricList
            items={items}
            onEdit={setEditing}
            onDelete={deleteEntry}
          />
        </section>
      </main>
    </div>
  );
}
