import mongoose from "mongoose";

const PrefectureSchema = new mongoose.Schema({
 name: {
    type: String,
    unique: true,
  },
  cities: [String],
  image: {
    type: String,
    required: true,
  },
});

const Prefecture = mongoose.model("Prefecture", PrefectureSchema);

export default Prefecture;
