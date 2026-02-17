import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTaskStore from "../store/useTaskStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useTaskStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setUser({ email, name: email.split("@")[0] });
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="p-8 bg-white shadow-lg rounded-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Task Board Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-2 mb-6 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
