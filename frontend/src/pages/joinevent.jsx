import { useState } from "react";
import Navbar from "./navbar.jsx";
import "./joinevent.css";
export default function JoinEvent() {
  const [form, setForm] = useState({
    name: "",
    date: "",
    location: ""
  });
  const eventImages = {
    "Tree Plantation Drive": "/images/event1.png",
    "Village Literacy Program": "/images/event2.jpg",
    "Women Empowerment": "/images/event3.jpg"
  };
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.date || !form.location) {
      alert("Please fill all fields");
      return;
    }
    const registeredEvents = JSON.parse(localStorage.getItem("registeredEvents") || "[]");
    const newEvent = {
      id: Date.now(),
      name: form.name,
      date: form.date,
      location: form.location,
      img: eventImages[form.name]
    };
    registeredEvents.push(newEvent);
    localStorage.setItem("registeredEvents", JSON.stringify(registeredEvents));
    alert("Registered! Join the whatsapp group!");
    setForm({ name: "", date: "", location: "" });
  }
  return (
    <>
      <Navbar />
      <div className="join-container">
        <h2 className="join-title">Register for an Event</h2>
        <form className="join-form" onSubmit={handleSubmit}>
          <label>Event Name</label>
          <select name="name" value={form.name} onChange={handleChange}>
            <option value="">Choose an event</option>
            <option value="Tree Plantation Drive">Tree Plantation Drive</option>
            <option value="Village Literacy Program">Village Literacy Program</option>
            <option value="Women Safety Workshop">Women Safety Workshop</option>
          </select>
          <label>Event Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} />
          <label>Location</label>
          <input name="location" value={form.location} onChange={handleChange} />
          <button className="join-btn-submit">Submit</button>
        </form>
      </div>
    </>
  );
}
