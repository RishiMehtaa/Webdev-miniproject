import React, { useState, useEffect } from "react";
import Navbar from "./navbar.jsx";

export default function About() {
  const [aboutText, setAboutText] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("aboutUsText");
    setAboutText(
      saved ||
        "We are a non-profit organization dedicated to education, healthcare, and women empowerment across rural India."
    );
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px", maxWidth: "800px", margin: "40px auto", textAlign: "center" }}>
        <h2>About Us</h2>
        <p style={{ whiteSpace: "pre-line" }}>{aboutText}</p>
      </div>
    </>
  );
}
