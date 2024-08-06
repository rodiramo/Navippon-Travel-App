import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivities } from "../../state/state.js";
import ActivityWidget from "./ActivityWidget.jsx";
import { CircularProgress, Typography, Box } from "@mui/material";

const ActivitiesWidget = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.token);
  const activities = useSelector((state) => state.activities);
  const loggedInUserId = useSelector((state) => state.user._id);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("http://localhost:3333/activities", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch activities");
        }

        const data = await response.json();
        dispatch(setActivities(data));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [dispatch, token]);

  const patchSave = async (activityId, isSaved) => {
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
      console.error("Error updating favorite activities:", error.message);
    }
  };

  const handleDelete = async (activityId) => {
    try {
      const response = await fetch(
        `http://localhost:3333/activities/${activityId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to delete activity");
      }

      dispatch(
        setActivities(
          activities.filter((activity) => activity._id !== activityId)
        )
      );
    } catch (error) {
      console.error("Error deleting activity:", error.message);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: 2,
      }}
    >
      {activities.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          No activities available.
        </Typography>
      ) : (
        <Box justifyContent="center">
          {activities.map((activity) => (
            <Box key={activity._id}>
              <ActivityWidget
                {...activity}
                activityId={activity._id}
                onSave={(isSaved) => patchSave(activity._id, isSaved)}
                onDelete={() => handleDelete(activity._id)}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ActivitiesWidget;
