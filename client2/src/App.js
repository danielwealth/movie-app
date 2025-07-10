import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import SearchMovies from "./components/SearchMovies";
import { useParams } from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchMovies />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movie/:id" element={<MovieDetailWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

// Wrap MovieDetail with route param
function MovieDetailWrapper() {
  const { id } = useParams();
  return <MovieDetail tmdbId={id} />;
}
export default App;

