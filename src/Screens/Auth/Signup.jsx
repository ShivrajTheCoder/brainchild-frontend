import React, { useState } from "react";
import Input from "../../Components/Input";
export default function Signup  () {
    const [signupData, setSignupData] = useState({
      username: "",
      email: "",
      password: "",
    });
  
    const handleChange = (e) => {
      setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };
  
    const handleSignup = (e) => {
      e.preventDefault();
      // Add your signup logic here
      console.log("Signing up with:", signupData);
    };
  
    return (
      <div className="container mx-auto max-w-md mt-10 p-4 bg-white shadow-md my-10">
        <h1 className="text-2xl font-semibold mb-4">Signup</h1>
        <form onSubmit={handleSignup}>
          <Input
            label="Username"
            type="text"
            placeholder="Enter your username"
            name="username"
            onChange={handleChange}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            name="email"
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
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
          >
            Signup
          </button>
        </form>
      </div>
    );
  };
  