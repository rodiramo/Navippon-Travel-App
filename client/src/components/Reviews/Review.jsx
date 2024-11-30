import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FiMessageSquare, FiEdit2, FiTrash } from "react-icons/fi";
import ReviewForm from "./ReviewForm";
import { Avatar } from "@mui/material";
import config from "@config/config.js";
import { useSelector } from "react-redux"; // Import useSelector

const Review = ({
  review,
  loggedInUserId,
  user,
  affectedReview,
  setAffectedReview,
  addReview,
  updateReview,
  deleteReview,
  replies = [],
}) => {
  const [userData, setUserData] = useState(null); // State for storing fetched user data
  const [loading, setLoading] = useState(true); // State to handle loading state

  // Retrieve the token from Redux store
  const token = useSelector((state) => state.token);
  console.log(userData);
  // Fetch user data based on userId when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch(`${config.API_URL}/users/${user}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user, token]); // Re-run the effect if the userId or token changes

  // If user data is not available, show an error or fallback UI
  if (!userData) {
    return <div>User data not found</div>;
  }

  const reviewBelongsToUser = userData._id === loggedInUserId; // Check if review belongs to logged-in user
  const isReplying =
    affectedReview &&
    affectedReview.type === "replying" &&
    affectedReview._id === review._id;
  const isEditing =
    affectedReview &&
    affectedReview.type === "editing" &&
    affectedReview._id === review._id;

  const repliedReviewId = review._id;
  const replyOnUserId = userData._id; // Replying to the user who posted the review

  return (
    <div
      className="flex flex-nowrap items-start gap-x-3  p-3 rounded-lg"
      id={`review-${review._id}`}
    >
      <div className="flex-1 flex flex-col">
        <h5 className="font-bold text-dark-hard text-xs lg:text-sm">
          {userData.firstName} {userData.lastName}{" "}
          {/* Access firstName and lastName from userData */}
        </h5>
        <Avatar
          src={
            userData.picturePath
              ? `${config.API_URL}/assets/${userData.picturePath}`
              : "/path/to/default-avatar.png"
          }
        />
        <span className="text-xs text-dark-light">
          {new Date(review.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>

        {/* Review description */}
        {!isEditing && (
          <div>
            <p className="font-opensans mt-[10px] text-dark-light">
              {review.title}
            </p>
            <p className="font-opensans mt-[10px] text-dark-light">
              {review.rating}
            </p>
            <p className="font-opensans mt-[10px] text-dark-light">
              {review.desc}
            </p>
          </div>
        )}

        {/* If editing, show the ReviewForm */}
        {isEditing && (
          <ReviewForm
            btnLabel="Update"
            formSubmitHanlder={(value) => updateReview(value, review._id)} // Pass token for authentication if needed
            formCancelHandler={() => setAffectedReview(null)}
            initialText={review.desc}
          />
        )}

        <div className="flex items-center gap-x-3 text-dark-light text-sm mt-3 mb-3">
          {/* If logged-in user, allow replying */}
          {loggedInUserId && (
            <button
              className="flex items-center space-x-2"
              onClick={() =>
                setAffectedReview({ type: "replying", _id: review._id })
              }
            >
              <FiMessageSquare className="w-4 h-auto" />
              <span>Reply</span>
            </button>
          )}

          {/* Show Edit and Delete if review belongs to logged-in user */}
          {reviewBelongsToUser && (
            <>
              <button
                className="flex items-center space-x-2"
                onClick={() =>
                  setAffectedReview({ type: "editing", _id: review._id })
                }
              >
                <FiEdit2 className="w-4 h-auto" />
                <span>Edit</span>
              </button>
              <button
                className="flex items-center space-x-2"
                onClick={() => deleteReview(review._id)}
              >
                <FiTrash className="w-4 h-auto" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>

        {/* If replying, show the ReviewForm */}
        {isReplying && (
          <ReviewForm
            btnLabel="Reply"
            formSubmitHanlder={(value) =>
              addReview(value, repliedReviewId, replyOnUserId)
            } // Pass token for authentication if needed
            formCancelHandler={() => setAffectedReview(null)}
          />
        )}

        {/* Render replies if any */}
        {replies.length > 0 && (
          <div>
            {replies.map((reply) => (
              <Review
                key={reply._id}
                review={reply}
                loggedInUserId={loggedInUserId}
                setAffectedReview={setAffectedReview}
                addReview={addReview}
                updateReview={updateReview}
                deleteReview={deleteReview}
                replies={[]} // Don't pass replies for nested reviews
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Prop Types validation
Review.propTypes = {
  review: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    rating: PropTypes.number,
    desc: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  loggedInUserId: PropTypes.string.isRequired,
  affectedReview: PropTypes.shape({
    type: PropTypes.string,
    _id: PropTypes.string,
  }),
  setAffectedReview: PropTypes.func.isRequired,
  addReview: PropTypes.func.isRequired,
  updateReview: PropTypes.func.isRequired,
  deleteReview: PropTypes.func.isRequired,
  replies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Review;
