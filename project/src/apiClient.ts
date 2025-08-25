import axios from "axios";

// Base URL can be overridden in production via VITE_API_BASE (e.g. https://your-backend.example.com)
const baseURL = import.meta.env.VITE_API_BASE || "";

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: { Accept: "application/json" },
});

export default api;
