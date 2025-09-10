//front end API helper module
//functions for "talking" to server

const BASE = ""; // use Vite proxy in dev

//get logs from server
//calls Get /api/entries route
export async function fetchEntries() {
  const res = await fetch(`${BASE}/api/entries`);
  if (!res.ok) throw new Error((await res.text()) || "Failed to fetch entries");
  return res.json();
}

//add workout entry
export async function createEntry(payload) {
  const res = await fetch(`${BASE}/api/entries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error((await res.text()) || "Failed to create entry");
  return res.json();
}

//update entry
export async function updateEntry(id, payload) {
  const res = await fetch(`${BASE}/api/entries/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error((await res.text()) || "Failed to update entry");
  return res.json();
}

//for deletion
export async function deleteEntry(id) {
  const res = await fetch(`${BASE}/api/entries/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error((await res.text()) || "Failed to delete entry");
  return res.json();
}
