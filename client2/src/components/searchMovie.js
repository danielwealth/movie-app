import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TMDB_KEY = process.env.REACT_APP_TMDB_KEY;

function SearchMovies() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${query}&sort_by=${sortBy}`
      );
      setMovies(res.data.results);
    } catch (err) {
      console.error("Search error:", err.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🔎 Search Movies</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="popularity.desc">Most Popular</option>
          <option value="release_date.desc">Newest Releases</option>
          <option value="release_date.asc">Oldest Releases</option>
        </select>
        <button type="submit">Search</button>
      </form>

      <div style={{ marginTop: "2rem" }}>
        {movies.length === 0 ? (
          <p>No results yet.</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {movies.map((movie) => (
  <div key={movie.id} className="movie-card">
  <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
    <img
      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
      alt={movie.title}
      className="movie-poster"
    />
    <p className="movie-title">{movie.title}</p>
  </Link>
</div>

))}

          </div>
        )}
      </div>
    </div>
  );
}

export default SearchMovies;
