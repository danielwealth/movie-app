import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewForm from "./ReviewForm";

const TMDB_KEY = process.env.REACT_APP_TMDB_KEY;

function MovieDetail({ tmdbId }) {
  const [movie, setMovie] = useState(null);

  const fetchMovieDetails = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_KEY}`
      );
      setMovie(res.data);
    } catch (err) {
      console.error("Error fetching movie details:", err.message);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [tmdbId]);

  if (!movie) return <p>Loading movie details...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        style={{ borderRadius: "8px" }}
      />
      <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(", ")}</p>

      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> {movie.vote_average} ⭐</p>
      <p><strong>Overview:</strong> {movie.overview}</p>

      <hr />
      <h3>Rate & Review</h3>
      <ReviewForm tmdbId={tmdbId} />
    </div>
  );
}

export default MovieDetail;
