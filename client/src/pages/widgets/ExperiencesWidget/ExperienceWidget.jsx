import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  EditOutlined,
  FavoriteOutlined,
  DeleteOutlined,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import {
  IconButton,
  useTheme,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Snackbar,
  Alert,
} from "@mui/material";
import { useToast } from "@components/Toast/ToastManager.jsx";
import FlexBetween from "@components/FlexBetween.jsx";
import WidgetWrapper from "@components/Wrapper.jsx";
import { useSelector } from "react-redux";
import config from "@config/config.js";
import { fetchCategoryDetails } from "@services/services.js";
import "@css/Items/ItemsPage.css";
import { addFavorite, isFavoriteExperience } from "@services/index/favorite.js";

const ExperienceWidget = ({
  experienceId,
  name,
  description,
  image,
  categories = [],
  prefecture,
  price,
  type,
}) => {
  const addToast = useToast();
  const token = useSelector((state) => state.token);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const { palette } = useTheme();
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const role = useSelector((state) => state.user.role);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    const fetchInitialFavoriteStatus = async () => {
      try {
        const isFav = await isFavoriteExperience({ token, experienceId });
        console.log("Experience ID passed to widget:", experienceId);
        setIsFavorite(isFav);
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      }
    };

    fetchInitialFavoriteStatus();
  }, [experienceId, token]);

  const handleFavoriteExperience = async () => {
    try {
      const updatedStatus = await addFavorite({ token, experienceId });
      setIsFavorite(updatedStatus);

      updatedStatus
        ? addToast("Experiencia agregada a favoritos!", "success")
        : addToast("La experiencia ha sido eliminada de favoritos", "warning");
    } catch (error) {
      console.error("Error adding to favorites:", error.message);
      updatedStatus
        ? addToast(
            "La experiencia no se ha podido agregar a favoritos!",
            "error"
          )
        : addToast("La experiencia no pudo eliminarse de favoritos!", "error");
    }
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const data = await fetchCategoryDetails();
        const categoryMap = data.reduce((acc, category) => {
          acc[category.category] = category;
          return acc;
        }, {});
        const details = categories.map(
          (name) => categoryMap[name] || { category: name }
        );
        setCategoryDetails(details);
      } catch (error) {
        console.error("No se pudo obtener las categorías", error);
      }
    };

    fetchCategoryData();
  }, [categories]);

  const handleEdit = () => navigate(`/edit-experience/${experienceId}`);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDeleteExperience = async () => {
    if (onDelete) {
      await onDelete();
      addToast("Experiencia ha sido eliminada con exito!", "success");

      handleCloseDeleteModal();
    }
  };

  const handleViewDetails = () => navigate(`/experiences/${experienceId}`);

  return (
    <WidgetWrapper
      mb="2rem"
      className="activity-item"
      style={{
        backgroundColor: palette.primary.white,
        border: `1.75px solid ${palette.secondary.light}`,
      }}
    >
      <img
        src={`${config.API_URL}/assets/${image}`}
        alt={name}
        className="activity-image"
        style={{ color: palette.primary.black }}
      />
      <div className="activity-details">
        <Typography
          variant="h4"
          color="primary"
          style={{ display: "flex", alignItems: "center" }}
        >
          {name}{" "}
          <span
            className="location-badge"
            style={{
              background: palette.primary.light,
              marginLeft: 10,
              fontSize: "1rem",
              padding: "0.5rem",
              borderRadius: "30px",
            }}
          >
            {prefecture?.name || "No prefecture"}
          </span>
        </Typography>
        <Typography style={{ color: palette.secondary.main }}>
          {categoryDetails.length
            ? categoryDetails.map((category) => category.category).join(" | ")
            : "Sin categorías"}
        </Typography>
        <Typography
          style={{ color: palette.primary.black }}
          className="activity-description"
        >
          {truncateText(description, 150)}
        </Typography>

        <FlexBetween className="wrap-buttons">
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              bgcolor: palette.secondary.main,
              mr: 2,
              borderRadius: 20,
            }}
            onClick={handleViewDetails}
          >
            Ver Detalles
          </Button>{" "}
          <Button
            variant="contained"
            className="button-detail"
            sx={{
              textTransform: "none",
            }}
            onClick={handleViewDetails}
          >
            Agregar a Viaje
          </Button>
          {role === "admin" && (
            <>
              <IconButton onClick={handleEdit}>
                <EditOutlined />
              </IconButton>
              <IconButton onClick={handleOpenDeleteModal}>
                <DeleteOutlined />
              </IconButton>
            </>
          )}
        </FlexBetween>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          className="favorite"
          style={{
            backgroundColor: palette.primary.main,
            color: palette.primary.white,
          }}
          onClick={handleFavoriteExperience}
        >
          {isFavorite ? (
            <FavoriteOutlined sx={{ color: "#fff" }} />
          ) : (
            <FavoriteBorderOutlined />
          )}
        </IconButton>
        <Typography
          style={{ color: palette.primary.black, fontWeight: "bold" }}
          className="price"
        >
          {`${price} $` || "Cargando..."}
        </Typography>
      </div>
      <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Está seguro de que desea eliminar esta experiencia? Esta acción no
            se puede deshacer.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteExperience} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            width: "auto",
            maxWidth: "80%",
            margin: "0 auto",
          },
        }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </WidgetWrapper>
  );
};

ExperienceWidget.propTypes = {
  experienceId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string),
  prefecture: PropTypes.shape({
    name: PropTypes.string,
  }),
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  type: PropTypes.string,
};

export default ExperienceWidget;
