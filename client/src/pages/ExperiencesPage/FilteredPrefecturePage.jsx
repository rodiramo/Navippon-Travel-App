import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Grid } from "@mui/material";
import ExperienceSmall from "../widgets/ExperiencesWidget/ExperienceSmall.jsx";
import { useSelector } from "react-redux";
import NavBar from "@components/NavBar/NavBar.jsx";
import Footer from "@components/Footer/Footer.jsx";
import config from "@config/config.js";
import BreadcrumbBack from "@components/BreadcrumbBack.jsx";

const FilteredPrefecturePage = () => {
  const [experiences, setExperiences] = useState([]);
  const [prefectureName, setPrefectureName] = useState("");
  const [error, setError] = useState(null);
  const { prefectureId } = useParams();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchExperiencesAndPrefecture = async () => {
      try {
        const experiencesResponse = await fetch(
          `${config.API_URL}/experiences/filtered-prefecture/${prefectureId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!experiencesResponse.ok) {
          const errorData = await experiencesResponse.json();
          throw new Error(errorData.error || "Failed to fetch experiences");
        }

        const experiencesText = await experiencesResponse.text();
        const experiencesData = experiencesText
          ? JSON.parse(experiencesText)
          : [];
        setExperiences(experiencesData);

        const prefectureResponse = await fetch(
          `${config.API_URL}/prefectures/${prefectureId}`
        );

        if (!prefectureResponse.ok) {
          const errorData = await prefectureResponse.json();
          throw new Error(errorData.error || "Failed to fetch prefecture");
        }

        const prefectureData = await prefectureResponse.json();
        setPrefectureName(prefectureData.name);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
      }
    };

    fetchExperiencesAndPrefecture(prefectureId);
  }, [prefectureId, token]);

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
        throw new Error(errorData.message || "Failed to delete experience");
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <BreadcrumbBack />
      <Box sx={{ marginBottom: 2, paddingTop: 15, marginLeft: 2 }}>
        <Typography variant="h1" gutterBottom sx={{ textAlign: "center" }}>
          Activities in {prefectureName}
        </Typography>
        {experiences.length === 0 ? (
          <Typography variant="h6" color="text.secondary">
            No experience for this prefecture.
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

export default FilteredPrefecturePage;
