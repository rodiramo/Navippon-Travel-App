import { useState } from "react";
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

const ReviewsContainer = ({ className, loggedInUserId, reviews = [] }) => {
  const queryClient = useQueryClient();
  const { id: experienceId } = useParams();
  console.log("Experience _id from URL:", experienceId);

  const token = useSelector((state) => state.token);
  const [affectedReview, setAffectedReview] = useState(null);

  const addReviewHandler = ({
    title,
    rating,
    desc,
    parent = null,
    replyOnUser = null,
  }) => {
    if (!token) {
      toast.error("No JWT token found.");
      return;
    }

    mutateNewReview({
      title: title,
      rating: rating,
      desc: desc,
      parent,
      replyOnUser,
      token,
      experienceId,
    });
    setAffectedReview(null);
  };

  const updateReviewHandler = (desc, title, rating, reviewId) => {
    if (!token) {
      toast.error("No JWT token found.");
      return;
    }

    mutateUpdateReview({
      token,
      title: title,
      rating: rating,
      desc: desc,
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
      mutationFn: ({
        token,
        desc,
        title,
        rating,
        experienceId,
        parent,
        replyOnUser,
      }) => {
        return createNewReview({
          token,
          title: title,
          rating,
          desc,
          experienceId,
          parent,
          replyOnUser,
        });
      },
      onSuccess: () => {
        toast.success(
          "Tu reseña se ha enviado con éxito, será visible tras la confirmación del Administrador"
        );
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

  return (
    <div className={`${className}`}>
      {/* Review Form */}
      <ReviewForm
        btnLabel="Enviar"
        formSubmitHandler={(title, rating, desc) =>
          addReviewHandler(title, rating, desc)
        }
        loading={isLoadingNewReview}
      />

      {/* Reviews List */}
      <div className="space-y-4 mt-8">
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((review) => {
            console.log("Review Object: ", review); // Log the review object

            return (
              <Review
                key={review._id}
                review={review}
                user={review.user}
                loggedInUserId={loggedInUserId} // Ensure logged-in user ID is passed
                affectedReview={affectedReview} // Manage state for editing/replying
                setAffectedReview={setAffectedReview} // Method to update affected review state
                addReview={addReviewHandler} // Method to handle adding reviews
                updateReview={updateReviewHandler} // Method to handle updating reviews
                deleteReview={deleteReviewHandler} // Method to handle deleting reviews
                replies={review.replies} // Handle replies if any
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

// Prop Types validation
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
      replies: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          user: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            userPicturePath: PropTypes.string.isRequired,
            firstName: PropTypes.string.isRequired,
          }).isRequired,
          createdAt: PropTypes.string.isRequired,
          desc: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ),
};

export default ReviewsContainer;
