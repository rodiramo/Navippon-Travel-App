import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  prefecture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Prefecture",
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mapEmbedUrl: String,
  locationDes: String,
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  phone: String,
  email: String,
  web: String,
  time: String,
  days: String,
  availability: {
    all_year: Boolean,
    best_season: [String],
  },
  price: Number,
  range_price: {
    min: Number,
    max: Number,
  },
  budget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Budget",
  },
  description: String,
  categories: {
    type: [String],
    required: true,
  },
  subcategory: {
    type: String,
    required: false,
  },
  hotelType: String,
  hotelService: [String],
  tripType: String,
  restaurantType: String,
  foodType: String,
  restaurantService: [String],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Experience = mongoose.model("Experience", ExperienceSchema);
export default Experience;
