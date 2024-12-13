import Review from "../models/Review.js";
import Experience from "../models/Experience.js";

const createReview = async (req, res, next) => {
  try {
    const { rating, title, desc, experienceId } = req.body;

    console.log("Incoming Review Data:", req.body); // Log the incoming data

    // Validate title
    if (!title || typeof title !== "string") {
      return res.status(400).json({
        message: "Title is required and must be a string for new reviews.",
      });
    }

    // Validate rating
    if (typeof rating !== "number") {
      return res.status(400).json({
        message: "Rating is required and must be a number for new reviews.",
      });
    }

    // Validate description
    if (!desc || typeof desc !== "string") {
      return res.status(400).json({
        message: "Description is required and must be a string.",
      });
    }

    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({
        message: `Experience with ID ${experienceId} not found.`,
      });
    }

    // Create and save the review
    const newReview = new Review({
      user: req.user._id,
      rating: rating,
      title: title,
      desc,
      experience: experience._id,
    });

    const savedReview = await newReview.save();

    // Update the experience with the new review ID
    experience.reviews.push(savedReview._id);
    await experience.save();

    return res.status(201).json(savedReview); // Send the created review back
  } catch (error) {
    console.error("Error creating review:", error.message);
    return next(error); // Pass error to the global error handler
  }
};

export const updateReview = async (req, res) => {
  const { rating, title, desc, reviewId } = req.body;
  if (!reviewId) {
    console.log("Review ID is required");
  }

  console.log("Incoming Review Data:", req.body);
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { rating, title, desc },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const { reviewId } = req.body; // Extract reviewId from request body

    if (!reviewId) {
      const error = new Error("Review ID is required.");
      return next(error);
    }

    const review = await Review.findOneAndDelete({ _id: reviewId });

    if (!review) {
      const error = new Error("Comentario no encontrado");
      return next(error);
    }

    return res.json({
      message: "El comentario ha sido eliminado",
    });
  } catch (error) {
    next(error);
  }
};

const getAllReviews = async (req, res, next) => {
  try {
    const filter = req.query.searchKeyword;
    let where = {};
    if (filter) {
      where.desc = { $regex: filter, $options: "i" };
    }
    let query = Review.find(where);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await Review.find(where).countDocuments();
    const pages = Math.ceil(total / pageSize);

    res.header({
      "x-filter": filter,
      "x-totalcount": JSON.stringify(total),
      "x-currentpage": JSON.stringify(page),
      "x-pagesize": JSON.stringify(pageSize),
      "x-totalpagecount": JSON.stringify(pages),
    });

    if (page > pages) {
      return res.json([]);
    }

    const result = await query
      .skip(skip)
      .limit(pageSize)
      .populate([
        {
          path: "user",
          select: ["avatar", "name", "verified"],
        },

        {
          path: "experience",
          select: ["slug", "title"],
        },
      ])
      .sort({ updatedAt: "desc" });

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

export { createReview, deleteReview, getAllReviews };
