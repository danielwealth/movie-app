
import { useState } from "react";
import axios from "axios";
import Register from "./Register"; // adjust path if needed

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
    } catch (err) {
      alert("Login failed: " + err.response.data);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
  function App() {
  return (
    <div className="App">
      <Register />
      <Login />
    </div>
  );
}

}
export default Login;
