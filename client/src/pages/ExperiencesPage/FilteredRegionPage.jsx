import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Grid } from "@mui/material";
import ExperienceSmall from "../widgets/ExperiencesWidget/ExperienceSmall.jsx";
import { useSelector } from "react-redux";
import NavBar from "@components/NavBar/NavBar.jsx";
import Footer from "@components/Footer/Footer.jsx";
import config from "@config/config.js";
import BreadcrumbBack from "@components/BreadcrumbBack.jsx";

const FilteredRegionPage = () => {
  const [experiences, setExperiences] = useState([]);
  const [regionName, setRegionName] = useState("");
  const [error, setError] = useState(null);
  const { regionId } = useParams();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchExperiencesAndRegion = async () => {
      try {
        const experiencesResponse = await fetch(
          `${config.API_URL}/experiences/filtered-region/${regionId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!experiencesResponse.ok) {
          const errorData = await experiencesResponse.json();
          throw new Error(
            errorData.error || "Error al obtener las experiencias"
          );
        }

        const experiencesText = await experiencesResponse.text();
        const experiencesData = experiencesText
          ? JSON.parse(experiencesText)
          : [];
        setExperiences(experiencesData);

        const regionResponse = await fetch(
          `${config.API_URL}/regions/${regionId}`
        );

        if (!regionResponse.ok) {
          const errorData = await regionResponse.json();
          throw new Error(errorData.error || "Error al obtener la región");
        }

        const regionData = await regionResponse.json();
        setRegionName(regionData.region);
      } catch (error) {
        console.error("Error al obtener los datos:", error.message);
        setError(error.message);
      }
    };

    fetchExperiencesAndRegion(regionId);
  }, [regionId, token]);

  const handleDelete = async (experienceId) => {
    try {
      const response = await fetch(
        `${config.API_URL}/experiences/${experienceId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error al eliminar la experiencia"
        );
      }

      setExperiences((prevActivities) =>
        prevActivities.filter((experience) => experience._id !== experienceId)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box id="body">
      <NavBar />
      <BreadcrumbBack />
      <Box sx={{ marginBottom: 2, paddingTop: 15, marginLeft: 2 }}>
        <Typography variant="h1" gutterBottom sx={{ textAlign: "center" }}>
          Actividades en la región de {regionName}
        </Typography>
        {experiences.length === 0 ? (
          <Typography variant="h6" color="text.secondary">
            No hay experiencias para esta región.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {experiences.map((experience) => (
              <Grid item key={experience._id} xs={12} sm={6} md={4}>
                <ExperienceSmall
                  {...experience}
                  experienceId={experience._id}
                  onDelete={handleDelete}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Footer />
    </Box>
  );
};

export default FilteredRegionPage;
