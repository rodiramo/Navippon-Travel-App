import mongoose from "mongoose";

const RegionSchema = new mongoose.Schema({
  region: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

const Region = mongoose.model("Region", RegionSchema);

export default Region;
