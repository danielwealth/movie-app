import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [profile, setProfile] = useState({ username: "", email: "", bio: "", avatar: "" });

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put("/api/profile", profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Profile updated!");
    } catch (err) {
      alert("Update failed");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <form onSubmit={handleUpdate} style={{ padding: "2rem" }}>
      <h2>👤 Your Profile</h2>
      <input
        type="text"
        placeholder="Username"
        value={profile.username}
        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
      />
      <input
        type="text"
        placeholder="Bio"
        value={profile.bio}
        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
      />
      <input
        type="text"
        placeholder="Avatar URL"
        value={profile.avatar}
        onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
      />
      <button type="submit">Update Profile</button>

      {profile.avatar && (
        <div style={{ marginTop: "1rem" }}>
          <img src={profile.avatar} alt="Avatar" width="100" />
        </div>
      )}
    </form>
  );
}

export default Profile;
