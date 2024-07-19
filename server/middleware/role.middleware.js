// Middleware to check user role
export const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
      // Check if the user's role matches the required role
      if (req.user.role !== requiredRole) {
        return res.status(403).json({ message: "Access Denied: You do not have the required role" });
      }
      next();
    };
  };
  