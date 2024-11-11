import { useState } from "react";
import PropTypes from "prop-types";
import {
  FavoriteBorderOutlined,
  EditOutlined,
  DeleteOutlined,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import {
  IconButton,
  useTheme,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import config from "@config/config.js";
import "@css/Universal.css";
import { saveOrUnsaveExperience } from "@services/services.js"; // Updated function
import FlexBetween from "@components/FlexBetween.jsx";

const ExperienceSmall = ({
  experienceId, // Changed from activityId
  name, // Changed from activityName
  image,
  price,
  isSaved,
  onDelete,
  onRemoveFromFavorites,
}) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const loggedInUserId = useSelector((state) => state.user._id);
  const role = useSelector((state) => state.user.role);
  const token = useSelector((state) => state.token);

  const handleEdit = () => {
    navigate(`/edit-experience/${experienceId}`); // Updated URL path
  };

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDelete = async () => {
    try {
      if (onDelete) {
        await onDelete(experienceId); // Changed from activityId
      }

      setSnackbarMessage("¡Experiencia eliminada con éxito!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to delete experience:", error.message);
      setSnackbarMessage(
        "Error al eliminar la experiencia. Por favor, inténtelo de nuevo."
      );
      setSnackbarSeverity("error");
    } finally {
      handleCloseDeleteModal();
    }
  };

  const handleViewDetails = () => navigate(`/experiences/${experienceId}`); // Updated URL path

  const handleFavoriteToggle = async () => {
    try {
      await saveOrUnsaveExperience(
        loggedInUserId,
        experienceId,
        isSaved,
        token
      ); // Updated function name

      if (isSaved && onRemoveFromFavorites) {
        onRemoveFromFavorites(experienceId); // Changed from activityId
      }

      setSnackbarMessage(
        isSaved
          ? "¡Experiencia eliminada de tus favoritos!"
          : "¡Experiencia añadida a tus favoritos!"
      );
      setSnackbarSeverity(isSaved ? "info" : "success");
    } catch (error) {
      console.error("Error updating favorite experiences:", error.message);
      setSnackbarMessage(
        "Error al actualizar la experiencia. Por favor, inténtelo de nuevo."
      );
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: palette.primary.white,
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
      }}
    >
      {/* Heart Icon at the top right */}
      <IconButton
        onClick={handleFavoriteToggle}
        sx={{
          position: "absolute",
          top: "0px",
          right: "0px",
          width: "4rem",
          height: "4rem",
          borderRadius: "10px 0px 10px 10px",
          backgroundColor: palette.primary.main,
          zIndex: 1,
          "&:hover": {
            backgroundColor: "#f0f0f0",
            color: palette.primary.main,
          },
        }}
      >
        {isSaved ? (
          <FavoriteIcon
            sx={{
              color: palette.primary.white,
              fontSize: "2rem", // Increased size
            }}
          />
        ) : (
          <FavoriteBorderOutlined
            sx={{
              color: palette.primary.white,
              fontSize: "2rem", // Increased size
              "&:hover": {
                color: palette.primary.main,
              },
            }}
          />
        )}
      </IconButton>

      {/* Image */}
      <Box sx={{ width: "100%", height: "200px", overflow: "hidden" }}>
        <img
          src={`${config.API_URL}/assets/${image}`}
          alt={name} // Changed from activityName
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
      <div
        className="shape"
        style={{ background: palette.primary.white }}
      ></div>
      {/* White Box with Title */}
      <Box
        sx={{
          padding: "16px",
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: palette.primary.main }}
        >
          {name} {/* Changed from activityName */}
        </Typography>

        <Typography sx={{ marginTop: "8px", color: palette.text.secondary }}>
          {price} $
        </Typography>
        <Button
          variant="contained"
          className="button-detail"
          onClick={handleViewDetails}
        >
          Ver Detalles
        </Button>
        {/* Admin Buttons */}
        {role === "admin" && (
          <FlexBetween>
            <IconButton onClick={handleEdit}>
              <EditOutlined sx={{ fontSize: "2rem" }} /> {/* Increased size */}
            </IconButton>
            <IconButton onClick={handleOpenDeleteModal}>
              <DeleteOutlined sx={{ fontSize: "2rem" }} />{" "}
              {/* Increased size */}
            </IconButton>
          </FlexBetween>
        )}
      </Box>

      {/* Delete Modal */}
      <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar esta experiencia? Esta acción
            no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
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
    </Box>
  );
};

ExperienceSmall.propTypes = {
  experienceId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  isSaved: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired,
};

export default ExperienceSmall;