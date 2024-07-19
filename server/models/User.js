import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  { role: {
    type: String,
    enum: ["user", "admin" ], 
    default: "user", 
  },
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 50,
    },
    picturePath: {
      type: String,
      default: "",
    },
    interests: {
      type: Array,
      default: [],
    },
    friends: {
    type: Array,
    default: [],
    }, 
    budget: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
