import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// pages
import Explore from "./pages/Explore";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";

// components
import ButtonNavBar from "./components/ButtonNavBar";
function App() {
  return (
    <>
      <div className="container mx-auto">
        <Router>
          <Routes>
            <Route path="/" element={<Explore />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/profile" element={<SignIn />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Routes>
          <ButtonNavBar />
        </Router>
      </div>
    </>
  );
}

export default App;
