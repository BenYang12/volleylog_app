const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

function request(path, options = {}) {
  return fetch(`${BASE_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
}

export const api = {
  get: (p) => request(p, { method: "GET" }),
  post: (p, body) => request(p, { method: "POST", body: JSON.stringify(body) }),
  put: (p, body) => request(p, { method: "PUT", body: JSON.stringify(body) }),
  del: (p) => request(p, { method: "DELETE" }),
};
