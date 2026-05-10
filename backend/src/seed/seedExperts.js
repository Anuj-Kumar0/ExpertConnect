import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "../config/db.js";
import Expert from "../models/Expert.js";
import experts from "./experts.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await Expert.deleteMany();

    await Expert.insertMany(experts);

    console.log("Experts seeded successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData();