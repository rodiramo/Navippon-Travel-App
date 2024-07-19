import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivities } from "../../state/state.js";
import ActivityWidget from "./ActivityWidget.jsx";

const ActivitiesWidget = () => {
 
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities || []);
  const token = useSelector((state) => state.token);
  
  console.log("Received activities:", activities);

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
      dispatch(setActivities(data)); // Assuming setActivities action sets activities in Redux state
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    const url = `http://localhost:3333/activities`; 

    fetchActivities(url);
  }, [token, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

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
        />
      ))}
    </>
  );
};

export default ActivitiesWidget;
