import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice.js"; // Redux action
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/config.js";

const Login = () => {
  const [formData, setFormData] = useState({ login: "", password: "" });
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/u/login`, formData, {
        withCredentials: true,
      });

      setMessage(data.message);
      dispatch(login(data.user)); // Dispatch login action with user data
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded px-8 py-6 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Username or Email</label>
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </button>
        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
