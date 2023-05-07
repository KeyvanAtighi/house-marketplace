import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { HashLoader } from "react-spinners";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return (
      <div className="flex h-screen justify-center items-center">
        <HashLoader color="#36d7b7" />;
      </div>
    );
  }
  return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
