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
import FlexBetween from "../../components/FlexBetween.jsx";
import WidgetWrapper from "../../components/Wrapper.jsx";
import { useSelector } from "react-redux";
import "../ActivitiesPage/Activities.css";

const ActivityWidget = ({
  activityId,
  activityName,
  description,
  coverPath,
  categories = [],
  prefecture,
  budget,
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
  const role = useSelector((state) => state.user.role); // Get role from Redux

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await fetch("http://localhost:3333/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();

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

    fetchCategoryDetails();
  }, [categories]);

  const handleEdit = () => navigate(`/edit-activity/${activityId}`);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDelete = async () => {
    try {
      if (onDelete) {
        await onDelete(activityId);
        setSnackbarMessage("Activity deleted successfully!");
        setSnackbarSeverity("success");
      }
    } catch (error) {
      console.error("Failed to delete activity:", error.message);
      setSnackbarMessage("Failed to delete activity. Please try again.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
      handleCloseDeleteModal();
    }
  };

  const handleViewDetails = () => navigate(`/activities/${activityId}`);

  const handleSave = async () => {
    try {
      if (onSave) {
        await onSave(isSaved);
        setIsSaved(!isSaved);
        setSnackbarMessage(
          isSaved ? "Removed from favorites!" : "Added to favorites!"
        );
        setSnackbarSeverity("success");
      }
    } catch (error) {
      console.error("Error updating favorite activities:", error.message);
      setSnackbarMessage("Failed to save activity. Please try again.");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };

  return (
    <WidgetWrapper
      m="2rem 0"
      className="activity-item"
      style={{ backgroundColor: palette.primary.white }}
    >
      <img
        src={`http://localhost:3333/assets/${coverPath}`}
        alt={activityName}
        className="activity-image"
        style={{ color: palette.primary.black }}
      />
      <div className="activity-details">
        <Typography variant="h4" color="primary" className="activity-title">
          {activityName}{" "}
          <span className="prefecture-badge">
            {prefecture?.name || "Loading..."}
          </span>
        </Typography>
        <Typography style={{ color: palette.primary.black }}>
          Categories:{" "}
          {categoryDetails.length
            ? categoryDetails.map((category) => category.category).join(", ")
            : "No categories"}
        </Typography>
        <Typography
          style={{ color: palette.primary.black }}
          className="activity-description"
        >
          {description}
        </Typography>
        <Typography style={{ color: palette.primary.black }} className="budget">
          {budget?.abbreviation || "Loading..."}
        </Typography>
        <FlexBetween className="wrap-buttons">
          <Button
            variant="contained"
            className="button-detail"
            onClick={handleViewDetails}
          >
            View Details
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
        onClick={handleSave}
      >
        {isSaved ? (
          <FavoriteOutlined sx={{ color: "#fff" }} />
        ) : (
          <FavoriteBorderOutlined />
        )}
      </IconButton>

      <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this activity? This action cannot be
            undone.
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

ActivityWidget.propTypes = {
  activityId: PropTypes.string.isRequired,
  activityName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  coverPath: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string),
  prefecture: PropTypes.shape({
    name: PropTypes.string,
  }),
  budget: PropTypes.shape({
    abbreviation: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ActivityWidget;
