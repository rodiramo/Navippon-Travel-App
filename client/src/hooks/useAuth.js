import { useSelector } from "react-redux";

export const useAuth = () => {
  const token = localStorage.getItem("jwt");
  const isAuthenticated = !!token;

  const userRole = useSelector((state) => state.user.role || "");
  const isAdmin = userRole === "admin";

  console.log("User Role:", userRole);
  console.log("Is Admin:", isAdmin);

  return {
    isAuthenticated,
    isAdmin,
  };
};

export default useAuth;
