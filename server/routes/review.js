const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../middleware/verify"); // JWT middleware

// ⭐ Add a review
router.post("/:tmdbId", verify, async (req, res) => {
  try {
    const movie = await Movie.findOneAndUpdate(
      { tmdbId: req.params.tmdbId },
      {
        $push: {
          reviews: {
            user: req.user.id,
            rating: req.body.rating,
            comment: req.body.comment
          }
        }
      },
      { new: true, upsert: true }
    );
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err.message);
  }

});

module.exports = router;
