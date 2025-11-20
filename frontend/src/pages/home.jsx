import React from "react";
import { Link } from "react-router-dom";
import ImageCarousel from "./carousel.jsx"
import "./home.css";
import Navbar from "./navbar.jsx";

const HomePage = () => {
  return (
    <>
    <Navbar />
    <div className="homepage">
        <ImageCarousel />
      <section className="impact-section">
        <h2>Our Impact</h2>
        <div className="impact-cards">
          <div className="impact-card">
            <h3>10,000+</h3>
            <p className="label">Lives Impacted</p>
            <p>Through our various programs and initiatives</p>
          </div>
          <div className="impact-card">
            <h3>50+</h3>
            <p className="label">Villages</p>
            <p>Communities we work with across India</p>
          </div>
          <div className="impact-card">
            <h3>100+</h3>
            <p className="label">Volunteers</p>
            <p>Dedicated individuals making a difference</p>
          </div>
        </div>
      </section>
      <section className="programs-section">
        <h2>Our Events</h2>
        <div className="program-cards">
          <div className="program-card" style={{ backgroundImage: "url(/images/event1.png)" }}>
            <div className="program-text">
              <h3>Education</h3>
              <p>Quality education for underprivileged children</p>
            </div>
          </div>
          <div className="program-card" style={{ backgroundImage: "url(/images/event3.jpg)" }}>
            <div className="program-text">
              <h3>Healthcare</h3>
              <p>Healthcare services for rural communities</p>
            </div>
          </div>
          <div className="program-card" style={{ backgroundImage: "url(/images/event2.jpg)" }}>
            <div className="program-text">
              <h3>Women Empowerment</h3>
              <p>Skill development & entrepreneurship programs</p>
            </div>
          </div>
        </div>
      </section>
      <section className="join-section">
        <h2>Join Us as a Volunteer Today</h2>
        <Link to="/joinevent">
        <button className="join-big-btn">Become a Volunteer</button>
        </Link>
      </section>
    </div>
    </>
  );
};

export default HomePage;
