export const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    console.log('AuthorizeRole Middleware Reached'); // Log this to confirm middleware execution
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ message: "Access Denied: You do not have the required role" });
    }
    
    console.log('User Role:', req.user.role);
    console.log('Required Role:', requiredRole);
    next();
  };
};
