import axios from "axios";

const api = axios.create({
  baseURL: "https://expertconnect-jsud.onrender.com/api",
});

export default api;