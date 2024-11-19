import mongoose from "mongoose";
import Experience from "../models/Experience.js";
import Prefecture from "../models/Prefecture.js";
import Region from "../models/Region.js";
import fs from "fs";
import path from "path";

export const createExperience = async (req, res) => {
  try {
    const {
      name,
      description,
      prefecture,
      image,
      budget,
      contact,
      type,
      web,
      opening_time,
      closing_time,
      location,
      availability = { all_year: false, best_season: [] },
      price,
      range_price = { min: false, max: false },
      categories,
      subcategory,
      hotelType,
      hotelService,
      tripType,
      restaurantType,
      foodType,
      restaurantService,
      city,
      address,
      mapEmbedUrl,
      locationDes,
      phone,
      email,
      time,
      days,
    } = req.body;

    // Handle range_price parsing
    let parsedRangePrice = { min: false, max: false };
    if (range_price) {
      try {
        parsedRangePrice = JSON.parse(range_price);
      } catch (err) {
        console.error("Error parsing range_price:", err);
        return res.status(400).json({ message: "Invalid range_price format" });
      }
    }

    const existingExperience = await Experience.findOne({ name });
    if (existingExperience) {
      return res
        .status(409)
        .json({ message: "An experience with this name already exists." });
    }

    // Process the location
    let locationData = {};
    if (location && location.coordinates) {
      locationData = {
        type: "Point",
        coordinates: location.coordinates,
      };
    } else {
      locationData = {
        type: "Point",
        coordinates: null,
      };
    }

    const newExperience = new Experience({
      name,
      description,
      prefecture,
      type,
      image,
      budget,
      contact,
      web,
      opening_time,
      closing_time,
      location: locationData,
      availability: {
        all_year: availability.all_year || false,
        best_season: availability.best_season || [],
      },
      price,
      range_price: parsedRangePrice,
      categories: JSON.parse(categories),
      subcategory,
      hotelType,
      hotelService,
      tripType,
      restaurantType,
      foodType,
      restaurantService,
      city,
      address,
      mapEmbedUrl,
      locationDes,
      phone,
      email,
      time,
      days,
    });

    // Save the new experience to the database
    await newExperience.save();

    // Retrieve all experiences (optional)
    const experiences = await Experience.find()
      .populate("prefecture")
      .populate("budget")
      .sort({ createdAt: -1 });

    // Send a response back to the client
    res.status(201).json({ experiences });
  } catch (err) {
    console.error("Error creating experience:", err);
    res.status(409).json({ message: err.message });
  }
};

export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find()
      .populate("prefecture")
      .populate("budget")
      .sort({ createdAt: -1 });

    res.status(200).json(experiences);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getExperiencesSearch = async (req, res) => {
  try {
    const { query } = req.query;

    let filter = {};

    if (query) {
      filter.name = { $regex: query, $options: "i" };
    }

    const experiences = await Experience.find(filter)
      .populate("prefecture")
      .populate("budget");

    res.json(experiences);
  } catch (err) {
    console.error("Error fetching experiences:", err);
    res
      .status(500)
      .json({ message: "Server error while fetching experiences" });
  }
};

export const editExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      prefecture,
      type,
      image,
      budget,
      contact,
      web,
      opening_time,
      closing_time,
      location,
      availability,
      price,
      range_price,
      categories,
      subcategory,
      hotelType,
      hotelService,
      tripType,
      restaurantType,
      foodType,
      restaurantService,
      city,
      address,
      mapEmbedUrl,
      locationDes,
      phone,
      email,
      time,
      days,
    } = req.body;

    // Find the experience by ID
    const experience = await Experience.findById(id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    // Prepare the updated data
    const updatedData = {
      name,
      description,
      prefecture,
      budget,
      contact,
      type,
      web,
      opening_time,
      closing_time,
      location: {
        type: "Point",
        coordinates: location?.coordinates || experience.location.coordinates, // Use provided coordinates or the existing ones
      },
      availability: {
        all_year: availability?.all_year || experience.availability.all_year,
        best_season:
          availability?.best_season || experience.availability.best_season,
      },
      price,
      range_price: {
        min: range_price?.min || experience.range_price.min, // Update min price if provided
        max: range_price?.max || experience.range_price.max, // Update max price if provided
      },
      categories: Array.isArray(categories)
        ? categories
        : JSON.parse(categories), // Ensure categories is always an array
      subcategory,
      hotelType,
      hotelService,
      tripType,
      restaurantType,
      foodType,
      restaurantService,
      city,
      address,
      mapEmbedUrl,
      locationDes,
      phone,
      email,
      time,
      days,
    };

    // If there's a new image uploaded, handle replacing the old image
    if (req.file) {
      if (experience.image) {
        const oldImagePath = path.join("public/assets", experience.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Delete the old image from the server
        }
      }
      updatedData.image = req.file.filename; // Save the new image file name
    } else {
      updatedData.image = experience.image; // Keep the old image if none is uploaded
    }

    // Update the experience in the database
    const updatedExperience = await Experience.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    )
      .populate("prefecture")
      .populate("budget");

    if (!updatedExperience) {
      return res
        .status(404)
        .json({ message: "Experience could not be updated" });
    }

    // Return the updated experience
    res.status(200).json(updatedExperience);
  } catch (err) {
    console.error("Error updating experience:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findById(id)
      .populate("prefecture")
      .populate("budget");

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json(experience);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findByIdAndDelete(id);

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const filterCategory = async (req, res) => {
  try {
    const categoryName = req.params.categoryName;

    if (!categoryName) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const experiences = await Experience.find({ categories: categoryName })
      .populate("prefecture")
      .populate("budget");

    res.status(200).json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", details: error.message });
  }
};

export const filterPrefecture = async (req, res) => {
  const { prefectureId } = req.params;

  if (!prefectureId) {
    console.log("Missing prefecture ID in path");
    return res.status(400).json({ error: "Prefecture ID is required" });
  }

  try {
    const isPrefectureValid = await Prefecture.exists({ _id: prefectureId });
    if (!isPrefectureValid) {
      console.log("Prefecture not found:", prefectureId);
      return res.status(404).json({ error: "Prefecture not found" });
    }

    const experiences = await Experience.find({ prefecture: prefectureId })
      .populate("prefecture")
      .populate("budget");

    if (experiences.length === 0) {
      return res.status(204).json([]);
    }

    res.status(200).json(experiences);
  } catch (error) {
    console.error("Error object:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};


export const filterRegion = async (req, res) => {
  const { regionId } = req.params;

  if (!regionId) {
    console.log("Missing region ID in path");
    return res.status(400).json({ error: "Region ID is required" });
  }

  try {
    const isRegionValid = await Region.exists({ _id: regionId });
    if (!isRegionValid) {
      console.log("Region not found:", regionId);
      return res.status(404).json({ error: "Region not found" });
    }

    const experiences = await Experience.find({ region: regionId })
      .populate("region")
      .populate("budget");

    if (experiences.length === 0) {
      return res.status(204).json([]);
    }

    res.status(200).json(experiences);
  } catch (error) {
    console.error("Error object:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
