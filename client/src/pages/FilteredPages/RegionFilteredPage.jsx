import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Grid, useTheme } from "@mui/material";
import { MdLightbulbOutline } from "react-icons/md";
import ExperienceSmall from "../widgets/ExperiencesWidget/ExperienceSmall.jsx";
import { useSelector } from "react-redux";
import NavBar from "@components/NavBar/NavBar.jsx";
import Footer from "@components/Footer/Footer.jsx";
import config from "@config/config.js";
import BreadcrumbBack from "@components/BreadcrumbBack.jsx";
import RegionWeather from "@widgets/Weather/RegionWeather.jsx";
import BgShape from "@components/Shapes/BgShape.jsx";
const RegionFilteredPage = () => {
  const theme = useTheme();
  const [experiences, setExperiences] = useState([]);
  const [regionName, setRegionName] = useState("");
  const [regionImage, setRegionImage] = useState("");
  const [funFact, setRegionFunFact] = useState("");
  const [regionDescriptionLong, setRegionDescriptionLong] = useState("");
  const [regionCoordinates, setRegionCoordinates] = useState(null);
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
        setRegionImage(regionData.image);
        setRegionDescriptionLong(regionData.descriptionLong);
        setRegionFunFact(regionData.funFact);
        setRegionCoordinates({
          latitude: regionData.latitude,
          longitude: regionData.longitude,
        });
      } catch (error) {
        console.error("Error al obtener los datos:", error.message);
        setError(error.message);
      }
    };

    fetchExperiencesAndRegion(regionId);
  }, [regionId, token]);

  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box id="body">
      <NavBar />
      <BreadcrumbBack />
      <Box
        className="h-screen md:h-[40vh]"
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          padding: "2rem",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `linear-gradient(to bottom, rgba(0, 0, 20, 0.9), rgba(0, 0, 40, 0.6))
, url(${config.API_URL}/assets/${regionImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "opacity 1s ease-in-out",
          }}
        />

        <Typography
          variant="h1"
          sx={{ fontWeight: "bold", zIndex: 2 }}
          gutterBottom
        >
          {regionName}
        </Typography>
        <Typography sx={{ zIndex: 2 }}> {regionDescriptionLong}</Typography>
      </Box>
      <BgShape />
      <Box sx={{ marginBottom: 2, padding: "0rem 2rem" }}>
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "80%",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.secondary.medium,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                fontSize: "1.5rem",
              }}
            >
              <span
                style={{
                  fontSize: "2rem",
                }}
              >
                {" "}
                <MdLightbulbOutline />{" "}
              </span>
              Dato Curioso
            </Typography>
            <Typography>{funFact}</Typography>
          </Box>
          {regionCoordinates && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <RegionWeather
                latitude={regionCoordinates.latitude}
                longitude={regionCoordinates.longitude}
                regionName={regionName}
              />
            </Box>
          )}
        </Box>

        {experiences.length === 0 ? (
          <Typography variant="h6" color="text.secondary">
            No hay experiencias para esta región.
          </Typography>
        ) : (
          <Box>
            <Typography variant="h6">Experiencias para esta región</Typography>
            <Grid container spacing={2}>
              {experiences.map((experience) => (
                <Grid item key={experience._id} xs={12} sm={6} md={4}>
                  <ExperienceSmall
                    {...experience}
                    experienceId={experience._id}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>

      <Footer />
    </Box>
  );
};

export default RegionFilteredPage;
