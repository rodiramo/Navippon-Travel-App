import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  ShareOutlined,
  EditOutlined,
  ThumbUpOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import {
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween.jsx";
import WidgetWrapper from "../../components/Wrapper.jsx";
import { useSelector } from "react-redux";

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
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const role = useSelector((state) => state.user.role);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await fetch("http://localhost:3333/categories");
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

    if (categories && categories.length) {
      fetchCategoryDetails();
    }
  }, [categories]);

  const handleEdit = () => {
    navigate(`/edit-activity/${activityId}`);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3333/activities/${activityId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the activity");
      }

      if (onDelete) onDelete(activityId);

      setOpenDeleteModal(false);
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleViewDetails = () => navigate(`/activities/${activityId}`);

  return (
    <WidgetWrapper m="2rem 0">
      <img
        src={`http://localhost:3333/assets/${coverPath}`}
        alt={activityName}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "0.75rem",
          marginTop: "0.75rem",
        }}
      />
      <Typography variant="h4" color="primary" mt="1rem">
        {activityName}
      </Typography>
      <Typography color="text.secondary" mt="0.5rem">
        {description}
      </Typography>
      <Typography color="text.secondary" mt="0.5rem">
        Categories:{" "}
        {categoryDetails.length
          ? categoryDetails.map((category) => category.category).join(", ")
          : "No categories"}
      </Typography>
      <Typography color="text.secondary" mt="0.5rem">
        Prefecture:{" "}
        {prefecture && prefecture.name ? prefecture.name : "Loading..."}
      </Typography>
      <Typography color="text.secondary" mt="0.5rem">
        Budget:{" "}
        {budget && budget.abbreviation ? budget.abbreviation : "Loading..."}
      </Typography>

      <FlexBetween mt="0.5rem">
        <FlexBetween gap="1rem">
          <IconButton>
            <ThumbUpOutlined />
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

          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        <Button variant="contained" color="primary" onClick={handleViewDetails}>
          View Details
        </Button>
      </FlexBetween>

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
