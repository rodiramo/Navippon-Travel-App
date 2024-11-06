import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivities } from "@state/state.js";
import ActivityWidget from "./ActivityWidget.jsx";
import { Skeleton, Typography, Box, Pagination } from "@mui/material";
import {
  fetchActivities,
  saveOrUnsaveActivity,
  deleteActivity,
} from "@services/services.js";
import "@css/Items/ItemsPage.css";

const ActivitiesWidget = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 8;
  const token = useSelector((state) => state.token);
  const activities = useSelector((state) => state.activities);
  const loggedInUserId = useSelector((state) => state.user._id);

  const totalPages = Math.ceil(activities.length / activitiesPerPage);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await fetchActivities(token);
        dispatch(setActivities(data));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadActivities();
  }, [dispatch, token]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Handle saving or unsaving an activity
  const handleSave = async (activityId, isSaved) => {
    try {
      const updatedActivity = await saveOrUnsaveActivity(
        loggedInUserId,
        activityId,
        isSaved,
        token
      );
      dispatch(
        setActivities(
          activities.map((activity) =>
            activity._id === updatedActivity._id
              ? { ...activity, isSaved: !isSaved }
              : activity
          )
        )
      );
    } catch (error) {
      console.error("Error saving/unsaving the activity:", error.message);
    }
  };

  // Handle deleting an activity
  const handleDelete = async (activityId) => {
    try {
      await deleteActivity(activityId, token);
      dispatch(
        setActivities(
          activities.filter((activity) => activity._id !== activityId)
        )
      );
    } catch (error) {
      console.error("Error deleting the activity:", error.message);
    }
  };

  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = activities.slice(
    indexOfFirstActivity,
    indexOfLastActivity
  );

  // Render loading skeletons, error message, or the activities list
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {loading ? (
        // Show skeleton loading UI
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Skeleton variant="text" width={300} height={40} />
          <Skeleton
            variant="rectangular"
            width={350}
            height={200}
            sx={{ marginTop: 2, borderRadius: "8px" }}
          />
        </Box>
      ) : error ? (
        // Show error message if loading fails
        <Typography color="error">Error: {error}</Typography>
      ) : activities.length === 0 ? (
        // Show message if no activities are available
        <Typography variant="h6" color="text.secondary">
          No hay Actividades disponibles
        </Typography>
      ) : (
        <>
          {/* Map over the current activities and render each one */}
          <Box justifyContent="center">
            {currentActivities.map((activity) => (
              <Box key={activity._id}>
                <ActivityWidget
                  {...activity}
                  activityId={activity._id}
                  onSave={(isSaved) => handleSave(activity._id, isSaved)}
                  onDelete={() => handleDelete(activity._id)}
                />
              </Box>
            ))}
          </Box>

          {/* Pagination Controls */}
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            sx={{ marginTop: 2 }}
          />
        </>
      )}
    </Box>
  );
};

export default ActivitiesWidget;
