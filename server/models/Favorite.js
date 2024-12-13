import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema(
  {
    userFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    experienceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Experience",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },

  { timestamps: true }
);

const Favorite = mongoose.model("Favorite", FavoriteSchema);
export default Favorite;
