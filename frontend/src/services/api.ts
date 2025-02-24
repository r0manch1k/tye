import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.API_URL,
  timeout: 50000,
  responseType: "json",
  responseEncoding: "utf8",
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default api;
