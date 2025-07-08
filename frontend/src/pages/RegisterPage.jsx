import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", user);
      navigate("/");
    } catch (err) {
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-purple-100">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center text-green-700 mb-6">Create an Account </h1>
        <p className="text-center text-gray-500 mb-8">Please fill the form to register</p>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button
            onClick={handleRegister}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition duration-300 font-semibold"
          >
            Register
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?
          <span
            onClick={() => navigate('/')}
            className="text-green-600 font-semibold cursor-pointer hover:underline ml-1"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}
