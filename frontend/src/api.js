import axios from "axios";

const api = axios.create({
  // Jika di Vercel (production), gunakan /api
  // Jika di lokal (development), gunakan http://127.0.0.1:8000
  baseURL: import.meta.env.PROD ? "/api" : "http://127.0.0.1:8000",
});

export default api;
