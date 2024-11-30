import { useState } from "react";
import PropTypes from "prop-types";

const getStarValue = (index) => {
  return index + 1; // Adding 1 since stars are indexed from 0, but rating starts from 1
};

const ReviewForm = ({
  btnLabel,
  formSubmitHandler,
  formCancelHandler = null,
  initialText = "",
  initialTitle = "",
  initialRating = 0,
  loading = false,
}) => {
  const [desc, setDesc] = useState(initialText);
  const [title, setName] = useState(initialTitle); // Using initialTitle
  const [rating, setRating] = useState(initialRating);

  const submitHandler = (e) => {
    e.preventDefault();
    formSubmitHandler({
      title: title,
      desc: desc,
      rating: rating,
    });

    setDesc("");
    setName("");
    setRating(0);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col items-end border border-primary rounded-lg p-4">
        {/* Title Input */}
        <input
          type="text"
          className="w-full focus:outline-none bg-transparent mb-2"
          placeholder="Deja un título de reseña..."
          value={title}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Description Input */}
        <textarea
          className="w-full focus:outline-none bg-transparent"
          rows="5"
          placeholder="Deja tu reseña aquí..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        {/* Star Rating */}
        <div className="flex items-center mt-3">
          {[...Array(5)].map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setRating(getStarValue(index))} // Set rating on star click
              className={`w-6 h-6 ${
                rating >= getStarValue(index)
                  ? "text-yellow-500"
                  : "text-gray-400"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse gap-y-2 items-center gap-x-2 pt-2 min-[420px]:flex-row">
          {formCancelHandler && (
            <button
              onClick={formCancelHandler}
              className="px-6 py-2.5 rounded-lg border border-[#FA5564] text-[#FA5564]"
            >
              Cancel
            </button>
          )}
          <button
            disabled={loading}
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {btnLabel}
          </button>
        </div>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  btnLabel: PropTypes.string.isRequired,
  formSubmitHandler: PropTypes.func.isRequired,
  formCancelHandler: PropTypes.func,
  initialText: PropTypes.string,
  initialTitle: PropTypes.string,
  initialRating: PropTypes.number,
  loading: PropTypes.bool,
};

ReviewForm.defaultProps = {
  formCancelHandler: null,
  initialText: "",
  initialTitle: "",
  initialRating: 0,
  loading: false,
};

export default ReviewForm;
