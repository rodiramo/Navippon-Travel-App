import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  CircularProgress,
  Box,
  Tabs,
  Tab,
  IconButton,
  Button,
  useTheme,
} from "@mui/material";
import BreadcrumbBack from "@components/BreadcrumbBack.jsx";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NavBar from "@components/NavBar/NavBar.jsx";
import Footer from "@components/Footer/Footer.jsx";
import "@css/Items/ActivityDetail.css";
import config from "@config/config.js";

const ActivityDetails = () => {
  const { palette } = useTheme();
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [activity, setActivity] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const token = useSelector((state) => state.token);
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(`${config.API_URL}/activities/${id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("No se pudo obtener los datos de la actividad");
        }

        const data = await response.json();
        console.log("Fetched Activity Data:", data);
        setActivity(data);
        fetchCategoryDetails(data.categories);
      } catch (error) {
        console.error("Error al obtener la actividad:", error.message);
      }
    };

    const fetchCategoryDetails = async (categoryNames) => {
      try {
        const response = await fetch(`${config.API_URL}/categories`);
        if (!response.ok) throw new Error("No se pudo obtener las categorías");
        const data = await response.json();

        const categoryMap = data.reduce((acc, category) => {
          acc[category.category] = category;
          return acc;
        }, {});

        const details = categoryNames.map(
          (name) =>
            categoryMap[name] || { category: name, icon: "defaultIcon.png" }
        );

        console.log("Detalles de Categorías:", details);
        setCategoryDetails(details);
      } catch (error) {
        console.error("No se pudo obtener las categorías", error);
      }
    };

    fetchActivity();
  }, [id, token]);

  if (!activity) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <NavBar />
      <Box sx={{ paddingTop: "5rem" }}>
        <Box className="activity-header" sx={{ mb: 4 }}>
          <img
            src={`${config.API_URL}/assets/${activity.coverPath}`}
            alt={activity.activityName}
            className="cover-image"
          />

          <BreadcrumbBack />
          <Typography
            variant="h1"
            color="primary"
            className="activity-title"
            sx={{ mt: 2, fontWeight: "bold", color: palette.primary.black }}
          >
            {activity.activityName}
          </Typography>
          <IconButton
            sx={{ color: palette.primary.white }}
            aria-label="favorite"
          >
            <FavoriteIcon />
          </IconButton>
          <Button
            variant="contained"
            sx={{ borderRadius: "20px", marginLeft: "1rem" }}
            startIcon={<AddCircleIcon />}
            onClick={() => console.log("Add to Trip")}
          >
            Añadir a Viaje
          </Button>
        </Box>
        <Box
          className="activity-body"
          sx={{ width: "100%", bgcolor: "background.paper" }}
        >
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            variant="fullWidth"
            aria-label="activity details and reviews"
          >
            <Tab label="Descripción" />
            <Tab label="Reseñas" />
          </Tabs>
          <Box sx={{ p: 2, bgcolor: "white", borderRadius: "8px" }}>
            {tabValue === 0 && (
              <Box display="flex">
                <Box flex={2} sx={{ pr: 2 }}>
                  <Typography sx={{ mb: 3, color: palette.primary.dark }}>
                    {activity.description}
                  </Typography>
                  {/* Display additional activity details here */}
                  <Typography sx={{ mb: 1 }}>
                    <strong>Prefectura:</strong>{" "}
                    {activity.prefecture
                      ? activity.prefecture.name
                      : "Cargando..."}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Presupuesto:</strong>{" "}
                    {activity.budget ? activity.budget.name : "Cargando..."}{" "}
                    {activity.budget
                      ? activity.budget.abbreviation
                      : "Cargando..."}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Ciudad:</strong> {activity.city.join(", ")}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Precio:</strong> ${activity.price}
                  </Typography>{" "}
                  {/* Categorías */}
                  <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="center"
                    sx={{ mb: 3 }}
                  >
                    {categoryDetails.length
                      ? categoryDetails.map((category) => (
                          <Typography
                            key={category.category}
                            variant="body2"
                            sx={{
                              mx: 1,
                              fontWeight: "bold",
                              color: "#FF4081",
                              padding: 1,
                              borderRadius: 20,
                              backgroundColor: "#FFE4E7",
                            }}
                          >
                            {category.category}
                          </Typography>
                        ))
                      : "Sin categorías"}
                  </Box>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Rango de Precio:</strong> $
                    {activity.range_price.min} - ${activity.range_price.max}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Hora de Apertura:</strong> {activity.opening_time}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Hora de Cierre:</strong> {activity.closing_time}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Coordenadas de Ubicación:</strong>{" "}
                    {activity.location.coordinates.join(", ")}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Disponible todo el año:</strong>{" "}
                    {activity.availability.all_year ? "Sí" : "No"}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Mejor Temporada:</strong>{" "}
                    {activity.availability.best_season.join(", ")}
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Imágenes:
                    </Typography>
                    <Box display="flex" gap={2} flexWrap="wrap">
                      {activity.images && activity.images.length ? (
                        activity.images.map((img, index) => (
                          <img
                            key={index}
                            src={`${config.API_URL}/assets/${img}`}
                            alt={`Imagen de la actividad ${index + 1}`}
                            style={{
                              width: "150px",
                              height: "auto",
                              borderRadius: "8px",
                            }}
                          />
                        ))
                      ) : (
                        <Typography>No hay imágenes disponibles</Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
                <Box flex={1}>
                  {/* Contact and Map Column */}
                  <Typography variant="h6">Contacto:</Typography>
                  <Typography>{activity.contact}</Typography>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Ubicación:
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      height: "200px",
                      backgroundColor: "#E0E0E0", // Placeholder for map
                      borderRadius: "8px",
                    }}
                  ></Box>
                </Box>
              </Box>
            )}
            {tabValue === 1 && (
              <Box>
                <Typography variant="h6">Reseñas:</Typography>
                <Typography>No hay reseñas disponibles.</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ActivityDetails;
