import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createNewReview,
  deleteReview,
  updateReview,
} from "@services/index/reviews";
import { toast } from "react-hot-toast";
import useAuth from "@hooks/useAuth";

const ReviewsContainer = ({
  className,
  logginedUserId,
  reviews = [], // Default to an empty array in case reviews is undefined
  experienceSlug = "",
}) => {
  const queryClient = useQueryClient();
  const { jwt } = useAuth(); // Get JWT from useAuth hook
  const [affectedReview, setAffectedReview] = useState(null);

  // Add review handler
  const addReviewHandler = (value, parent = null, replyOnUser = null) => {
    if (!jwt) {
      toast.error("No JWT token found.");
      return;
    }

    mutateNewReview({
      desc: value,
      parent,
      replyOnUser,
      token: jwt,
      slug: experienceSlug,
    });
    setAffectedReview(null);
  };

  // Update review handler
  const updateReviewHandler = (value, reviewId) => {
    if (!jwt) {
      toast.error("No JWT token found.");
      return;
    }

    mutateUpdateReview({
      token: jwt,
      desc: value,
      reviewId,
    });
    setAffectedReview(null);
  };

  // Delete review handler
  const deleteReviewHandler = (reviewId) => {
    if (!jwt) {
      toast.error("No JWT token found.");
      return;
    }

    mutateDeleteReview({ token: jwt, reviewId });
  };

  // Mutations for adding, updating, and deleting reviews
  const {
    mutate: mutateNewReview,
    isLoading: isLoadingNewReview,
  } = useMutation({
    mutationFn: ({ token, desc, slug, parent, replyOnUser }) => {
      return createNewReview({ token, desc, slug, parent, replyOnUser });
    },
    onSuccess: () => {
      toast.success(
        "Tu reseña se ha enviado con éxito, será visible tras la confirmación del Administrador"
      );
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const { mutate: mutateUpdateReview } = useMutation({
    mutationFn: ({ token, desc, reviewId }) => {
      return updateReview({ token, desc, reviewId });
    },
    onSuccess: () => {
      toast.success("Tu reseña se ha actualizado correctamente");
      queryClient.invalidateQueries(["experience", experienceSlug]);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const { mutate: mutateDeleteReview } = useMutation({
    mutationFn: ({ token, reviewId }) => {
      return deleteReview({ token, reviewId });
    },
    onSuccess: () => {
      toast.success("Tu reseña se borró correctamente");
      queryClient.invalidateQueries(["experience", experienceSlug]);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return (
    <div className={`${className}`}>
      <ReviewForm
        btnLabel="Enviar"
        formSubmitHanlder={(value) => addReviewHandler(value)}
        loading={isLoadingNewReview}
      />
      <div className="space-y-4 mt-8">
        {/* Conditionally render reviews if it's an array and has content */}
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((review) => (
            <Review
              key={review._id}
              review={review}
              logginedUserId={logginedUserId}
              affectedReview={affectedReview}
              setAffectedReview={setAffectedReview}
              addReview={addReviewHandler}
              updateReview={updateReviewHandler}
              deleteReview={deleteReviewHandler}
              replies={review.replies}
            />
          ))
        ) : (
          <p>No reviews available.</p> // Message for when no reviews exist
        )}
      </div>
    </div>
  );
};

// Prop Types validation
ReviewsContainer.propTypes = {
  className: PropTypes.string, // className is optional and expected to be a string
  logginedUserId: PropTypes.string, // logginedUserId is optional and expected to be a string
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      createdAt: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      replies: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          user: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          }).isRequired,
          createdAt: PropTypes.string.isRequired,
          desc: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  experienceSlug: PropTypes.string.isRequired, // experienceSlug is required and should be a string
};

export default ReviewsContainer;
