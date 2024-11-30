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
import reviewRoute from "./routes/review.routes.js";
import prefectureRoute from "./routes/prefectures.routes.js";
import regionRoute from "./routes/region.routes.js";
import categoryRoute from "./routes/categories.routes.js";
import experienceRoute from "./routes/experience.routes.js";
import tripsRoute from "./routes/trips.routes.js";
import { editUser } from "./controllers/users.controller.js";
import { register } from "./controllers/auth.controller.js";
import {
  createExperience,
  editExperience,
} from "./controllers/experience.controller.js";
import { verifyToken } from "./middleware/auth.middleware.js";
import { createPost } from "./controllers/posts.controller.js";
import User from "./models/User.js";
import Category from "./models/Category.js";
import Prefecture from "./models/Prefecture.js";
import Region from "./models/Region.js";
import Experience from "./models/Experience.js";
import Budget from "./models/Budget.js";
import {
  prefectures,
  categories,
  users,
  regions,
  experiences,
  budgets,
} from "./data/index.js";

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
app.post(
  "/experiences",
  verifyToken,
  upload.single("picture"),
  createExperience
);
app.patch(
  "/experiences/:id",
  verifyToken,
  upload.single("picture"),
  editExperience
);

/** Routes */
app.use("/auth", authRoute);
app.use("/reviews", reviewRoute);
app.use("/admin", adminRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/trips", tripsRoute);
app.use("/budget", budgetRoute);
app.use("/categories", categoryRoute);
app.use("/prefectures", prefectureRoute);
app.use("/regions", regionRoute);
app.use("/experiences", experienceRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!" });
});

/** Mongoose Setup */
const PORT = process.env.PORT || 3333;
mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));

    try {
      const budgetCount = await Budget.countDocuments();
      if (budgetCount === 0) {
        await Budget.insertMany(budgets);
        console.log("Budgets inserted successfully.");
      }

      const userCount = await User.countDocuments();
      if (userCount === 0) {
        await User.insertMany(users);
        console.log("Users inserted successfully.");
      }

      const categoryCount = await Category.countDocuments();
      if (categoryCount === 0) {
        await Category.insertMany(categories);
        console.log("Categories inserted successfully.");
      }

      const experienceCount = await Experience.countDocuments();
      if (experienceCount === 0) {
        await Experience.insertMany(experiences);
        console.log("Experiences inserted successfully.");
      }

      const prefectureCount = await Prefecture.countDocuments();
      if (prefectureCount === 0) {
        await Prefecture.insertMany(prefectures);
        console.log("Prefectures inserted successfully.");
      }
      const regionCount = await Region.countDocuments();
      if (regionCount === 0) {
        await Region.insertMany(regions);
        console.log("Regions inserted successfully.");
      }
    } catch (error) {
      console.error("Error inserting initial data:", error);
    }
  })
  .catch((error) => console.log(`${error} did not connect`));
