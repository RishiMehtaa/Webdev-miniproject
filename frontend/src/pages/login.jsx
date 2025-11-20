import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "", role: "" });
  const navigate = useNavigate();
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!form.username || !form.password || !form.role) {
      alert("Please fill all fields");
      return;
    }
    const stored = JSON.parse(
      localStorage.getItem(form.role === "volunteer" ? "volunteers" : "ngos") || "[]"
    );
    const found = stored.find(
      (u) => u.username === form.username && u.password === form.password
    );
    if (!found) {
      alert("Invalid credentials");
      return;
    }
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ username: found.username, role: form.role })
    );
    navigate("/userprofile");
  }

  return (
    <div className="login-container">
      <img src="/images/biglogo.png" alt="Logo" className="login-logo" />
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input name="username" value={form.username} onChange={handleChange} />
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          <label>Role</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="">Select</option>
            <option value="volunteer">Volunteer</option>
            <option value="ngo">NGO</option>
          </select>
          <button className="login-btn">Login</button>
          <div className="signup-links">
            <p>Don't have an account?</p>
            <span onClick={() => (window.location = "/signupvolunteer")}>
              Signup (Volunteer)
            </span>
            <span onClick={() => (window.location = "/signupngo")}>
              Signup (NGO)
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
