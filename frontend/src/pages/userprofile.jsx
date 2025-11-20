import Navbar from "./navbar.jsx";
import "./userprofile.css";

function UserProfile() {
  const current = JSON.parse(localStorage.getItem("currentUser"));
  if (!current) {
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: 50 }}>Please login first.</h2>
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
        <h2 style={{ textAlign: "center", marginTop: 50 }}>User not found.</h2>
      </>
    );
  }
  const user = {
    fullname: foundUser.fullname,
    username: foundUser.username,
    email: foundUser.email,
    image: foundUser.image || "/images/user.png"
  };
  const events = JSON.parse(localStorage.getItem("registeredEvents") || "[]");
  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="top-section">
          <img src={user.image} className="profile-pic" />
          <div className="user-details">
            <p><strong>Name:</strong> {user.fullname}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </div>
        <h3 className="events-heading">Registered Events</h3>
        <div className="events-section">
          {events.length === 0 ? (
            <p style={{ opacity: 0.7 }}>No events registered yet.</p>
          ) : (
            events.map(event => (
              <div key={event.id} className="event-card">
                <img src={event.img} className="event-img" />
                <p className="event-name">{event.name}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
export default UserProfile;
