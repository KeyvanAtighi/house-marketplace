import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// tostify css
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

// pages
import Explore from "./pages/Explore";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import Category from "./pages/Category";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";

// components
import ButtonNavBar from "./components/ButtonNavBar";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <>
      <div className="container mx-auto">
        <Router>
          <Routes>
            <Route path="/" element={<Explore />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/category/:categoryName" element={<Category />} />
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
