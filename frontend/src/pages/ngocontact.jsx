import { useEffect, useState } from "react";
import Navbar from "./navbar.jsx";

export default function NgoContact() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("messages")) || [];
    setMessages(stored);
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px", maxWidth: "800px", margin: "20px auto" }}>
        <h2>Volunteer Messages</h2>

        {messages.length === 0 ? (
          <p>No messages received yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px"
              }}
            >
              <p><strong>Name:</strong> {msg.name}</p>
              <p><strong>Email:</strong> {msg.email}</p>
              <p><strong>Message:</strong> {msg.message}</p>
              <p style={{ fontSize: "12px", opacity: 0.6 }}>{msg.time}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
