import { useState } from "react";
import { Box, Tabs, Tab, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "@components/NavBar/NavBar.jsx";
import Footer from "@components/Footer/Footer.jsx";
import FiltersWidget from "./content/FiltersWidget.jsx";
import ActivitiesWidget from "../widgets/ActivitiesWidget/ActivitiesWidget.jsx";
import HotelsWidget from "../widgets/HotelsWidget/HotelsWidget.jsx";
import RestaurantsWidget from "../widgets/RestaurantsWidget/RestaurantsWidget.jsx";

const ExplorePage = () => {
  const [tabValue, setTabValue] = useState(0);
  const role = useSelector((state) => state.user.role);
  const navigate = useNavigate();

  const handleCreateActivity = () => {
    navigate("/create-activity");
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <NavBar />
      <Box
        className="header"
        sx={{ textAlign: "center", mb: 4, paddingTop: 20 }}
      >
        <h1>Explora todas nuestras Actividades, Hoteles y Restaurantes</h1>
        <p>
          Puedes filtrar para encontrar lo que necesitas, fácil, rápido e ideal
          para hacer tu experiencia como viajero mucho más relajadora.
        </p>
        {role === "admin" && (
          <Button
            variant="contained"
            color="primary"
            className="button-create"
            onClick={handleCreateActivity}
            sx={{ marginBottom: "20px" }}
          >
            Crear Actividad
          </Button>
        )}
      </Box>
      <Box className="content">
        <FiltersWidget />

        {/* Tabs for selecting Activities, Hotels, or Restaurants */}
        <Box sx={{ width: "100%", bgcolor: "background.paper", mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Actividades" />
            <Tab label="Hoteles" />
            <Tab label="Restaurantes" />
          </Tabs>

          <Box>
            {tabValue === 0 && <ActivitiesWidget />}
            {tabValue === 1 && <HotelsWidget />}{" "}
            {tabValue === 2 && <RestaurantsWidget />}{" "}
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ExplorePage;
