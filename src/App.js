import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// tostify css
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

// pages
import Explore from "./pages/Explore";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";

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
            <Route path="/profile" element={<Profile />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ButtonNavBar />
        </Router>

        <ToastContainer autoClose={3000} pauseOnFocusLoss={false} rtl />
      </div>
    </>
  );
}

export default App;
