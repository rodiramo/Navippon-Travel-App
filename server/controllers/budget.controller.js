import Budget from "../models/Budget.js";

export const getBudget = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(200).json(budgets);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};