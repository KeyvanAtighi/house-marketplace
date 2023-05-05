import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { HashLoader } from "react-spinners";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <HashLoader />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
