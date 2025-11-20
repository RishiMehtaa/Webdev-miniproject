import Navbar from "./navbar.jsx";
import "./guidelines.css";
import { useState, useEffect } from "react";

export default function NGOGuidelines() {
  const defaultText = [
    "1. Donate only items that are fresh, clean, and safe to use.",
    "2. Pack everything neatly in secure and clean containers.",
    "3. Mention basic details if required, like name or quantity.",
    "4. Donate realistic quantities that can be properly used.",
    "5. Ensure timely donation, especially for perishable items.",
    "6. Maintain hygiene while handling or preparing donations.",
    "7. Avoid restricted, unsafe, or harmful items.",
    "8. Communicate clearly about pickup location and timing.",
    "9. Be respectful with volunteers and beneficiaries.",
    "10. Follow any additional instructions given by the NGO."
  ];

  const [text, setText] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("guidelinesText"));
    setText(saved || defaultText);
  }, []);

  function saveChanges() {
    localStorage.setItem("guidelinesText", JSON.stringify(text));
    alert("Guidelines updated!");
    setIsEditing(false);
  }

  return (
    <>
      <Navbar />
      <div className="guidelines-center">
        <h2>Guidelines</h2>

        {!isEditing && (
          <>
            {text.map((line, index) => (
              <p key={index}>{line}</p>
            ))}

            <button
              onClick={() => setIsEditing(true)}
              style={{
                marginTop: "15px",
                padding: "8px 18px",
                background: "#d32b2b",
                color: "white",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer"
              }}
            >
              Modify
            </button>
          </>
        )}

        {isEditing && (
          <>
            <textarea
              value={text.join("\n")}
              onChange={(e) => setText(e.target.value.split("\n"))}
              style={{
                width: "100%",
                height: "200px",
                padding: "10px",
                borderRadius: "6px"
              }}
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
                cursor: "pointer"
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
                cursor: "pointer"
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
