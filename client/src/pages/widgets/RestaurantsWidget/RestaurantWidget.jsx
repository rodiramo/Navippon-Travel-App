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
import FlexBetween from "../../../components/FlexBetween.jsx";
import WidgetWrapper from "../../../components/Wrapper.jsx";
import { useSelector } from "react-redux";
import config from "@config/config.js";
import { fetchCategoryDetails } from "../../../services/services.js";
import "@css/Items/ItemsPage.css";

const RestaurantWidget = ({
  restaurantId,
  name,
  description,
  coverPath,
  categories = [],
  prefecture,
  price,
  onSave,
  onDelete,
}) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isSaved, setIsSaved] = useState(false);
  const role = useSelector((state) => state.user.role);

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

  const handleEdit = () => navigate(`/edit-restaurant/${restaurantId}`);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDeleteRestaurant = async () => {
    if (onDelete) {
      await onDelete();
      setSnackbarMessage("¡Restaurant eliminado exitosamente!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      handleCloseDeleteModal();
    }
  };

  const handleSaveRestaurant = async () => {
    if (onSave) {
      await onSave(isSaved);
      setIsSaved(!isSaved);
      setSnackbarMessage(
        isSaved ? "¡Eliminado de favoritos!" : "¡Agregado a favoritos!"
      );
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    }
  };

  const handleViewDetails = () => navigate(`/restaurants/${restaurantId}`);

  return (
    <WidgetWrapper
      mb="2rem"
      className="activity-item"
      style={{ backgroundColor: palette.primary.white }}
    >
      <img
        src={`${config.API_URL}/assets/${coverPath}`}
        alt={name}
        className="activity-image"
        style={{ color: palette.primary.black }}
      />
      <div className="activity-details">
        <Typography variant="h4" color="primary" className="restaurant-title">
          {name}{" "}
          <span className="location-badge">
            {prefecture.name || "Cargando..."}
          </span>
        </Typography>
        <Typography style={{ color: palette.primary.black }}>
          Categorías:{" "}
          {categoryDetails.length
            ? categoryDetails.map((category) => category.category).join(", ")
            : "Sin categorías"}
        </Typography>
        <Typography
          style={{ color: palette.primary.black }}
          className="activity-description"
        >
          {description}
        </Typography>

        <FlexBetween className="wrap-buttons">
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              bgcolor: palette.secondary.dark,
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
      <IconButton
        className="favorite"
        style={{
          backgroundColor: palette.primary.main,
          color: palette.primary.white,
        }}
        onClick={handleSaveRestaurant}
      >
        {isSaved ? (
          <FavoriteOutlined sx={{ color: "#fff" }} />
        ) : (
          <FavoriteBorderOutlined />
        )}
      </IconButton>
      <Typography style={{ color: palette.primary.black }} className="price">
        {`${price} $` || "Cargando..."}
      </Typography>
      <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Está seguro de que desea eliminar este restaurant? Esta acción no
            se puede deshacer.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteRestaurant} color="secondary">
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

RestaurantWidget.propTypes = {
  restaurantId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  coverPath: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string),
  prefecture: PropTypes.shape({
    name: PropTypes.string,
  }),
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RestaurantWidget;
