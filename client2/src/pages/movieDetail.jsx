import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getRecommendations } from "../services/tmdb";
import api from "../services/api"; // Your backend axios instance
import { FaStar } from "react-icons/fa";
const [rating, setRating] = useState(0);
watchlists: [
  {
    name: String,
    movies: [String] // TMDB IDs
  }
]
watchlists.map(list => (
  <div key={list.name}>
    <h3>{list.name}</h3>
    <ul>{list.movies.map(id => <MovieCard id={id} />)}</ul>
  </div>
))


const handleFavorite = async () => {
  try {
    const token = localStorage.getItem("token");
    await api.post(`/users/favorites`, { movieId: movie.id }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Movie added to favorites!");
  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  }
};


const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getMovieDetails(id);
      setMovie(data);

      const recs = await getRecommendations(id);
      setRecommendations(recs);
    };
    fetchDetails();
  }, [id]);

  if (!movie) return <div className="p-5">Loading movie details...</div>;

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg shadow-md"
        />
        <div>
          <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
          <p className="text-sm text-gray-600 mb-1">📅 {movie.release_date}</p>
          <p className="text-sm text-yellow-600 mb-1">⭐ {movie.vote_average}</p>
          <p className="mt-3 text-gray-800">{movie.overview}</p>

          {/* Add to Favorites / Watchlist */}
          <div className="mt-4 flex gap-2">
            <button className="btn-primary">Add to Favorites</button>
            <button className="btn-secondary">Add to Watchlist</button>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">You might also like</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="text-center">
              <img
                src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`}
                alt={rec.title}
                className="rounded shadow"
              />
              <p className="text-sm mt-1">{rec.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
<button onClick={handleFavorite} className="btn-primary">Add to Favorites</button>
{movie.genres?.length > 0 && (
  <Recommendations genreId={movie.genres[0].id} />
)}


const handleRate = async (value) => {
  setRating(value);
  try {
    const token = localStorage.getItem("token");
    await api.post(`/movies/${movie.id}/rate`, { rating: value }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Thanks for your rating!");
  } catch (err) {
    alert("Could not submit rating");
  }
};

<div className="flex mt-4">
  {[...Array(5)].map((_, i) => (
    <FaStar
      key={i}
      onClick={() => handleRate(i + 1)}
      className={i < rating ? "text-yellow-400 cursor-pointer" : "text-gray-300 cursor-pointer"}
      size={24}
    />
  ))}
</div>



export default MovieDetail;
