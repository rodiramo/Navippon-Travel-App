import { Schema, model } from "mongoose";

const ReviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: false },
    desc: { type: String, required: false },
    rating: {
      type: Number,
      required: true,
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
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Review",
      default: null,
    },
    replyOnUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

ReviewSchema.virtual("replies", {
  ref: "Review",
  localField: "_id",
  foreignField: "parent",
});

const Review = model("Review", ReviewSchema);
export default Review;
