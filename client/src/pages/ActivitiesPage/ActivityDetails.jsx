import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  CircularProgress,
  Box,
  IconButton,
  useTheme,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./ActivityDetail.css";
import config from "../../config.js";

const ActivityDetails = () => {
  const { palette } = useTheme();
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

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

      <Box className="activity-header" sx={{ mb: 4 }}>
        <img
          src={`${config.API_URL}/assets/${activity.coverPath}`}
          alt={activity.activityName}
          className="cover-image"
        />

        <Box
          className="breadcrumbs-container"
          sx={{
            backgroundColor: palette.primary.main,
          }}
        >
          <IconButton
            sx={{ color: palette.primary.white }}
            onClick={() => navigate(-1)}
            aria-label="go back"
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>

        <Typography
          variant="h1"
          color="primary"
          className="activity-title"
          sx={{ mt: 2, fontWeight: "bold", color: palette.primary.black }}
        >
          {activity.activityName}
        </Typography>
      </Box>
      <Box className="activity-body">
        <Typography
          className="activity-description"
          sx={{ mb: 3 }}
          style={{ color: palette.primary.dark }}
        >
          {activity.description}
        </Typography>

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

        {/* Prefectura */}
        <Typography className="activity-location" sx={{ mb: 1 }}>
          <strong>Prefectura:</strong>{" "}
          <Typography component="span" style={{ color: palette.primary.black }}>
            {activity.prefecture ? activity.prefecture.name : "Cargando..."}
          </Typography>
        </Typography>

        {/* Presupuesto */}
        <Typography className="activity-location" sx={{ mb: 3 }}>
          <strong>Presupuesto:</strong>{" "}
          <Box
            component="span"
            sx={{
              display: "inline-block",
              padding: "0.25em 0.5em",
              color: "#305D7F",
              borderRadius: "12px",
              backgroundColor: "#CBE3EB",
              fontWeight: "bold",
            }}
          >
            {activity.budget ? activity.budget.name : "Cargando..."}{" "}
            {activity.budget ? activity.budget.abbreviation : "Cargando..."}
          </Box>
        </Typography>

        {/* Ciudad */}
        <Typography className="activity-location" sx={{ mb: 3 }}>
          <strong>Ciudad:</strong> {activity.city.join(", ")}
        </Typography>

        {/* Precio y Rango de Precio */}
        <Typography className="activity-location" sx={{ mb: 3 }}>
          <strong>Precio:</strong> ${activity.price}
        </Typography>
        <Typography className="activity-location" sx={{ mb: 3 }}>
          <strong>Rango de Precio:</strong> ${activity.range_price.min} - $
          {activity.range_price.max}
        </Typography>

        {/* Horarios */}
        <Typography className="activity-location" sx={{ mb: 3 }}>
          <strong>Hora de Apertura:</strong> {activity.opening_time}
        </Typography>
        <Typography className="activity-location" sx={{ mb: 3 }}>
          <strong>Hora de Cierre:</strong> {activity.closing_time}
        </Typography>

        {/* Contacto y Sitio Web */}
        <Typography className="activity-location" sx={{ mb: 3 }}>
          <strong>Contacto:</strong> {activity.contact}
        </Typography>
        <Typography className="activity-location" sx={{ mb: 3 }}>
          <strong>Sitio Web:</strong>{" "}
          <a href={activity.website} target="_blank" rel="noopener noreferrer">
            {activity.website}
          </a>
        </Typography>

        {/* Ubicación */}
        <Typography className="activity-location" sx={{ mb: 3 }}>
          <strong>Coordenadas de Ubicación:</strong>{" "}
          {activity.location.coordinates.join(", ")}
        </Typography>

        {/* Disponibilidad */}
        <Typography className="activity-location" sx={{ mb: 3 }}>
          <strong>Disponible todo el año:</strong>{" "}
          {activity.availability.all_year ? "Sí" : "No"}
        </Typography>
        <Typography className="activity-location" sx={{ mb: 3 }}>
          <strong>Mejor Temporada:</strong>{" "}
          {activity.availability.best_season.join(", ")}
        </Typography>

        {/* Imágenes */}
        <Box className="activity-images" sx={{ mb: 3 }}>
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
      <Footer />
    </Box>
  );
};

export default ActivityDetails;
