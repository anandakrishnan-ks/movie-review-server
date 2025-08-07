const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const dbConnectionLink = process.env.DB_CONNECTION_LINK;

// Import Routers
const ratingRouter = require("./src/routes/ratingRouter");
const actorRouter = require("./src/routes/actorRouter");
const directorRouter = require("./src/routes/directorRouter");
const languageRouter = require("./src/routes/languageRouter");
const commentRouter = require("./src/routes/commentRouter");
const movieRouter = require("./src/routes/movieRoutes");
const userRouter = require("./src/routes/userRoutes");
const reviewRouter = require("./src/routes/reviewRouter");

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/api/actors", actorRouter);
app.use("/api/directors", directorRouter);
app.use("/api/languages", languageRouter);
app.use("/api/comments", commentRouter);
app.use("/api/ratings", ratingRouter);
app.use("/api/movies", movieRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);

// Home route
app.get("/", (req, res) => {
  res.send("<h1>🎬 Welcome to the Movie Review API</h1>");
});

mongoose
  .connect(process.env.DB_CONNECTION_LINK)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
