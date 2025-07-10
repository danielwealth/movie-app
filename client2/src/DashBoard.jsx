import jwtDecode from "jwt-decode";

const token = localStorage.getItem("token");
const user = token ? jwtDecode(token) : null;

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};


<div className="mt-4 flex gap-2">
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
