
const router = require("express").Router();
const verify = require("../middleware/verifyToken");
const User = require("../models/User");

// 📝 Add movie to a watchlist (or create one)
router.post("/", verify, async (req, res) => {
  const { name, movieId } = req.body;
  try {
    const user = await User.findById(req.user.id);
    let list = user.watchlists.find(w => w.name === name);

    if (!list) {
      user.watchlists.push({ name, movies: [movieId] });
    } else if (!list.movies.includes(movieId)) {
      list.movies.push(movieId);
    }

    await user.save();
    res.status(200).json("Movie added to watchlist");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// 📥 Retrieve all watchlists
router.get("/", verify, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user.watchlists);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
