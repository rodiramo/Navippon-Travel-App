import mongoose from "mongoose";
import Hotel from "../models/Hotel.js";
import Prefecture from "../models/Prefecture.js";
import fs from "fs";
import path from "path";

export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find()
      .populate("prefecture")
      .populate("budget")
      .sort({ createdAt: -1 });
    res.status(200).json(hotels);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findByIdAndDelete(id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
