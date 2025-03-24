import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [authToken, setAuthToken] = useState(null);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const register = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        formData
      );
      setMessage(response.data.msg);
    } catch (error) {
      setMessage(error.response?.data.msg || "Something went wrong!");
    }
  };

  const login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );
      setAuthToken(response.data.access_token);
      setMessage("Login successful");
    } catch (error) {
      setMessage(error.response?.data.msg || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-xl p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-xl font-semibold text-center text-gray-800 mb-6">
          JWT Demo
        </h1>
        <div className="flex flex-col gap-4 text-black">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex justify-between">
            <button
              onClick={register}
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition"
            >
              Register
            </button>
            <button
              onClick={login}
              className="w-full ml-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
            >
              Login
            </button>
          </div>
        </div>
        {authToken && (
          <div className="mt-6 p-4 bg-green-50 border border-green-400 rounded-lg text-green-800 overflow-auto">
            <p>
              <strong>Token:</strong> {authToken}
            </p>
          </div>
        )}
        {message && (
          <div
            className={`mt-4 p-4 border rounded-lg ${
              message.includes("successful")
                ? "bg-green-50 border-green-400 text-green-800"
                : "bg-red-50 border-red-400 text-red-800"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
