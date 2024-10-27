import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import NavBar from "@components/NavBar/NavBar.jsx";
import Footer from "@components/Footer/Footer.jsx";
import FiltersWidget from "./content/FiltersWidget.jsx";
import Header from "./content/Header.jsx";
import ActivitiesWidget from "../widgets/ActivitiesWidget/ActivitiesWidget.jsx";
import HotelsWidget from "../widgets/HotelsWidget/HotelsWidget.jsx";
import RestaurantsWidget from "../widgets/RestaurantsWidget/RestaurantsWidget.jsx";

const ExplorePage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <NavBar />
      <Header />
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
