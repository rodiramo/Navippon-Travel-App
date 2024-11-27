import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ requiredRole }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && requiredRole === "admin" && !isAdmin) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};

PrivateRoute.propTypes = {
  requiredRole: PropTypes.string,
};
export default PrivateRoute;
