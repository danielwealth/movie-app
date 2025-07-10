router.post("/:id/rate", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    const user = await User.findById(req.user.id);

    const existing = user.reviews.find(r => r.movieId === id);
    if (existing) {
      existing.rating = rating;
    } else {
      user.reviews.push({ movieId: id, rating, text: "" });
    }

    await user.save();
    res.status(200).json("Rating saved");
  } catch (err) {
    res.status(500).json(err.message);
  }
});
