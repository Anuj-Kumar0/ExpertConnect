import { io } from "socket.io-client";

const socket = io("https://expertconnect-jsud.onrender.com", {
  transports: ["websocket"],
});

export default socket;