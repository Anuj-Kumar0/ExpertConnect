import axios from "axios";

const api = axios.create({
  baseURL: "https://expertconnect-jsud.onrender.com/",
});

export default api;