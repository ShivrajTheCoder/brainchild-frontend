import React, { useState } from "react";
import Input from "../../Components/Input";
import { BASE_URL } from "../../BASE_URL";
import axios from "axios";

export default function Login() {
  const apiUrl = BASE_URL;
  const [loginData, setLoginData] = useState({
    email: "", // Change 'username' to 'email'
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      console.error("Email and password are required.");
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, loginData);
      console.log("Login successful:", response);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-4 bg-white shadow-md my-10">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form onSubmit={handleLogin}>
        <Input
          label="Email" // Change 'Username' to 'Email'
          type="text"
          placeholder="Enter your email"
          name="email" // Change 'username' to 'email'
          onChange={handleChange}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          name="password"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Login
        </button>
      </form>
    </div>
  );
}
