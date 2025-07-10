import React, { useState } from "react";
import { searchMovies } from "../services/tmdb";
<div className="mt-4 flex flex-col md:flex-row gap-2">
  <input
    type="text"
    placeholder="Watchlist name"
    value={watchlistName}
    onChange={(e) => setWatchlistName(e.target.value)}
    className="input"
  />
  <button onClick={handleAddToWatchlist} className="btn-secondary">
    📁 Add to Watchlist
  </button>
</div>


const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await searchMovies(query);
    setResults(data);
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSearch} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input w-full"
        />
        <button type="submit" className="btn-primary">Search</button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map((movie) => (
          <div key={movie.id} className="border p-2 rounded hover:shadow-lg">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="rounded"
            />
            <h4 className="mt-2 text-sm">{movie.title}</h4>
            <p className="text-xs text-gray-500">{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const [rating, setRating] = useState("");

<form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
  <input
    type="text"
    placeholder="Search by title..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="input"
  />

  <select value={rating} onChange={(e) => setRating(e.target.value)} className="input">
    <option value="">Filter by rating</option>
    <option value="8">8+</option>
    <option value="7">7+</option>
    <option value="6">6+</option>
  </select>

  <button type="submit" className="btn-primary">Search</button>
</form>



export default Search;
