import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3004",
  headers: {
    "Content-Type": "application/json",
  },
});
