import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import expertRoutes from "./routes/expertRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/experts", expertRoutes);
app.use("/api/bookings", bookingRoutes);

export default app;