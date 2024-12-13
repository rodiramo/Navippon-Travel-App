import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FiMessageSquare, FiEdit2, FiTrash } from "react-icons/fi";
import ReviewForm from "./ReviewForm";
import { Avatar, useTheme } from "@mui/material";
import config from "@config/config.js";
import StarIcon from "@mui/icons-material/Star";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";

const Review = ({
  review,
  reviewId,
  loggedInUserId,
  user,
  affectedReview,
  setAffectedReview,
  updateReview,
  deleteReview,
}) => {
  console.log("Review ID from props:", reviewId);
  const theme = useTheme();
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

  // Log values for debugging purposes
  console.log("Logged In User ID: ", loggedInUserId);
  console.log("User Data: ", userData);

  const reviewBelongsToUser = userData._id === loggedInUserId;
  console.log("Review Belongs To User: ", reviewBelongsToUser);
  const isEditing =
    affectedReview &&
    affectedReview.type === "editing" &&
    affectedReview._id === reviewId;
  console.log("Review Id: ", reviewId);
  return (
    <div
      className="flex flex-nowrap items-start gap-x-3 p-1 rounded-lg"
      style={{
        width: "80%",
        flexDirection: "column",
      }}
      id={`review-${reviewId}`}
    >
      <div
        style={{
          width: "100%",
          background: theme.palette.primary.white,
          padding: "1rem",
          borderRadius: "1rem",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          className=" flex"
          style={{
            marginLeft: "2rem",
            alignItems: "start",
            flexDirection: "column",
            width: "25%",
          }}
        >
          <Avatar
            src={
              userData.picturePath
                ? `${config.API_URL}/assets/${userData.picturePath}`
                : "/assets/default-avatar.png"
            }
            sx={{ width: 60, height: 60 }}
          />

          <h5 className="font-bold text-dark-hard text-xs lg:text-sm ">
            @{userData.firstName}
            {userData.lastName}
          </h5>
        </div>

        <div style={{ width: "100%" }}>
          {!isEditing && (
            <div>
              <div className="font-opensans text-dark-light flex items-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index}>
                    {index < Math.floor(review.rating) ? (
                      <StarIcon
                        style={{ color: theme.palette.primary.main }}
                        fontSize="1.5rem"
                      />
                    ) : index < review.rating ? (
                      <StarIcon
                        style={{ color: theme.palette.primary.main }}
                        fontSize="inherit"
                      />
                    ) : (
                      <StarIcon style={{ color: "grey" }} fontSize="inherit" />
                    )}
                  </span>
                ))}
              </div>
              <p
                className="font-opensans"
                style={{
                  fontWeight: "bold",
                  marginTop: "10px",
                  fontStyle: "italic",
                }}
              >
                {review.title}
              </p>

              <p
                className="font-opensans "
                style={{
                  color: theme.palette.secondary.main,
                  fontStyle: "italic",
                  marginTop: "5px",
                }}
              >
                "{review.desc}"
              </p>
            </div>
          )}
          <span className="text-xs text-dark-light">
            {formatDistanceToNow(new Date(review.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>

        <div className="flex items-center gap-x-3 text-dark-light text-sm mt-3 mb-3">
          {reviewBelongsToUser && (
            <>
              <button
                className="flex items-center space-x-2"
                onClick={() =>
                  setAffectedReview({ type: "editing", _id: reviewId })
                }
              >
                <FiEdit2 className="w-4 h-auto" />
                <span>Edit</span>
              </button>
              <button
                className="flex items-center space-x-2"
                onClick={() => deleteReview(reviewId)}
              >
                <FiTrash className="w-4 h-auto" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
      </div>
      <div style={{ width: "100%" }}>
        {isEditing && (
          <ReviewForm
            btnLabel="Update"
            formSubmitHandler={(rating, title, desc) =>
              updateReview(rating, title, desc, reviewId)
            }
            formCancelHandler={() => setAffectedReview(null)}
            initialText={review.desc}
            initialTitle={review.title}
            initialRating={review.rating}
          />
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
};

export default Review;
