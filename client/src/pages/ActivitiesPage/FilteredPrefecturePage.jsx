import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Typography, Box, Grid, Breadcrumbs, Link } from "@mui/material";
import ActivitySmall from "../widgets/ActivitySmall.jsx";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const FilteredPrefecturePage = () => {
  const [activities, setActivities] = useState([]);
  const [prefectureName, setPrefectureName] = useState(""); // State for prefecture name
  const [error, setError] = useState(null);
  const { prefectureId } = useParams();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchActivitiesAndPrefecture = async () => {
      try {
        const activitiesResponse = await fetch(
          `http://localhost:3333/activities/filtered-prefecture/${prefectureId}`,
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
          `http://localhost:3333/prefectures/${prefectureId}`
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

  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box>
      <NavBar />
      <Box sx={{ marginBottom: 2, marginTop: 3, marginLeft: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/home" underline="hover">
            Home
          </Link>
          <Typography color="text.primary">{prefectureName}</Typography>
        </Breadcrumbs>
      </Box>
      <Typography variant="h1" gutterBottom>
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
              <ActivitySmall {...activity} />
            </Grid>
          ))}
        </Grid>
      )}
      <Footer />
    </Box>
  );
};

export default FilteredPrefecturePage;
