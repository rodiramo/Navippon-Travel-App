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
import { LuGlobe2 } from "react-icons/lu";

import { HiOutlineMail } from "react-icons/hi";
import { FaRegMap } from "react-icons/fa";
import { TbPhone } from "react-icons/tb";
import BreadcrumbBack from "@components/BreadcrumbBack.jsx";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NavBar from "@components/NavBar/NavBar.jsx";
import Footer from "@components/Footer/Footer.jsx";
import BgShape from "@components/Shapes/BgShape.jsx";
import "@css/Items/ActivityDetail.css";
import { HiOutlineLocationMarker } from "react-icons/hi";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import config from "@config/config.js";
import ReviewsContainer from "@components/Reviews/ReviewsContainer";

const ExperienceDetails = () => {
  const { palette } = useTheme();
  const [experienceSlug, setExperienceSlug] = useState("");
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [experience, setExperience] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.token);
  useEffect(() => {
    const fetchReviews = async () => {
      if (!experienceSlug) return; // Avoid making the request if experienceSlug is not set

      try {
        // Fetch reviews based on experienceSlug
        const response = await fetch(
          `/api/experiences/${experienceSlug}/reviews`
        );
        const data = await response.json();
        setReviews(data.reviews || []); // Assuming data contains reviews
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, [experienceSlug]); // Fetch reviews when experienceSlug changes

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch(`${config.API_URL}/experiences/${id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("No se pudo obtener los datos de la experiencia");
        }

        const data = await response.json();
        console.log("Fetched Experience Data:", data);
        setExperience(data);
        fetchCategoryDetails(data.categories);
      } catch (error) {
        console.error("Error al obtener la experiencia:", error.message);
        setError("Hubo un error al cargar la experiencia. Intenta más tarde.");
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
        setError("No se pudieron cargar las categorías de la experiencia.");
      }
    };

    fetchExperience();
  }, [id, token]);
  useEffect(() => {
    const fetchReviews = async () => {
      if (!experienceSlug) return; // Avoid making the request if experienceSlug is not set

      try {
        // Fetch reviews based on experienceSlug
        const response = await fetch(
          `/api/experiences/${experienceSlug}/reviews`
        );
        const data = await response.json();
        setReviews(data.reviews || []); // Assuming data contains reviews
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, [experienceSlug]); // Fetch reviews when experienceSlug changes

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h4" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!experience) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  const coordinates = experience.location.coordinates || [null, null];

  const myIcon = L.icon({
    iconUrl: "/assets/location.png",
    iconSize: [40, 40],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });

  return (
    <Box id="body">
      <NavBar />
      <Box sx={{ paddingTop: "5rem" }}>
        <Box className="experience-header" sx={{ mb: 4 }}>
          <img
            src={`${config.API_URL}/assets/${experience.image}`}
            alt={experience.experienceName}
            className="cover-image"
          />

          <BreadcrumbBack />
        </Box>
        <BgShape></BgShape>
        <Box
          className="experience-body"
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            padding: " 0 5rem",
          }}
        >
          {" "}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h1"
              color="primary"
              className="experience-title"
              sx={{
                fontWeight: "bold",
                color: palette.primary.black,
                justifyContent: "space-between",
              }}
            >
              {experience.name}
            </Typography>{" "}
            <div>
              <IconButton
                sx={{
                  background: palette.primary.main,
                  color: palette.primary.white,
                }}
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
            </div>{" "}
          </div>{" "}
          <div style={{ display: "flex", marginBottom: "1.5rem" }}>
            <div
              style={{
                color: palette.primary.main,
                fontSize: "1.5rem",
              }}
            >
              <HiOutlineLocationMarker />{" "}
            </div>
            <Typography sx={{ mb: 1 }}>
              {Array.isArray(experience.city)
                ? experience.city.length > 0
                  ? experience.city.join(", ")
                  : "Ciudad no definida"
                : experience.city && experience.city.trim() !== ""
                ? experience.city
                : "Ciudad no definida"}
              ,{" "}
              {experience.prefecture
                ? experience.prefecture.name
                : "Cargando..."}
              , {experience.region ? experience.region.region : "Cargando..."}
            </Typography>
          </div>
          <div>
            <div
              style={{
                borderTop: `1.5px solid ${palette.secondary.main}`,
                borderLeft: `1.5px solid ${palette.secondary.main}`,
                borderRight: `1.5px solid ${palette.secondary.main}`,
                borderBottom: `1.5px solid ${palette.secondary.main}`,
                borderRadius: " 10px 10px 0 0 ",
              }}
            >
              <Tabs
                sx={{
                  width: "20%",
                }}
                value={tabValue}
                onChange={(e, newValue) => setTabValue(newValue)}
                aria-label="experience details and reviews"
              >
                <Tab label="Descripción" />
                <Tab label="Reseñas" />
              </Tabs>
            </div>
            <Box
              sx={{
                p: 2,
                bgcolor: palette.background.alt,
                borderRadius: "",
              }}
            >
              {tabValue === 0 && (
                <Box display="flex">
                  <Box flex={2} sx={{ pr: 2 }}>
                    <Typography sx={{ mb: 3 }}>
                      {experience.description}
                    </Typography>

                    <Typography sx={{ mb: 1 }}>
                      <strong>Presupuesto:</strong>{" "}
                      {experience.budget
                        ? experience.budget.name
                        : "Cargando..."}{" "}
                      {experience.budget
                        ? experience.budget.abbreviation
                        : "Cargando..."}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                      <strong>Precio:</strong> ${experience.price}
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

                    <Typography sx={{ mb: 1 }}>
                      <strong>Hora de Apertura:</strong>{" "}
                      {experience.opening_time}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                      <strong>Hora de Cierre:</strong> {experience.closing_time}
                    </Typography>

                    <Typography sx={{ mb: 1 }}>
                      <strong>Disponible todo el año:</strong>{" "}
                      {experience.availability.all_year ? "Sí" : "No"}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                      <strong>Mejor Temporada:</strong>{" "}
                      {experience.availability.best_season.join(", ")}
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Imágenes:
                      </Typography>
                      <Box display="flex" gap={2} flexWrap="wrap">
                        {experience.images && experience.images.length ? (
                          experience.images.map((img, index) => (
                            <img
                              key={index}
                              src={`${config.API_URL}/assets/${img}`}
                              alt={`Imagen de la experiencia ${index + 1}`}
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

                  <Box flex={1} className="contacto">
                    <Typography variant="h6">Contacto:</Typography>
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ mr: 1, color: palette.primary.main }}>
                        <FaRegMap />
                      </Box>
                      {experience.address}
                    </Typography>
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ mr: 1, color: palette.primary.main }}>
                        <HiOutlineMail />
                      </Box>
                      {experience.email}
                    </Typography>
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ mr: 1, color: palette.primary.main }}>
                        <TbPhone />
                      </Box>
                      +{experience.phone}
                    </Typography>
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ mr: 1, color: palette.primary.main }}>
                        <LuGlobe2 />
                      </Box>
                      <a
                        href={
                          experience.web.startsWith("http")
                            ? experience.web
                            : `http://${experience.web}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {experience.web}
                      </a>
                    </Typography>

                    <Typography variant="h6" sx={{ mt: 2 }}>
                      Ubicación:
                    </Typography>
                    <Box
                      sx={{
                        width: "100%",
                        height: "150px",
                        borderRadius: "8px",
                      }}
                    >
                      <MapContainer
                        center={coordinates}
                        zoom={13}
                        style={{
                          width: "100%",
                          height: "200px",
                          borderRadius: "8px",
                        }}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={coordinates} icon={myIcon}>
                          <Popup>
                            <strong>{experience.name}</strong>
                          </Popup>
                        </Marker>
                      </MapContainer>
                    </Box>
                  </Box>
                </Box>
              )}
              {tabValue === 1 && (
                <Box>
                  <Typography variant="h3">Reseñas</Typography>
                  <div className="mb-4 p-4">
                    <ReviewsContainer
                      reviews={reviews}
                      experienceSlug={experienceSlug}
                      logginedUserId="userId"
                    />
                  </div>
                </Box>
              )}
            </Box>
          </div>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ExperienceDetails;
