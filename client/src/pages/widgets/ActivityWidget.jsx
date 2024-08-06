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
import { useSelector, useDispatch } from "react-redux";
import { setActivity } from "../../state/state.js";

import "../ActivitiesPage/Activities.css";

const ActivityWidget = ({
  activityId,
  activityName,
  description,
  coverPath,
  categories = [],
  prefecture,
  budget,
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
  const [isSaved, setIsSaved] = useState(false);
  const role = useSelector((state) => state.user.role);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

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

  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const response = await fetch(
          `http://localhost:3333/users/${loggedInUserId}/favorites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok)
          throw new Error("Failed to fetch favorite activities");

        const favorites = await response.json();
        setIsSaved(favorites.includes(activityId));
      } catch (error) {
        console.error("Error fetching favorite activities:", error.message);
      }
    };

    if (loggedInUserId) {
      checkIfSaved();
    }
  }, [loggedInUserId, activityId, token]);

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
    } catch (error) {
      console.error("Failed to delete activity:", error.message);
    }
    handleCloseDeleteModal();
  };

  const handleViewDetails = () => navigate(`/activities/${activityId}`);

  const patchSave = async () => {
    try {
      const method = isSaved ? "DELETE" : "PATCH";
      const response = await fetch(
        `http://localhost:3333/users/${loggedInUserId}/favorites/${activityId}`,
        {
          method: method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to update favorite activities");
      }

      const updatedActivity = await response.json();
      setIsSaved(!isSaved);

      // Update activity details in Redux store
      dispatch(setActivity({ activity: updatedActivity }));

      setSnackbarMessage(
        isSaved
          ? "Activity removed from your profile!"
          : "Activity has been saved to your profile!"
      );
      setSnackbarSeverity(isSaved ? "info" : "success");
    } catch (error) {
      console.error("Error updating favorite activities:", error.message);

      setSnackbarMessage("Failed to save activity. Please try again.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  return (
    <WidgetWrapper
      m="2rem 0"
      className="activity-item"
      style={{ color: palette.primary.white }}
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
            {prefecture && prefecture.name ? prefecture.name : "Loading..."}
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

        <Typography style={{ color: palette.primary.black }} className="budget">
          {budget && budget.abbreviation ? budget.abbreviation : "Loading..."}
        </Typography>
        <FlexBetween className="wrap-buttons">
          <Button
            variant="contained"
            style={{
              color: palette.primary.white,
              backgroundColor: palette.secondary.main,
            }}
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
        onClick={patchSave}
      >
        {isSaved ? (
          <FavoriteOutlined sx={{ color: "#fff" }} />
        ) : (
          <FavoriteBorderOutlined />
        )}
      </IconButton>

      {/* Delete Modal */}
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
  onDelete: PropTypes.func,
};

export default ActivityWidget;
