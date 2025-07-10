require("dotenv").config({ path: __dirname + "/.env" });
const reviewRoute = require("./routes/review");

const profileRoute = require("./routes/profile");


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoute = require("./routes/auth");
const watchlistRoutes = require("./routes/watchlist");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 🔐 Routes
app.use("/api/auth", authRoute);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/review", reviewRoute);
app.use("/api/profile", profileRoute);

console.log("Mongo URI:", process.env.MONGO_URI);
app.get("/", (req, res) => {
  res.send("Movie API backend is running 🎬🔌");
});


app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});

