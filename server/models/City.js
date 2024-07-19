import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  population: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const City = mongoose.model("City", CitySchema);

export default City;
