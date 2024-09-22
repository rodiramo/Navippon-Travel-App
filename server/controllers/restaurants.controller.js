import mongoose from "mongoose";
import Restaurant from "../models/Restaurant.js";
import Prefecture from "../models/Prefecture.js";
import fs from "fs";
import path from "path";

export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find()
      .populate("prefecture")
      .populate("budget")
      .sort({ createdAt: -1 });
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findByIdAndDelete(id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
