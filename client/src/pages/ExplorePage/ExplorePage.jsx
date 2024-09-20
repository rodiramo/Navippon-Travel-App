import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import FiltersWidget from "../widgets/FiltersWidget.jsx";
import ActivitiesWidget from "../widgets/ActivitiesWidget/ActivitiesWidget.jsx";
import "../ActivitiesPage/ActivityDetails.jsx";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
const ExplorePage = () => {
  const role = useSelector((state) => state.user.role);
  const navigate = useNavigate();
  const handleCreateActivity = () => {
    navigate("/create-activity");
  };

  return (
    <Box>
      <NavBar />
      <Box className="header">
        <h1>Explora todas nuestras Actividades, Hoteles y Restaurantes</h1>
        <p>
          Puedes filtrar para encontrar lo que necesitas, facíl, rápido e ídeal
          para hacer tu experiencia como viajero mucho más relajadora.
        </p>{" "}
        {role === "admin" && (
          <Button
            variant="contained"
            color="primary"
            className="button-create"
            onClick={handleCreateActivity}
          >
            Crear Actividad
          </Button>
        )}
      </Box>
      <Box className="content">
        <FiltersWidget />

        <ActivitiesWidget />
      </Box>
      <Footer />
    </Box>
  );
};

export default ExplorePage;
