import NavBar from "../../components/NavBar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ActivitiesWidget from "../widgets/ActivitiesWidget.jsx";
import "./Activities.css";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
const ActivitiesPage = () => {
  const role = useSelector((state) => state.user.role);
  const navigate = useNavigate();
  const handleCreateActivity = () => {
    navigate("/create-activity");
  };

  return (
    <Box>
      <NavBar />
      <Box className="header">
        <h1>All Activities around Japan</h1>
        {role === "admin" && (
          <Button
            variant="contained"
            color="primary"
            className="button-create"
            onClick={handleCreateActivity}
          >
            Create Activity
          </Button>
        )}
      </Box>
      <ActivitiesWidget />
      <Footer />
    </Box>
  );
};

export default ActivitiesPage;
