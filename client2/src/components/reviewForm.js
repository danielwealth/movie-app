import React, { useState } from "react";
import axios from "axios";

function ReviewForm({ tmdbId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(`/api/review/${tmdbId}`, { rating, comment }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Review submitted!");
      setRating(0);
      setComment("");
    } catch (err) {
      alert("Error submitting review");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Rating (1–5):</label>
      <input type="number" min="1" max="5" value={rating} onChange={e => setRating(e.target.value)} />
      <label>Comment:</label>
      <textarea value={comment} onChange={e => setComment(e.target.value)} />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
