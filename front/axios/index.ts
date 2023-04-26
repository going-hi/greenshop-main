import axios from "axios";
import { parseCookies } from "nookies";

axios.defaults.baseURL = "http://localhost:3100";

axios.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const { _accessToken } = parseCookies();

    config.headers.Authorization = "Bearer " + _accessToken;
  }

  return config;
});

export default axios;
