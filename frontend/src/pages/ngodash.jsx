import { useEffect, useState } from "react";
import Navbar from "./navbar.jsx";

export default function NgoDash() {
  const [grouped, setGrouped] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("registeredEvents")) || [];

    // grouping events
    const eventGroups = {};
    data.forEach((ev) => {
      if (!eventGroups[ev.name]) {
        eventGroups[ev.name] = {
          count: 0,
          date: ev.date,
          location: ev.location
        };
      }
      eventGroups[ev.name].count++;
    });

    setGrouped(eventGroups);
  }, []);

  return (
    <>
      <Navbar />

      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        Event Registrations Summary
      </h2>

      <h3 style={{ textAlign: "center", marginTop: "5px", color: "#444" }}>
        Dashboard
      </h3>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
        <img
          src="/ngodash.png"
          alt="Dashboard Banner"
          style={{
            width: "80%",
            maxWidth: "900px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
          }}
        />
      </div>

      <div style={{ padding: "20px", maxWidth: "900px", margin: "20px auto" }}>
        <h2>Event Summary</h2>

        {Object.keys(grouped).length === 0 ? (
          <p>No registrations yet.</p>
        ) : (
          Object.keys(grouped).map((event) => {
            const info = grouped[event];

            return (
              <div
                key={event}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "15px",
                  marginBottom: "20px",
                  background: "#fafafa"
                }}
              >
                <h3>{event}</h3>
                <p><strong>Total Volunteers:</strong> {info.count}</p>
                <p><strong>Event Date:</strong> {info.date}</p>
                <p><strong>Location:</strong> {info.location}</p>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}