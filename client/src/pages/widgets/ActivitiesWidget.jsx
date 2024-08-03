import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivities } from "../../state/state.js";
import ActivityWidget from "./ActivityWidget.jsx";
import { useNavigate } from "react-router-dom";
import "../ActivitiesPage/Activities.css";
import SuccessMessage from "../../components/SuccessMessage.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";

const ActivitiesWidget = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activities = useSelector((state) => state.activities || []);
  const token = useSelector((state) => state.token);
  const [status, setStatus] = useState({ type: null, message: "" });
  const [showMessage, setShowMessage] = useState(false);

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
      setStatus({
        type: "error",
        message: "Failed to load activities. Please try again later.",
      });
      setShowMessage(true);
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
        setStatus({
          type: "success",
          message: "Activity deleted successfully!",
        });
        setShowMessage(true);
      } else {
        console.error("Failed to delete activity");
        setStatus({
          type: "error",
          message: "Failed to delete activity. Please try again.",
        });
        setShowMessage(true);
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
      setStatus({
        type: "error",
        message: "Error deleting activity. Please try again later.",
      });
      setShowMessage(true);
    }
  };

  const handleEdit = async (activityId) => {
    try {
      navigate(`/edit-activity/${activityId}`);
      setStatus({
        type: "success",
        message: "Navigating to edit activity page.",
      });
      setShowMessage(true);
    } catch (error) {
      console.error("Error editing activity:", error);
      setStatus({
        type: "error",
        message:
          "Error navigating to edit activity page. Please try again later.",
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
          saves={activity.saves}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </>
  );
};

export default ActivitiesWidget;
