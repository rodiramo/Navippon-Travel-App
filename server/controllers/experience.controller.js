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

    await newExperience.save();

    const experiences = await Experience.find()
      .populate("prefecture")
      .populate("reviews")
      .populate("region")
      .populate("budget")
      .sort({ createdAt: -1 });

    res.status(201).json({ experiences });
  } catch (err) {
    console.error("Error creating experience:", err);
    res.status(409).json({ message: err.message });
  }
};

export const getExperiences = async (req, res) => {
  try {
    // Extract query parameters for filtering, sorting, and pagination
    const {
      minPrice,
      maxPrice,
      categories,
      subcategory,
      hotelType,
      restaurantService,
      region,
      prefecture,
      city,
      page = 1, // Default pagination page
      limit = 10, // Default limit per page
      sortBy = "createdAt", // Default sorting field
      order = "desc", // Default sorting order
    } = req.query;

    // Build the dynamic query object
    const query = {};

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Categories filter (array of categories)
    if (categories) {
      query.categories = { $in: categories.split(",") };
    }

    // Subcategory filter
    if (subcategory) {
      query.subcategory = subcategory;
    }

    // Hotel type filter
    if (hotelType) {
      query.hotelType = hotelType;
    }

    // Restaurant service filter
    if (restaurantService) {
      query.restaurantService = { $all: restaurantService.split(",") };
    }

    // Region, prefecture, and city filters
    if (region) query.region = region;
    if (prefecture) query.prefecture = prefecture;
    if (city) query.city = city;

    // Pagination and sorting
    const skip = (page - 1) * limit; // Calculate skip value for pagination
    const sortOrder = order === "asc" ? 1 : -1; // Determine sorting order

    // Fetch filtered experiences with population and sorting
    const experiences = await Experience.find(query)
      .populate("prefecture", "name")
      .populate("region", "name")
      .populate("budget", "name")
      .populate("reviews")
      .sort({ [sortBy]: sortOrder })
      .skip(skip) // Pagination: Skip documents
      .limit(Number(limit)); // Pagination: Limit documents per page

    // Get total count for pagination metadata
    const total = await Experience.countDocuments(query);

    // Respond with the data and metadata
    res.status(200).json({
      experiences,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const searchExperiences = async (req, res) => {
  try {
    // Log the incoming request query parameters
    console.log("Received search params:", req.query); // This should log the query params from the URL

    const { region, prefecture, budget, query } = req.query;
    const filter = {};

    if (region) filter.region = region;
    if (prefecture) filter.prefecture = prefecture;
    if (budget) filter.budget = budget;
    if (query) {
      const regex = new RegExp(query, "i");
      filter.$or = [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
      ];
    }

    console.log("Constructed filter:", filter);

    // Fetch experiences using the filter
    const experiences = await Experience.find(filter)
      .populate("prefecture")
      .populate("region")
      .populate("reviews")
      .populate("budget");

    if (experiences.length === 0) {
      console.log("No experiences found with the given filter.");
    }

    res.json(experiences);
  } catch (error) {
    console.error("Error searching experiences:", error);
    return res.status(500).json({ message: "Server error" });
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
      .populate("region")
      .populate("reviews")
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

    const experience = await Experience.findById(id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

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
        coordinates: location?.coordinates || experience.location.coordinates,
      },
      availability: {
        all_year: availability?.all_year || experience.availability.all_year,
        best_season:
          availability?.best_season || experience.availability.best_season,
      },
      price,
      range_price: {
        min: range_price?.min || experience.range_price.min,
        max: range_price?.max || experience.range_price.max,
      },
      categories: Array.isArray(categories)
        ? categories
        : JSON.parse(categories),
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

    if (req.file) {
      if (experience.image) {
        const oldImagePath = path.join("public/assets", experience.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updatedData.image = req.file.filename;
    } else {
      updatedData.image = experience.image;
    }

    const updatedExperience = await Experience.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    )
      .populate("prefecture")
      .populate("region")
      .populate("reviews")
      .populate("budget");

    if (!updatedExperience) {
      return res
        .status(404)
        .json({ message: "Experience could not be updated" });
    }

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
      .populate("region")
      .populate("reviews")
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
      .populate("region")
      .populate("reviews")
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
      .populate("region")
      .populate("reviews")
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
      .populate("prefecture")
      .populate("reviews")
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
