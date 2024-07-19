import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivities } from "../../state/state.js";
import ActivityWidget from "./ActivityWidget.jsx";

const ActivitiesWidget = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities || []);
  const token = useSelector((state) => state.token);

  const fetchActivities = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      dispatch(setActivities(data));
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    const url = `http://localhost:3333/activities`;
    fetchActivities(url);
  }, [token, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEdit = async (activityId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3333/activities/${activityId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        fetchActivities(`http://localhost:3333/activities`);
      } else {
        console.error("Failed to update activity");
      }
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  };

  const handleDelete = async (activityId) => {
    try {
      const response = await fetch(`http://localhost:3333/activities/${activityId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        fetchActivities(`http://localhost:3333/activities`);
      } else {
        console.error("Failed to delete activity");
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  const handleSave = async (activityId, saved) => {
    try {
      const response = await fetch(`http://localhost:3333/activities/${activityId}/save`, {
        method: saved ? "POST" : "DELETE", // Adjust method based on saved state
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchActivities(`http://localhost:3333/activities`);
      } else {
        console.error("Failed to save/unsave activity");
      }
    } catch (error) {
      console.error("Error saving/unsaving activity:", error);
    }
  };

  return (
    <>
      {activities.map(({ _id, activityName, description, coverPath, categories, saves }) => (
        <ActivityWidget
          key={_id}
          activityId={_id}
          activityName={activityName}
          description={description}
          coverPath={coverPath}
          saves={saves}
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSave={handleSave}
        />
      ))}
    </>
  );
};

export default ActivitiesWidget;
