import { useState } from "react";
import {
  useTheme,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createNewReview,
  deleteReview,
  updateReview,
} from "@services/index/reviews";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import StarIcon from "@mui/icons-material/Star";

const ReviewsContainer = ({ className, loggedInUserId, reviews = [] }) => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const { id: experienceId } = useParams();
  const token = useSelector((state) => state.token);
  const [affectedReview, setAffectedReview] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [allReviews, setAllReviews] = useState(reviews);
  const [sortOption, setSortOption] = useState("date-reciente");

  // Sort reviews based on the selected option
  const sortReviews = (option, reviews) => {
    if (option === "fecha-reciente") {
      return reviews.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ); // Sort by newest date
    } else if (option === "fecha-antigua") {
      return reviews.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      ); // Sort by oldest date
    } else if (option === "best-rating") {
      return reviews.sort((a, b) => b.rating - a.rating);
    } else if (option === "worst-rating") {
      return reviews.sort((a, b) => a.rating - b.rating);
    }
    return reviews;
  };

  // Calculate average rating
  const validRatings = allReviews.filter((review) => review.rating != null);
  const averageRating =
    validRatings.length > 0
      ? validRatings.reduce((sum, review) => sum + review.rating, 0) /
        validRatings.length
      : 0;

  const addReviewHandler = ({ title, rating, desc }) => {
    if (!token) {
      toast.error("No JWT token found.");
      return;
    }

    mutateNewReview({
      title: title,
      rating: rating,
      desc: desc,
      token,
      experienceId,
    });

    setAffectedReview(null);
    setShowReviewForm(false);
  };

  const handleFormCancel = () => {
    console.log("Form canceled");
    setShowReviewForm(false);
  };
  const updateReviewHandler = (desc, title, rating, reviewId) => {
    if (!token) {
      toast.error("No JWT token found.");
      return;
    }
    if (!reviewId) {
      console.error("Review ID is missing");
      return;
    }
    console.log("Submitting review with ID:", reviewId); // Check if the review ID is correct

    console.log("Updating review with the following details:", {
      title,
      rating,
      desc,
      reviewId,
    });

    mutateUpdateReview({
      token,
      title: title,
      rating: rating,
      desc: desc,
      reviewId,
    });
    console.log("Mutate function data:", {
      token,
      title,
      rating,
      desc,
      reviewId,
    });

    setAffectedReview(null);
  };

  const deleteReviewHandler = (reviewId) => {
    if (!token) {
      toast.error("No JWT token found.");
      return;
    }

    mutateDeleteReview({ token, reviewId });
  };

  const { mutate: mutateNewReview, isLoading: isLoadingNewReview } =
    useMutation({
      mutationFn: ({ token, desc, title, rating, experienceId }) => {
        return createNewReview({
          token,
          title: title,
          rating,
          desc: desc,
          experienceId,
        });
      },
      onSuccess: (newReview) => {
        toast.success(
          "Tu reseña se ha enviado con éxito, será visible tras la confirmación del Administrador"
        );

        // Add the new review directly to the local state
        setAllReviews((prevReviews) => [newReview, ...prevReviews]);

        // Optionally invalidate query to update any related data in the background
        queryClient.invalidateQueries(["experience", experienceId]);
      },
      onError: (error) => {
        toast.error(error.message || "Error creating review");
        console.error("Error creating review:", error);
      },
    });

  const { mutate: mutateUpdateReview } = useMutation({
    mutationFn: ({ token, title, rating, desc, reviewId }) => {
      return updateReview({ token, title, rating, desc, reviewId });
    },
    onSuccess: () => {
      toast.success("Tu reseña se ha actualizado correctamente");
      queryClient.invalidateQueries(["experience", experienceId]);
    },
    onError: (error) => {
      toast.error(error.message || "Error updating review");
      console.error("Error updating review:", error);
    },
  });

  const { mutate: mutateDeleteReview } = useMutation({
    mutationFn: ({ token, reviewId }) => {
      return deleteReview({ token, reviewId });
    },
    onSuccess: () => {
      toast.success("Tu reseña se borró correctamente");
      queryClient.invalidateQueries(["experience", experienceId]);
    },
    onError: (error) => {
      toast.error(error.message || "Error deleting review");
      console.error("Error deleting review:", error);
    },
  });

  // Sort the reviews based on the selected sort option
  const sortedReviews = sortReviews(sortOption, [...allReviews]);

  return (
    <div className={`${className}`}>
      {/* Average Rating */}

      {/* Header with Button and Sorting Dropdown */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h2">Todas las reseñas</Typography>

        <button
          className="py-2 px-4"
          style={{
            background: theme.palette.primary.main,
            color: theme.palette.primary.white,
            borderRadius: "30rem",
          }}
          onClick={() => setShowReviewForm(!showReviewForm)}
        >
          {showReviewForm ? "Cancelar" : "Escribir Reseña"}
        </button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <ReviewForm
          btnLabel="Enviar"
          formSubmitHandler={(title, rating, desc) =>
            addReviewHandler({ title, rating, desc })
          }
          reviewId={affectedReview ? affectedReview._id : null}
          loading={isLoadingNewReview}
        />
      )}

      <div
        style={{
          display: "flex",
          alignContent: "flex-end",
          justifyContent: "space-between",
          margin: "2rem 0rem",
        }}
      >
        <div>
          <Typography
            variant="p"
            gutterBottom
            style={{
              color: theme.palette.secondary.main,
            }}
          >
            Promedio de Calificación
          </Typography>
          <div
            style={{
              color: theme.palette.primary.main,
            }}
          >
            <Typography variant="h2">{averageRating.toFixed(1)} / 5</Typography>{" "}
            <StarIcon rating={averageRating} size={30} /> {/* Display stars */}
          </div>
        </div>
        <FormControl>
          <InputLabel>Ordenar por</InputLabel>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            label="Ordenar por"
            style={{
              minWidth: 160,
              borderRadius: "30rem",
              backgroundColor: theme.palette.primary.white,
            }}
          >
            <MenuItem value="fecha-reciente">Fecha Reciente</MenuItem>
            <MenuItem value="fecha-antigua">Fecha más Antigua</MenuItem>
            <MenuItem value="best-rating">Mejores Calificaciones</MenuItem>
            <MenuItem value="worst-rating">Peores Calificaciones</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Reviews List */}
      <div
        className="space-y-4 mt-8"
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {Array.isArray(sortedReviews) && sortedReviews.length > 0 ? (
          sortedReviews.map((review) => {
            return (
              <Review
                key={review._id}
                reviewId={review._id}
                review={review}
                user={review.user}
                loggedInUserId={loggedInUserId}
                affectedReview={affectedReview}
                setAffectedReview={setAffectedReview}
                addReview={addReviewHandler}
                updateReview={updateReviewHandler}
                formCancelHandler={handleFormCancel}
                deleteReview={deleteReviewHandler}
              />
            );
          })
        ) : (
          <p>No reviews available</p>
        )}
      </div>
    </div>
  );
};

ReviewsContainer.propTypes = {
  className: PropTypes.string,
  loggedInUserId: PropTypes.string,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        PicturePath: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
      }).isRequired,
      createdAt: PropTypes.string.isRequired,
      title: PropTypes.string,
      desc: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })
  ),
};

export default ReviewsContainer;
