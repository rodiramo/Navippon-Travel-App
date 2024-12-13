import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Grid,
  Typography,
  CircularProgress,
  Alert,
  useTheme,
} from "@mui/material";
import ExperienceSmall from "./ExperienceSmall.jsx";
import {
  fetchPrefectures,
  fetchBudgets,
  fetchFavoriteExperiences,
} from "@services/services.js";

const Favorites = () => {
  const theme = useTheme();
  const primaryMain = theme.palette.primary.main;
  const [favoriteExperiences, setFavoriteExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [prefectures, budgets] = await Promise.all([
          fetchPrefectures(),
          fetchBudgets(),
        ]);

        const experiences = await fetchFavoriteExperiences(
          userId,
          token,
          prefectures,
          budgets
        );

        setFavoriteExperiences(experiences);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token && userId) {
      loadData();
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
        My Favorite Experiences
      </Typography>
      <Grid container spacing={2}>
        {favoriteExperiences.length ? (
          favoriteExperiences.map((experience) => (
            <Grid item key={experience._id}>
              <ExperienceSmall
                {...experience}
                isFavorite={experience.isFavorite}
                experienceId={experience._id}
              />
            </Grid>
          ))
        ) : (
          <Typography
            variant="body1"
            sx={{ marginTop: 2, padding: 2, color: primaryMain }}
          >
            No favorite experiences found.
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default Favorites;
