import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    expertId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expert",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      required: true,
    },

    slot: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index(
  {
    expertId: 1,
    date: 1,
    slot: 1,
  },
  {
    unique: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;