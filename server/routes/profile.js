const router = require("express").Router();
const User = require("../models/User");
const verify = require("../middleware/verify"); // JWT middleware

// 🔍 Get current user's profile
router.get("/", verify, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// ✏️ Update profile
router.put("/", verify, async (req, res) => {
  try {
    const updates = {
      username: req.body.username,
      bio: req.body.bio,
      avatar: req.body.avatar
    };
    const updated = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
