import mongoose from "mongoose";

const PrefectureSchema = new mongoose.Schema({
  prefectureName: {
    type: String,
    unique: true,
  },
  cities: {
  },
  image: {
    type: String,
    required: true,
  },
});

const Prefecture = mongoose.model("Prefecture", PrefectureSchema);

export default Prefecture;
