import React, { useState, useEffect } from "react";
import Navbar from "./navbar.jsx";

export default function NGOAbout() {
  const [aboutText, setAboutText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("aboutUsText");
    setAboutText(
      saved ||
        "We are a non-profit organization dedicated to education, healthcare, and women empowerment across rural India."
    );
  }, []);

  function saveChanges() {
    localStorage.setItem("aboutUsText", aboutText);
    alert("About Us updated!");
    setIsEditing(false);
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px", maxWidth: "800px", margin: "40px auto", textAlign: "center" }}>
        <h2>About Us</h2>

        {!isEditing && (
          <>
            <p style={{ whiteSpace: "pre-line" }}>{aboutText}</p>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                marginTop: "15px",
                padding: "8px 18px",
                background: "#d32b2b",
                color: "white",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Modify
            </button>
          </>
        )}

        {isEditing && (
          <>
            <textarea
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              style={{ width: "100%", height: "150px", padding: "10px", borderRadius: "6px" }}
            />

            <button
              onClick={saveChanges}
              style={{
                marginTop: "15px",
                padding: "8px 18px",
                background: "green",
                color: "white",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              style={{
                marginLeft: "10px",
                padding: "8px 18px",
                background: "gray",
                color: "white",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </>
  );
}
