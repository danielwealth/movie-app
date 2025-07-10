import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export const searchMovies = async (query, year = "", date = "") => {
  const res = await tmdb.get("/search/movie", {
    params: {
      query,
      year,
      primary_release_date: date,
    },
  });
  return res.data.results;
};

export const getPopularMovies = async () => {
  const res = await tmdb.get("/movie/popular");
  return res.data.results;
};

export const getMovieDetails = async (movieId) => {
  const res = await tmdb.get(`/movie/${movieId}`);
  return res.data;
};

export const getRecommendations = async (movieId) => {
  const res = await tmdb.get(`/movie/${movieId}/recommendations`);
  return res.data.results;
};


export const filterMovies = async ({ rating = "" }) => {
  const res = await tmdb.get("/discover/movie", {
    params: {
      "vote_average.gte": rating,
      sort_by: "vote_average.desc",
    },
  });
  return res.data.results;
};

