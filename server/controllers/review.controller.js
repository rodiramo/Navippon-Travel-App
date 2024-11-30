import Review from "../models/Review.js";
import Experience from "../models/Experience.js";

const createReview = async (req, res, next) => {
  try {
    const { desc, title, rating, experienceId, parent, replyOnUser } = req.body;

    console.log("Incoming Review Data:", req.body);

    // Ensure that the incoming data is valid
    if (typeof title !== "string") {
      throw new Error("Invalid title format: expected a string.");
    }
    if (typeof rating !== "number") {
      throw new Error("Invalid rating format: expected a number.");
    }
    if (typeof desc !== "string") {
      throw new Error("Invalid description format: expected a string.");
    }

    const experience = await Experience.findById(experienceId);

    if (!experience) {
      const error = new Error(`Experience with _id ${experienceId} not found`);
      return next(error);
    }

    // Create and save the new review
    const newReview = new Review({
      user: req.user._id,
      title, // Ensure this is a string
      rating, // Ensure this is a number
      desc, // Ensure this is a string
      experience: experience._id,
      parent,
      replyOnUser,
    });

    const savedReview = await newReview.save();

    // Update the experience with the new review
    experience.reviews.push(savedReview._id);
    await experience.save();

    return res.json(savedReview); // Respond with the saved review
  } catch (error) {
    console.error("Error creating review:", error);
    return next(error); // Forward error to error handler middleware
  }
};

const updateReview = async (req, res, next) => {
  try {
    const { desc, check, title, rating } = req.body;

    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      const error = new Error("Comentario no encontrado");
      return next(error);
    }

    review.desc = desc || review.desc;
    review.title = title || review.title;
    review.check = typeof check !== "undefined" ? check : review.check;

    if (typeof rating !== "undefined") {
      if (rating >= 0 && rating <= 5) {
        review.rating = rating;
      } else {
        const error = new Error("La calificación debe estar entre 0 y 5");
        return next(error);
      }
    }
    const updatedReview = await review.save();
    return res.json(updatedReview);
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.reviewId);

    if (!review) {
      const error = new Error("Comentario no encontrado");
      return next(error);
    }

    await Review.deleteMany({ parent: review._id });

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
          path: "parent",
          populate: [
            {
              path: "user",
              select: ["avatar", "name"],
            },
          ],
        },
        {
          path: "replyOnUser",
          select: ["avatar", "name"],
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

export { createReview, updateReview, deleteReview, getAllReviews };
