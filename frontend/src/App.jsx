import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import JoinEvent from "./pages/joinevent.jsx";
import SignupVolunteer from "./pages/signupvolunteer.jsx";
import SignupNgo from "./pages/signupngo.jsx";
import UserProfile from "./pages/userprofile.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/joinevent" element={<JoinEvent />} />
        <Route path="/signupvolunteer" element={<SignupVolunteer />} />
        <Route path="/signupngo" element={<SignupNgo />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;

// function App(){
//   return(
//     <>
//     <Navbar />
//     <HomePage />
//     </>
//   )
// }
// export default App;