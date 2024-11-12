import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Grid, CircularProgress } from "@mui/material";
import BreadcrumbBack from "@components/BreadcrumbBack.jsx";
import { useSelector } from "react-redux";
import ExperienceSmall from "../widgets/ExperiencesWidget/ExperienceSmall.jsx";
import NavBar from "@components/NavBar/NavBar.jsx";
import Footer from "@components/Footer/Footer.jsx";
import config from "@config/config.js";

const FilteredCategoriesPage = () => {
  const [experiences, setExperiences] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { categoryName } = useParams();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchFilteredExperiences = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${config.API_URL}/experiences/filtered-category/${categoryName}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Error al obtener las experiencias"
          );
        }

        const data = await response.json();
        setExperiences(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredExperiences();
  }, [categoryName, token]);

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

      setExperiences((prevExperiences) =>
        prevExperiences.filter((experience) => experience._id !== experienceId)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box id="body">
      <NavBar />
      <Box>
        <BreadcrumbBack />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: 2,
            paddingTop: 15,
          }}
        >
          <Typography variant="h1" gutterBottom>
            Experiencias en {categoryName}
          </Typography>
          {experiences.length === 0 ? (
            <Typography variant="h6" color="text.secondary">
              No hay experiencias para esta categoría.
            </Typography>
          ) : (
            <Grid container spacing={2} justifyContent="center">
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
      </Box>
      <Footer />
    </Box>
  );
};

export default FilteredCategoriesPage;
