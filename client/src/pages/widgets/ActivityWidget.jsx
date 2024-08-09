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
import config from "../../config.js";
import { fetchCategoryDetails } from "../../services/services.js";

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
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategoryData();
  }, [categories]);

  const handleEdit = () => navigate(`/edit-activity/${activityId}`);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDeleteActivity = async () => {
    if (onDelete) {
      await onDelete();
      setSnackbarMessage("Activity deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      handleCloseDeleteModal();
    }
  };

  const handleSaveActivity = async () => {
    if (onSave) {
      await onSave(isSaved);
      setIsSaved(!isSaved);
      setSnackbarMessage(
        isSaved ? "Removed from favorites!" : "Added to favorites!"
      );
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    }
  };

  const handleViewDetails = () => navigate(`/activities/${activityId}`);

  return (
    <WidgetWrapper
      m="2rem 0"
      className="activity-item"
      style={{ backgroundColor: palette.primary.white }}
    >
      <img
        src={`${config.API_URL}/assets/${coverPath}`}
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
        onClick={handleSaveActivity}
      >
        {isSaved ? (
          <FavoriteOutlined sx={{ color: "#fff" }} />
        ) : (
          <FavoriteBorderOutlined />
        )}
      </IconButton>
      <Typography style={{ color: palette.primary.black }} className="budget">
        {budget?.name || "Loading..."} {budget?.abbreviation || "Loading..."}
      </Typography>
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
          <Button onClick={handleDeleteActivity} color="secondary">
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
    name: PropTypes.string,
    abbreviation: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ActivityWidget;
