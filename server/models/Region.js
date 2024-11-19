import mongoose from "mongoose";

const RegionSchema = new mongoose.Schema({
  region: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: false  
  },
});

const Region = mongoose.model("Region", RegionSchema);

export default Region;
