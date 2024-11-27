import PropTypes from "prop-types"; // Import PropTypes
import { FiMessageSquare, FiEdit2, FiTrash } from "react-icons/fi";
import ReviewForm from "./ReviewForm";
import useAuth from "@hooks/useAuth";

const Review = ({
  review,
  logginedUserId,
  affectedReview,
  setAffectedReview,
  addReview,
  parentId = null,
  updateReview,
  deleteReview,
  replies,
}) => {
  const { jwt } = useAuth();
  const isUserLoggined = Boolean(logginedUserId);
  const reviewBelongsToUser = logginedUserId === review.user._id;
  const isReplying =
    affectedReview &&
    affectedReview.type === "replying" &&
    affectedReview._id === review._id;
  const isEditing =
    affectedReview &&
    affectedReview.type === "editing" &&
    affectedReview._id === review._id;
  const repliedReviewId = parentId ? parentId : review._id;
  const replyOnUserId = review.user._id;

  return (
    <div
      className="flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] p-3 rounded-lg"
      id={`review-${review?._id}`}
    >
      <div className="flex-1 flex flex-col">
        <h5 className="font-bold text-dark-hard text-xs lg:text-sm">
          {review.user.name}
        </h5>
        <span className="text-xs text-dark-light">
          {new Date(review.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>
        {!isEditing && (
          <p className="font-opensans mt-[10px] text-dark-light">
            {review.desc}
          </p>
        )}
        {isEditing && (
          <ReviewForm
            btnLabel="Update"
            formSubmitHanlder={(value) => updateReview(value, review._id, jwt)}
            formCancelHandler={() => setAffectedReview(null)}
            initialText={review.desc}
          />
        )}
        <div className="flex items-center gap-x-3 text-dark-light text-sm mt-3 mb-3">
          {isUserLoggined && (
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
                onClick={() => deleteReview(review._id, jwt)}
              >
                <FiTrash className="w-4 h-auto" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
        {isReplying && (
          <ReviewForm
            btnLabel="Reply"
            formSubmitHanlder={(value) =>
              addReview(value, repliedReviewId, replyOnUserId, jwt)
            }
            formCancelHandler={() => setAffectedReview(null)}
          />
        )}
        {replies.length > 0 && (
          <div>
            {replies.map((reply) => (
              <Review
                key={reply._id}
                addReview={addReview}
                affectedReview={affectedReview}
                setAffectedReview={setAffectedReview}
                review={reply}
                deleteReview={deleteReview}
                logginedUserId={logginedUserId}
                replies={[]}
                updateReview={updateReview}
                parentId={review._id}
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
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
  logginedUserId: PropTypes.string,
  affectedReview: PropTypes.shape({
    type: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }),
  setAffectedReview: PropTypes.func.isRequired,
  addReview: PropTypes.func.isRequired,
  parentId: PropTypes.string,
  updateReview: PropTypes.func.isRequired,
  deleteReview: PropTypes.func.isRequired,
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
};

export default Review;
