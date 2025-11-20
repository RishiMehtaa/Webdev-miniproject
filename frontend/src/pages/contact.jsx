import { useState } from "react";
import Navbar from "./navbar.jsx";
import "./contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    // Retrieve old messages from LocalStorage
    const oldMessages = JSON.parse(localStorage.getItem("messages")) || [];

    const newMessage = {
      name: form.name,
      email: form.email,
      message: form.message,
      time: new Date().toLocaleString()
    };

    // Save updated list of messages
    localStorage.setItem("messages", JSON.stringify([...oldMessages, newMessage]));

    alert("Message sent!");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <>
      <Navbar />
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Your Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />

          <label>Your Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <label>Your Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Enter your message"
            rows="5"
          ></textarea>

          <button className="contact-btn-submit">Send Message</button>
        </form>
      </div>
    </>
  );
}