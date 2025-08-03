import axios from "axios";

const getBaseUrl = () => {
  if (typeof window === "undefined") return "https://api.ever-all.us/api";

  return window.location.hostname === "localhost"
    ? "http://192.168.0.39:9999/api"
    : "https://api.ever-all.us/api";
};

export const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
});
