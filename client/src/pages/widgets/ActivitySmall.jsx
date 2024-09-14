import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  EditOutlined,
  DeleteOutlined,
  FavoriteBorderOutlined,
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
import FlexBetween from "../../components/FlexBetween.jsx";
import WidgetWrapper from "../../components/Wrapper.jsx";
import { useSelector } from "react-redux";
import "../ActivitiesPage/Activity.css";
import {
  fetchCategoryDetails,
  saveOrUnsaveActivity,
} from "../../services/services.js";
import config from "../../config.js";

const ActivitySmall = ({
  activityId,
  activityName,
  description,
  isSaved = false,
  onRemoveFromFavorites,
  coverPath,
  categories = [],
  prefecture = {},
  budget = {},
  onDelete,
}) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const loggedInUserId = useSelector((state) => state.user._id);
  const role = useSelector((state) => state.user.role);

  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchCategoryDetails();
        const categoryMap = data.reduce((acc, category) => {
          acc[category.category] = category;
          return acc;
        }, {});

        if (Array.isArray(categories)) {
          const details = categories.map(
            (name) => categoryMap[name] || { category: name }
          );
          setCategoryDetails(details);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, [categories]);

  const handleEdit = () => {
    navigate(`/edit-activity/${activityId}`);
  };

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDelete = async () => {
    try {
      if (onDelete) {
        await onDelete(activityId);
      }

      setSnackbarMessage("Activity deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to delete activity:", error.message);
      setSnackbarMessage("Failed to delete activity. Please try again.");
      setSnackbarSeverity("error");
    } finally {
      handleCloseDeleteModal();
    }
  };

  const handleViewDetails = () => navigate(`/activities/${activityId}`);

  const handleFavoriteToggle = async () => {
    try {
      await saveOrUnsaveActivity(loggedInUserId, activityId, isSaved, token);

      if (isSaved && onRemoveFromFavorites) {
        onRemoveFromFavorites(activityId);
      }

      setSnackbarMessage(
        isSaved
          ? "Activity removed from your favorites!"
          : "Activity added to your favorites!"
      );
      setSnackbarSeverity(isSaved ? "info" : "success");
    } catch (error) {
      console.error("Error updating favorite activities:", error.message);
      setSnackbarMessage("Failed to update activity. Please try again.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  return (
    <WidgetWrapper className="container-favorites activity-item activity-item-profile">
      <Box className="">
        <img
          src={`${config.API_URL}/assets/${coverPath}`}
          alt={activityName}
          className="activity-image-profile"
        />
        <div className="activity-details">
          <Typography variant="h4" color="primary" className="activity-title">
            {activityName}{" "}
            <span className="prefecture-badge">
              {prefecture.name || "No prefecture name"}
            </span>
          </Typography>
          <Typography style={{ color: palette.primary.black }}>
            Categories:{" "}
            {categoryDetails.length
              ? categoryDetails.map((category) => category.category).join(", ")
              : "No categories"}
          </Typography>
          <Typography color="text.secondary" className="activity-description">
            {description}
          </Typography>

          <Typography
            style={{ color: palette.primary.black }}
            className="budget-profile"
          >
            {budget.name || "No budget name"}
          </Typography>
          <FlexBetween className="wrap-buttons">
            <Button
              variant="contained"
              className="button-detail"
              onClick={handleViewDetails}
            >
              View Details
            </Button>{" "}
            <IconButton onClick={handleFavoriteToggle}>
              {isSaved ? (
                <Typography
                  style={{
                    color: palette.primary.main,
                    textDecoration: "underline",
                  }}
                >
                  Remove from Favorites
                </Typography>
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
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

        {/* Delete Modal */}
        <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this activity? This action cannot
              be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="secondary">
              Delete
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
    </WidgetWrapper>
  );
};

ActivitySmall.propTypes = {
  activityId: PropTypes.string.isRequired,
  activityName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  coverPath: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string),
  prefecture: PropTypes.shape({
    name: PropTypes.string,
  }),
  budget: PropTypes.shape({
    name: PropTypes.string,
  }),
  isSaved: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired,
};

export default ActivitySmall;
