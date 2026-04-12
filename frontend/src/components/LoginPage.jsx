import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  let navigate = useNavigate();
  const host = "http://localhost:5000";
  const [cred, Setcred] = useState({ email: "", password: "" });

  const handlesubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${host}/api/auto/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password })
    });
    const json = await response.json();

    if (json.success === true) {
      localStorage.setItem('token', json.jwtdata);
      navigate("/");
    } else {
      console.log("error");
    }
  };

  const onChange = (e) => {
    Setcred({ ...cred, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-[#1e1e1e] p-8 rounded-[20px] shadow-2xl w-full max-w-sm animate-fade-in border border-zinc-800">
        <h1 className="text-2xl font-bold text-center text-white mb-6">Log In</h1>
        <form onSubmit={handlesubmit} className="flex flex-col gap-4">

          <div className="flex flex-col">
            <label className="text-gray-400 mb-1 text-sm">Email Address *</label>
            <input
              required
              name="email"
              type="email"
              value={cred.email}
              onChange={onChange}
              className="bg-transparent border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-red-600 transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-400 mb-1 text-sm">Password *</label>
            <input
              required
              name="password"
              type="password"
              value={cred.password}
              onChange={onChange}
              className="bg-transparent border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-red-600 transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg hover:scale-105"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
