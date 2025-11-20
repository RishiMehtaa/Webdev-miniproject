import React, { useState } from "react";
import "./signup.css";

export default function SignupNgo() {
  const [form, setForm] = useState({
    ngoname: "",
    username: "",
    email: "",
    password: "",
  });
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function validEmail(e) {
  return /\S+@\S+\.\S+/.test(e);
}

function validPassword(p) {
  return p.length >= 6 && /\d/.test(p);
}

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.ngoname || !form.username || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }
    if (!validEmail(form.email)) {
    alert("Enter a valid email address");
    return;
  }
  if (!validPassword(form.password)) {
    alert("Password must be at least 6 characters and include at least one number");
    return;
  }
    const ngos = JSON.parse(localStorage.getItem("ngos") || "[]");
    const exists = ngos.find((n) => n.username === form.username);
    if (exists) {
      alert("Username already exists");
      return;
    }
    ngos.push(form);
    localStorage.setItem("ngos", JSON.stringify(ngos));
    alert("NGO Registered! Please login.");
    window.location = "/login";
  }
  return (
    <div className="signup-container">
      <img src="/images/biglogo.png" alt="Logo" className="signup-logo" />
      <div className="signup-box">
        <h2>NGO Signup</h2>
        <form onSubmit={handleSubmit}>
          <label>NGO Name</label>
          <input name="ngoname" value={form.ngoname} onChange={handleChange} />
          <label>Username</label>
          <input name="username" value={form.username} onChange={handleChange} />
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <button className="signup-btn">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => (window.location = "/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}
