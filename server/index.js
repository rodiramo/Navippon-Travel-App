import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoute from "./routes/auth.routes.js";
import adminRoute from "./routes/admin.routes.js";
import userRoute from "./routes/users.routes.js";
import postRoute from "./routes/posts.routes.js";
import budgetRoute from "./routes/budget.routes.js";
import prefectureRoute from "./routes/prefectures.routes.js";
import categoryRoute from "./routes/categories.routes.js";
import activityRoute from "./routes/activities.routes.js";
import tripsRoute from "./routes/trips.routes.js";
import { editUser } from "./controllers/users.controller.js";
import { register } from "./controllers/auth.controller.js";
import {
  createActivity,
  editActivity,
} from "./controllers/activities.controller.js";
import { verifyToken } from "./middleware/auth.middleware.js";
import { createPost } from "./controllers/posts.controller.js";
//import User from "./models/User.js";
//import Category from "./models/Category.js";
//import Prefecture from "./models/Prefecture.js";
//import Activity from "./models/Activity.js";
//import Budget from "./models/Budget.js";
//import Hotel from "./models/Hotel.js";
//import Restaurant from "./models/Restaurant.js";
//import {
//  prefectures,
//  categories,
//  users,
//  activities,
//  budgets,
//  hotels,
//  restaurants,
//} from "./data/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* File Storage */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/** Routes with Files */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);
app.patch("/users/:id", verifyToken, upload.single("picture"), editUser);
app.post("/activities", verifyToken, upload.single("picture"), createActivity);
app.patch(
  "/activities/:id",
  verifyToken,
  upload.single("picture"),
  editActivity
);
/** Routes */
app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/trips", tripsRoute);
app.use("/budget", budgetRoute);
app.use("/categories", categoryRoute);
app.use("/prefectures", prefectureRoute);
app.use("/activities", activityRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!" });
});

/** Mongoose */
const PORT = process.env.PORT || 3333;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));
    //insertar data
    //  Budget.insertMany(budgets);
    //  User.insertMany(users);
    //  Category.insertMany(categories);
    //  Activity.insertMany(activities);
    //  Restaurant.insertMany(restaurants);
    //  Hotel.insertMany(hotels);
    //  Prefecture.insertMany(prefectures);
  })
  .catch((error) => console.log(`${error} did not connect`));
