
import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  abbreviation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  }
});

const Budget = mongoose.model("Budget", BudgetSchema);
export default Budget;