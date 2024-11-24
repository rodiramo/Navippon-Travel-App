import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Grid,
  Typography,
  CircularProgress,
  Alert,
  useTheme,
} from "@mui/material";
import ExperienceSmall from "./ExperienceSmall.jsx";
import { setExperiences } from "@state/state.js";
import {
  fetchPrefectures,
  fetchBudgets,
  fetchFavoriteExperiences,
  deleteExperience,
} from "@services/services.js";

const Favorites = () => {
  const theme = useTheme();
  const primaryMain = theme.palette.primary.main;
  const [favoriteExperiences, setFavoriteExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch prefectures and budgets concurrently
        const [prefectures, budgets] = await Promise.all([
          fetchPrefectures(),
          fetchBudgets(),
        ]);

        // Fetch favorite experiences
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

  const handleRemoveFromFavorites = (experienceId) => {
    setFavoriteExperiences((prevExperiences) =>
      prevExperiences.filter((experience) => experience._id !== experienceId)
    );
  };

  const handleDelete = async (experienceId) => {
    try {
      await deleteExperience(experienceId, token);

      setFavoriteExperiences((prevExperiences) =>
        prevExperiences.filter((experience) => experience._id !== experienceId)
      );

      dispatch(
        setExperiences(
          favoriteExperiences.filter(
            (experience) => experience._id !== experienceId
          )
        )
      );
    } catch (err) {
      setError(err.message);
      console.error("Failed to delete experience:", err);
    }
  };

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
                isSaved={experience.isSaved}
                experienceId={experience._id}
                onDelete={() => handleDelete(experience._id)}
                onRemoveFromFavorites={handleRemoveFromFavorites}
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
