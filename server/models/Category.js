import mongoose from "mongoose";

const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

const CategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true,
  },
  icon: {
    type: String,
    required: true,
  },
  subcategories: [SubcategorySchema],
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;
