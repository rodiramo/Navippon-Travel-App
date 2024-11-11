import { Box, Typography, Tabs, Tab } from "@mui/material";
import NavBar from "@components/NavBar/NavBar.jsx";
import Footer from "@components/Footer/Footer.jsx";
import FiltersWidget from "./content/FiltersWidget.jsx";
import Header from "./content/Header.jsx";
import ExperiencesWidget from "../widgets/ExperiencesWidget/ExperiencesWidget.jsx";
import { useState } from "react";

const ExplorePage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box>
      <NavBar />
      <Header />
      <Box className="content">
        {/* Search Filters */}
        <FiltersWidget />

        {/* Tabs Navigation */}
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="explore tabs"
        >
          <Tab label="Todo el contenido" />
          <Tab label="Atractivos" />
          <Tab label="Hoteles" />
          <Tab label="Restaurantes" />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ my: 4 }}>
          {tabIndex === 0 && (
            <>
              <Typography variant="h5">Todo el contenido</Typography>
              <ExperiencesWidget experience="Atractivo" />
              <ExperiencesWidget experience="Hotel" />
              <ExperiencesWidget experience="Restaurante" />
            </>
          )}

          {tabIndex === 1 && (
            <>
              <Typography variant="h5">Atractivos</Typography>
              <ExperiencesWidget experience="Atractivo" />
            </>
          )}

          {tabIndex === 2 && (
            <>
              <Typography variant="h5">Hoteles</Typography>
              <ExperiencesWidget experience="Hotel" />
            </>
          )}

          {tabIndex === 3 && (
            <>
              <Typography variant="h5">Restaurantes</Typography>
              <ExperiencesWidget experience="Restaurante" />
            </>
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ExplorePage;
