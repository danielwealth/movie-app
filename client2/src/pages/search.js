import { searchMovies, filterMovies } from "../services/tmdb";

const handleSearch = async (e) => {
  e.preventDefault();
  let results;
  if (rating) {
    results = await filterMovies({ rating });
  } else {
    results = await searchMovies(query);
  }
  setResults(results);
};
