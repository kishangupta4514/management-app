import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/admin/login`, {
        email,
        password,
      });
      auth?.login(response.data.token);
      navigate("/admin");
    } catch (err) {
      setError("Invalid email or password" + err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Admin Login</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full py-2 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 transition duration-300"
      >
        Login
      </button>
    </form>
    {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
  </div>
</div>

  );
}
