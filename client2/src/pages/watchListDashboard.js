const res = await api.get("/watchlist", {
  headers: { Authorization: `Bearer ${token}` }
});
useEffect(() => {
  const fetchWatchlists = async () => {
    const token = localStorage.getItem("token");
    const res = await api.get("/watchlist", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setWatchlists(res.data);
  };
  fetchWatchlists();
}, []);

