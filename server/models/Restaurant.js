import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  prefecture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Prefecture",
    required: true,
  },
  coverPath: {
    type: String,
    required: true,
  },
  budget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Budget",
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  city: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  range_price: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  opening_time: {
    type: String,
    required: true,
  },
  closing_time: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  availability: {
    all_year: {
      type: Boolean,
      default: true,
    },
    best_season: {
      type: [String],
      default: [],
    },
  },
  images: {
    type: [String],
    default: [],
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  icon: {
    type: String,
    default: "restaurant.png",
  },
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
export default Restaurant;
