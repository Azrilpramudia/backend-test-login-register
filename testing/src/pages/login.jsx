import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/login", form)
      .then((res) => {
        if (res.data.Status === "Success") {
          localStorage.setItem("token", res.data.Token);
          navigate("/profile");
        } else {
          setMessage(res.data.Error);
        }
      })
      .catch(() => setMessage("Login failed"));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mb-4 p-2 border"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full mb-4 p-2 border"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800">Login</button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Login;
