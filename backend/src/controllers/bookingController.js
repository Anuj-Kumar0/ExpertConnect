import Booking from "../models/Booking.js";
import Expert from "../models/Expert.js";
import { io } from "../server.js";

export const createBooking = async (req, res) => {
  try {
    const {
      expertId,
      name,
      email,
      phone,
      date,
      slot,
      notes,
    } = req.body;

    // Validation

    if (
      !expertId ||
      !name ||
      !email ||
      !phone ||
      !date ||
      !slot
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    // Check expert exists

    const expert = await Expert.findById(expertId);

    if (!expert) {
      return res.status(404).json({
        message: "Expert not found",
      });
    }

    // Check slot exists in expert availability

    const dateData = expert.availableSlots.find(
      (item) => item.date === date
    );

    if (!dateData || !dateData.slots.includes(slot)) {
      return res.status(400).json({
        message: "Invalid slot selected",
      });
    }

    // Create booking

    const booking = await Booking.create({
      expertId,
      name,
      email,
      phone,
      date,
      slot,
      notes,
    });

    // Emit real-time update

    io.emit("slotBooked", {
      expertId,
      date,
      slot,
    });

    res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    // Duplicate booking error

    if (error.code === 11000) {
      return res.status(400).json({
        message: "This slot is already booked",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getBookingsByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const bookings = await Booking.find({
      email,
    }).populate("expertId");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Completed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.status(200).json({
      message: "Booking status updated",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getBookedSlots = async (req, res) => {
  try {
    const { expertId } = req.params;

    const bookings = await Booking.find({
      expertId,
    });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};