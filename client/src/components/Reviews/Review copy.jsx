import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FiMessageSquare, FiEdit2, FiTrash } from "react-icons/fi";
import ReviewForm from "./ReviewForm";
import { Avatar } from "@mui/material";
import config from "@config/config.js";
import StarIcon from "@mui/icons-material/Star";

import { useSelector } from "react-redux";

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
  const [showReplies, setShowReplies] = useState(false);
  // Correct filtering of replies where the reply parent matches the current review's _id
  const filteredReplies = replies.filter(
    (reply) => reply.parent === review._id
  );

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.token);

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
  }, [user, token]);

  if (!userData) {
    return <div>User data not found</div>;
  }

  const reviewBelongsToUser = userData._id === loggedInUserId;
  const isReplying =
    affectedReview &&
    affectedReview.type === "replying" &&
    affectedReview._id === review._id;
  const isEditing =
    affectedReview &&
    affectedReview.type === "editing" &&
    affectedReview._id === review._id;

  const repliedReviewId = review._id;
  const replyOnUserId = userData._id;

  return (
    <div
      className="flex flex-nowrap items-start gap-x-3 p-3 rounded-lg"
      id={`review-${review._id}`}
    >
      <div className="flex-1 flex flex-col">
        <h5 className="font-bold text-dark-hard text-xs lg:text-sm">
          {userData.firstName} {userData.lastName}
        </h5>
        <Avatar
          src={
            userData.picturePath
              ? `${config.API_URL}/assets/${userData.picturePath}`
              : "/assets/default-avatar.png"
          }
        />
        <span className="text-xs text-dark-light">
          {new Date(review.createdAt).toLocaleDateString("es-AR", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>

        {!isEditing && (
          <div>
            <p className="font-opensans mt-[10px] text-dark-light">
              {review.title}
            </p>
            <div className="font-opensans mt-[10px] text-dark-light flex items-center">
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index}>
                  {index < Math.floor(review.rating) ? (
                    <StarIcon style={{ color: "blue" }} fontSize="inherit" />
                  ) : index < review.rating ? (
                    <StarIcon style={{ color: "blue" }} fontSize="inherit" />
                  ) : (
                    <StarIcon style={{ color: "grey" }} fontSize="inherit" />
                  )}
                </span>
              ))}
            </div>

            <p className="font-opensans mt-[10px] text-dark-light">
              {review.desc}
            </p>
          </div>
        )}

        {isEditing && (
          <ReviewForm
            btnLabel="Update"
            formSubmitHanlder={(value) => updateReview(value, review._id)}
            formCancelHandler={() => setAffectedReview(null)}
            initialText={review.desc}
          />
        )}

        <div className="flex items-center gap-x-3 text-dark-light text-sm mt-3 mb-3">
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
          <button
            className="flex items-center space-x-2"
            onClick={() => setShowReplies((prev) => !prev)} // Toggle replies
          >
            <FiMessageSquare className="w-4 h-auto" />
            <span>{showReplies ? "Hide Replies" : "Show Replies"}</span>
          </button>
        </div>

        {isReplying && (
          <ReviewForm
            btnLabel="Reply"
            formSubmitHandler={(desc) =>
              addReview({
                desc,
                parent: repliedReviewId,
                replyOnUser: replyOnUserId,
                isReply: true,
              })
            }
            formCancelHandler={() => setAffectedReview(null)}
            isReply={true}
          />
        )}

        {showReplies && (
          <div className="pl-4 border-l-2 border-gray-300">
            {filteredReplies.length > 0 ? (
              filteredReplies.map((reply) => (
                <div key={reply._id} className="ml-4 mt-2">
                  <h5 className="font-bold text-dark-hard text-xs lg:text-sm">
                    {userData.firstName} {userData.lastName}
                  </h5>
                  <Avatar
                    src={
                      userData.picturePath
                        ? `${config.API_URL}/assets/${userData.picturePath}`
                        : "/assets/default-avatar.png"
                    }
                  />
                  <p>{reply.desc}</p>
                  <span className="text-xs text-dark-light">
                    {new Date(reply.createdAt).toLocaleDateString("es-AR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                    })}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-dark-light">No replies yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

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
