import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Grid } from "@mui/material";
import ActivitySmall from "../widgets/ActivitiesWidget/ActivitySmall.jsx";
import { useSelector } from "react-redux";
import NavBar from "@components/NavBar/NavBar.jsx";
import Footer from "@components/Footer/Footer.jsx";
import config from "@config/config.js";
import BreadcrumbBack from "@components/BreadcrumbBack.jsx";

const FilteredPrefecturePage = () => {
  const [activities, setActivities] = useState([]);
  const [prefectureName, setPrefectureName] = useState("");
  const [error, setError] = useState(null);
  const { prefectureId } = useParams();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchActivitiesAndPrefecture = async () => {
      try {
        const activitiesResponse = await fetch(
          `${config.API_URL}/activities/filtered-prefecture/${prefectureId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!activitiesResponse.ok) {
          const errorData = await activitiesResponse.json();
          throw new Error(errorData.error || "Failed to fetch activities");
        }

        const activitiesText = await activitiesResponse.text();
        const activitiesData = activitiesText ? JSON.parse(activitiesText) : [];
        setActivities(activitiesData);

        const prefectureResponse = await fetch(
          `${config.API_URL}/prefectures/${prefectureId}`
        );

        if (!prefectureResponse.ok) {
          const errorData = await prefectureResponse.json();
          throw new Error(errorData.error || "Failed to fetch prefecture");
        }

        const prefectureData = await prefectureResponse.json();
        setPrefectureName(prefectureData.name);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
      }
    };

    fetchActivitiesAndPrefecture(prefectureId);
  }, [prefectureId, token]);

  const handleDelete = async (activityId) => {
    try {
      const response = await fetch(
        `${config.API_URL}/activities/${activityId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete activity");
      }

      setActivities((prevActivities) =>
        prevActivities.filter((activity) => activity._id !== activityId)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <BreadcrumbBack />
      <Box sx={{ marginBottom: 2, paddingTop: 15, marginLeft: 2 }}>
        <Typography variant="h1" gutterBottom sx={{ textAlign: "center" }}>
          Activities in {prefectureName}
        </Typography>
        {activities.length === 0 ? (
          <Typography variant="h6" color="text.secondary">
            No activity for this prefecture.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {activities.map((activity) => (
              <Grid item key={activity._id} xs={12} sm={6} md={4}>
                <ActivitySmall
                  {...activity}
                  activityId={activity._id}
                  onDelete={handleDelete}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Footer />
    </Box>
  );
};

export default FilteredPrefecturePage;
