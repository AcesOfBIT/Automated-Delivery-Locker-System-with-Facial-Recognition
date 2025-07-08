import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-green-100">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center text-green-700 mb-6">Welcome Back 👋</h1>
        <p className="text-center text-gray-500 mb-8">Please login to your account</p>

        <div className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition duration-300 font-semibold"
          >
            Login
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?
          <span
            onClick={() => navigate('/register')}
            className="text-green-600 font-semibold cursor-pointer hover:underline ml-1"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}
