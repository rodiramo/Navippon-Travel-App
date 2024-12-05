import { Schema, model } from "mongoose";

const ReviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: false },
    desc: { type: String, required: false },
    rating: {
      type: Number,
      required: false,
      min: 1,
      max: 5,
      default: 1,
    },
    experience: {
      type: Schema.Types.ObjectId,
      ref: "Experience",
      required: true,
    },
    check: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

const Review = model("Review", ReviewSchema);
export default Review;
