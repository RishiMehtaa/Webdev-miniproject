import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const current = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/images/logo.png" alt="Logo" className="logo-img" />
      </div>

      <ul className="nav-links">

        {current?.role === "volunteer" && (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/guidelines">Guidelines</Link></li>
            <li><Link to="/userprofile">Profile</Link></li>
          </>
        )}

        {current?.role === "ngo" && (
          <>
            <li><Link to="/ngodash">NGO Dashboard</Link></li>
            <li><Link to="/ngocontact">Contact Us</Link></li>
            <li><Link to="/ngoabout">About Us</Link></li>
            <li><Link to="/ngoguide">Guidelines</Link></li>
            <li><Link to="/ngoprofile">Profile</Link></li>
          </>
        )}
      </ul>

      {current?.role === "volunteer" && (
        <Link to="/joinevent">
          <button className="join-btn">Join Event</button>
        </Link>
      )}

      {current?.role === "ngo" && (
        <Link to="/addevent">
          <button className="join-btn">Add Event</button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
