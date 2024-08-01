import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivities } from "../../state/state.js";
import ActivityWidget from "./ActivityWidget.jsx";
import { useNavigate } from "react-router-dom";

const ActivitiesWidget = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      console.log("Fetched activities:", data);
      dispatch(setActivities(data));
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    const url = `http://localhost:3333/activities`;
    fetchActivities(url);
  }, [token, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

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
        fetchActivities(`http://localhost:3333/activities`);
      } else {
        console.error("Failed to delete activity");
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  const handleEdit = (activityId) => {
    navigate(`/edit-activity/${activityId}`);
  };

  return (
    <>
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
          saves={activity.saves}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </>
  );
};

export default ActivitiesWidget;
