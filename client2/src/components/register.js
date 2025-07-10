import React, { useState } from "react";
import Login from "./Login"; // adjust path if needed

import axios from "axios";
function App() {
  return (
    <div className="App">
      <Register />
      <Login />
    </div>
  );
}

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", form);
      alert("Registration successful!");
    } catch (err) {
      alert("Error: " + err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  );
}
export default Register;
