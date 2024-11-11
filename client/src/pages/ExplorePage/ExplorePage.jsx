import { Box, Button } from "@mui/material";
import NavBar from "@components/NavBar/NavBar.jsx";
import Footer from "@components/Footer/Footer.jsx";
import FiltersWidget from "./content/FiltersWidget.jsx";
import Header from "./content/Header.jsx";
import ExperiencesWidget from "../widgets/ExperiencesWidget/ExperiencesWidget.jsx";
import { useState } from "react";

const ExplorePage = () => {
  const [experience, setExperience] = useState("todo");

  const handleButtonClick = (experience) => {
    setExperience(experience);
  };

  return (
    <Box>
      <NavBar />
      <Header />
      <Box className="content">
        <FiltersWidget />

        <Box sx={{ mb: 4 }}>
          <Button
            variant={experience === "todo" ? "contained" : "outlined"}
            onClick={() => handleButtonClick("todo")}
            sx={{ mr: 2 }}
          >
            Todo el contenido
          </Button>
          <Button
            variant={experience === "atractivos" ? "contained" : "outlined"}
            onClick={() => handleButtonClick("atractivos")}
            sx={{ mr: 2 }}
          >
            Atractivos
          </Button>
          <Button
            variant={experience === "hoteles" ? "contained" : "outlined"}
            onClick={() => handleButtonClick("hoteles")}
            sx={{ mr: 2 }}
          >
            Hoteles
          </Button>
          <Button
            variant={experience === "restaurantes" ? "contained" : "outlined"}
            onClick={() => handleButtonClick("restaurantes")}
          >
            Restaurantes
          </Button>
          {/* Content Based on Selected Category */}
          <Box sx={{ my: 4 }}>
            {experience === "todo" && (
              <>
                <ExperiencesWidget experience="Atractivo" />
                <ExperiencesWidget experience="Hotel" />
                <ExperiencesWidget experience="Restaurante" />
              </>
            )}

            {experience === "atractivos" && (
              <>
                <ExperiencesWidget experience="Atractivo" />
              </>
            )}

            {experience === "hoteles" && (
              <>
                <ExperiencesWidget experience="Hotel" />
              </>
            )}

            {experience === "restaurantes" && (
              <>
                <ExperiencesWidget experience="Restaurante" />
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ExplorePage;
