import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Typography, CircularProgress, Alert } from "@mui/material";
import ActivitySmall from "./ActivitySmall.jsx";

const FavoriteActivities = () => {
  const [favoriteActivities, setFavoriteActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchFavoriteActivities = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:3333/users/${userId}/activities`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response from server:", errorText);
          throw new Error("Failed to fetch favorite activities");
        }

        const data = await response.json();
        setFavoriteActivities(data);
      } catch (error) {
        setError(error.message);
        console.error("Failed to fetch favorite activities", error);
      } finally {
        setLoading(false);
      }
    };

    if (token && userId) {
      fetchFavoriteActivities();
    }
  }, [userId, token]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        My Favorite Activities
      </Typography>
      <Grid container spacing={2}>
        {favoriteActivities.length ? (
          favoriteActivities.map((activity) => (
            <Grid item xs={12} sm={6} md={4} key={activity._id}>
              <ActivitySmall
                activityId={activity._id}
                activityName={activity.activityName}
                description={activity.description}
                coverPath={activity.coverPath}
                categories={activity.categories}
                prefecture={activity.prefecture}
                budget={activity.budget}
                saves={activity.saves}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No favorite activities found.</Typography>
        )}
      </Grid>
    </div>
  );
};

export default FavoriteActivities;
