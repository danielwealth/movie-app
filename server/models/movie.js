const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
}, { timestamps: true });

const MovieSchema = new mongoose.Schema({
  title: String,
  tmdbId: String,
  reviews: [ReviewSchema]
});

module.exports = mongoose.model("Movie", MovieSchema);
