import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const ReviewForm = ({
  btnLabel,
  formSubmitHanlder,
  formCancelHandler = null,
  initialText = "",
  loading = false,
}) => {
  const [value, setValue] = useState(initialText);

  const submitHandler = (e) => {
    e.preventDefault();
    formSubmitHanlder(value);
    setValue("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col items-end border border-primary rounded-lg p-4">
        <textarea
          className="w-full focus:outline-none bg-transparent"
          rows="5"
          placeholder="Deja tu comentario aquí..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
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

// Prop Types validation
ReviewForm.propTypes = {
  btnLabel: PropTypes.string.isRequired, // btnLabel is required and should be a string
  formSubmitHanlder: PropTypes.func.isRequired, // formSubmitHanlder is required and should be a function
  formCancelHandler: PropTypes.func, // formCancelHandler is optional and should be a function
  initialText: PropTypes.string, // initialText is optional and should be a string
  loading: PropTypes.bool, // loading is optional and should be a boolean
};

// Default props in case they are not passed
ReviewForm.defaultProps = {
  formCancelHandler: null,
  initialText: "",
  loading: false,
};

export default ReviewForm;
