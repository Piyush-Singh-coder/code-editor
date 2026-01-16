import axios from "axios";

// Create an axios instance with default config
export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000/api"
      : "/api",
  withCredentials: true, // Send cookies with requests
});
