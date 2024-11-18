import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminNav from "./components/AdminNav.jsx";
import { Box, Typography, CircularProgress } from "@mui/material";

const AdminLayout = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.user.role);
  const userId = useSelector((state) => state.user._id);
  const [loading, setLoading] = useState(true);
  const picturePath = useSelector((state) => state.user.picturePath);

  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [role, navigate]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <AdminNav userId={userId} picturePath={picturePath} />
      <Box sx={{ padding: 3 }}>
        {role !== "admin" ? (
          <Typography variant="h6" color="error" align="center">
            Only authorized users can access this page.
          </Typography>
        ) : (
          <Typography variant="h4"></Typography>
        )}
      </Box>
    </div>
  );
};

export default AdminLayout;
