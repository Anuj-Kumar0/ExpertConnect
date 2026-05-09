import express from "express";

import {
  createBooking,
  getBookingsByEmail,
  updateBookingStatus,
  getBookedSlots
} from "../controllers/bookingController.js";

const router = express.Router();

router.patch("/:id/status", updateBookingStatus);

router.post("/", createBooking);

router.get("/", getBookingsByEmail);

router.get("/expert/:expertId", getBookedSlots);

export default router;