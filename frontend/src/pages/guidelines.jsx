import Navbar from "./navbar.jsx";
import "./guidelines.css";
import { useState, useEffect } from "react";

export default function Guidelines() {
  const [text, setText] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("guidelinesText"));
    setText(
      saved || [
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
      ]
    );
  }, []);

  return (
    <>
      <Navbar />
      <div className="guidelines-center">
        <h2>Guidelines</h2>
        {text.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </>
  );
}
