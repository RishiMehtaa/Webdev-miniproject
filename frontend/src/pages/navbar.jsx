import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/images/logo.png" alt="Logo" className="logo-img" />
        </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li>Contact Us</li>
        <li>About Us</li>
        <li>Guidelines</li>
        <li><Link to="/userprofile">Profile</Link></li>
      </ul>
      <Link to="/joinevent">
        <button className="join-btn">Join Event</button>
      </Link>
    </nav>
  );
};

export default Navbar;
