import Navbar from "./navbar.jsx";
import "./userprofile.css";

function UserProfile() {
  const current = JSON.parse(localStorage.getItem("currentUser"));
  
  if (!current) {
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: 50, color: "white" }}>
          Please login first.
        </h2>
      </>
    );
  }

  const storedList = JSON.parse(
    localStorage.getItem(current.role === "volunteer" ? "volunteers" : "ngos")
  ) || [];

  const foundUser = storedList.find(u => u.username === current.username);

  if (!foundUser) {
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: 50, color: "white" }}>
          User not found.
        </h2>
      </>
    );
  }

  const user = {
    username: foundUser.username,
    email: foundUser.email,
    image: foundUser.image || "/images/user.png"
  };

  const events = JSON.parse(localStorage.getItem("addedEvents") || "[]");

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="top-section">
          <img src={user.image} className="profile-pic" />
          <div className="user-details">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </div>

        <h3 className="events-heading">Added Events</h3>

        <div className="events-section">
          {events.length === 0 ? (
            <p className="no-events">No events added yet.</p>
          ) : (
            events.map(event => (
              <div key={event.id} className="event-card">
                <p><strong>Event:</strong> {event.name}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Location:</strong> {event.location}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default UserProfile;