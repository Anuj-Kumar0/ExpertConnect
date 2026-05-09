import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },

  slots: [
    {
      type: String,
    },
  ],
});

const expertSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    bio: {
      type: String,
      required: true,
    },

    availableSlots: [slotSchema],
  },
  {
    timestamps: true,
  }
);

const Expert = mongoose.model("Expert", expertSchema);

export default Expert;