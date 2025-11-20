import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/navbar.jsx";

import HomePage from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import JoinEvent from "./pages/joinevent.jsx";
import SignupVolunteer from "./pages/signupvolunteer.jsx";
import SignupNgo from "./pages/signupngo.jsx";
import UserProfile from "./pages/userprofile.jsx";
import Contact from "./pages/contact.jsx";
import About from "./pages/about.jsx";
import Guidelines from "./pages/guidelines.jsx";
import NgoProfile from "./pages/ngoprofile.jsx";
import NgoDash from "./pages/ngodash.jsx";
import AddEvent from "./pages/addevent.jsx";
import NgoGuide from "./pages/ngoguide.jsx";
import NgoAbout from "./pages/ngoabout.jsx";
import NgoContact from "./pages/ngocontact.jsx";

function App() {
  return (
    <Router>
      <>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/joinevent" element={<JoinEvent />} />
          <Route path="/signupvolunteer" element={<SignupVolunteer />} />
          <Route path="/signupngo" element={<SignupNgo />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/ngoprofile" element={<NgoProfile />} />
          <Route path="/ngodash" element={<NgoDash />} />
          <Route path="/addevent" element={<AddEvent/>} />
          <Route path="/ngoguide" element={<NgoGuide />} />
          <Route path="/ngoabout" element={<NgoAbout />} />
          <Route path="/ngocontact" element={<NgoContact />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;