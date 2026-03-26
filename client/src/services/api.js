//fetch wrapper
//GET: Retrieves data from a server
//POST: Sends data to server to create a new resource/submit information
//PUT: Updates existing resource completely or creates on if it doesn't exist
//DELETE: Deletes a specified resource from the server
//PATCH: Applies partial modifications to a resource, updating only specific fields rather than replacing the entire resource.
//HEAD: Retrieves the headers of a resource, but not the body. This is useful for checking metadata without downloading the content.
//OPTIONS: Describes the communication options available for a target resource, such as which HTTP methods are supported.

//This file keeps all API calls consistent and follows DRY

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
//example final URL -> http://localhost:4000/api/metrics

//helper around fetch
function request(path, options = {}) {
  return fetch(`${BASE_URL}${path}`, {
    credentials: "include", //always include cookies: send cookies (session cookie) with every request
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
}

//mini API client
//ex. api.get(), api.post()
export const api = {
  get: (p) => request(p, { method: "GET" }),
  post: (p, body) => request(p, { method: "POST", body: JSON.stringify(body) }),
  put: (p, body) => request(p, { method: "PUT", body: JSON.stringify(body) }),
  del: (p) => request(p, { method: "DELETE" }),
};
