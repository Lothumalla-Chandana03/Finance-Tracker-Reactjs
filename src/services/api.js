const BASE_URL = "https://finance-tracker-backend-ng8p.onrender.com";

export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(BASE_URL + url, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
    