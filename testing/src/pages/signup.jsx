import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/register", form)
      .then((res) => setMessage(res.data.Status))
      .catch((err) => setMessage("Signup failed"));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full mb-4 p-2 border"
          required
        />
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800">Signup</button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Signup;
