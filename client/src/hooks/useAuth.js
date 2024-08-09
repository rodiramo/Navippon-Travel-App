import { useSelector } from "react-redux";

export const useAuth = () => {
  //!!state.token convierte el valor a booleano, siendo true si tiene un valor y false si vacío.
  const isAuthenticated = useSelector((state) => !!state.token);
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
