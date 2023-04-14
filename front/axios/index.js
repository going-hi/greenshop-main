import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3100",
  timeout: 1000,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("accessToken");
  return config;
});
