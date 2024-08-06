import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivities } from "../../state/state.js";
import ActivityWidget from "./ActivityWidget.jsx";
import { useParams } from "react-router-dom";
import "../ActivitiesPage/Activities.css";
import SuccessMessage from "../../components/SuccessMessage.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";

const ActivitiesWidget = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const activities = useSelector((state) => state.activities || []);
  const token = useSelector((state) => state.token);
  const [status, setStatus] = useState({ type: null, message: "" });
  const [showMessage, setShowMessage] = useState(false);
  const [favoritesSet, setFavoritesSet] = useState(new Set());

  // Fetch all activities
  const fetchActivities = async () => {
    try {
      const response = await fetch("http://localhost:3333/activities", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch activities");
      }

      const data = await response.json();
      dispatch(setActivities(data));
    } catch (error) {
      console.error("Error fetching activities:", error.message);
      setStatus({
        type: "error",
        message: "Failed to load activities. Please try again later.",
      });
      setShowMessage(true);
    }
  };

  // Fetch user's favorites
  const fetchFavorites = async () => {
    try {
      const response = await fetch(
        `http://localhost:3333/users/${userId}/favorites`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const favorites = await response.json();
        const favoritesSet = new Set(favorites.map((item) => item._id));
        setFavoritesSet(favoritesSet);
      } else {
        throw new Error("Failed to fetch favorites");
      }
    } catch (error) {
      console.error("Error fetching favorites:", error.message);
    }
  };

  useEffect(() => {
    if (token && userId) {
      fetchActivities();
      fetchFavorites();
    }
  }, [token, userId, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle activity deletion
  const handleDelete = async (activityId) => {
    try {
      const response = await fetch(
        `http://localhost:3333/activities/${activityId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        fetchActivities();
        setStatus({
          type: "success",
          message: "Activity deleted successfully!",
        });
        setShowMessage(true);
      } else {
        throw new Error("Failed to delete activity");
      }
    } catch (error) {
      console.error("Error deleting activity:", error.message);
      setStatus({
        type: "error",
        message: "Failed to delete activity. Please try again.",
      });
      setShowMessage(true);
    }
  };

  // Handle favorite toggle
  const handleFavoriteToggle = async (activityId, isFavorite) => {
    try {
      const method = isFavorite ? "DELETE" : "PATCH";
      const response = await fetch(
        `http://localhost:3333/users/${userId}/favorites/${activityId}`,
        {
          method: method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update favorite activities");
      }

      const updatedFavorites = await response.json();
      setFavoritesSet(new Set(updatedFavorites.map((item) => item._id)));

      setStatus({
        type: "success",
        message: isFavorite
          ? "Activity removed from favorites!"
          : "Activity added to favorites!",
      });
      setShowMessage(true);
    } catch (error) {
      console.error("Error updating favorite activities:", error.message);
      setStatus({
        type: "error",
        message: "Failed to update favorite activities. Please try again.",
      });
      setShowMessage(true);
    }
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <>
      {showMessage && status.type === "success" && (
        <SuccessMessage message={status.message} />
      )}
      {showMessage && status.type === "error" && (
        <ErrorMessage message={status.message} />
      )}

      {activities.map((activity) => (
        <ActivityWidget
          key={activity._id}
          activityId={activity._id}
          activityName={activity.activityName}
          description={activity.description}
          coverPath={activity.coverPath}
          prefecture={activity.prefecture}
          budget={activity.budget}
          categories={activity.categories}
          isFavorite={favoritesSet.has(activity._id)}
          onFavoriteToggle={() =>
            handleFavoriteToggle(activity._id, favoritesSet.has(activity._id))
          }
          onDelete={() => handleDelete(activity._id)}
        />
      ))}
    </>
  );
};

export default ActivitiesWidget;
