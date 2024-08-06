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
import ActivitySmall from "./ActivitySmall.jsx";

const FavoriteActivities = () => {
  const theme = useTheme();
  const primaryMain = theme.palette.primary.main;
  const [favoriteActivities, setFavoriteActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const [prefectureMap, setPrefectureMap] = useState({});
  const [budgetMap, setBudgetMap] = useState({});
  const [favoritesSet, setFavoritesSet] = useState(new Set());

  useEffect(() => {
    const fetchPrefecturesAndBudgets = async () => {
      try {
        const prefectureResponse = await fetch(
          "http://localhost:3333/prefectures"
        );
        if (!prefectureResponse.ok)
          throw new Error("Failed to fetch prefectures");
        const prefectures = await prefectureResponse.json();
        const prefectureMap = prefectures.reduce((acc, prefecture) => {
          acc[prefecture._id] = prefecture.name;
          return acc;
        }, {});
        setPrefectureMap(prefectureMap);

        const budgetResponse = await fetch("http://localhost:3333/budget");
        if (!budgetResponse.ok) throw new Error("Failed to fetch budgets");
        const budgets = await budgetResponse.json();
        const budgetMap = budgets.reduce((acc, budget) => {
          acc[budget._id] = budget.abbreviation;
          return acc;
        }, {});
        setBudgetMap(budgetMap);
      } catch (error) {
        console.error("Failed to fetch prefectures or budgets", error);
      }
    };

    fetchPrefecturesAndBudgets();
  }, []);

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
        const favoritesSet = new Set(data.map((activity) => activity._id));
        setFavoritesSet(favoritesSet);

        const transformedData = data.map((activity) => ({
          ...activity,
          prefecture: { name: prefectureMap[activity.prefecture] || "Unknown" },
          budget: { abbreviation: budgetMap[activity.budget] || "Unknown" },
        }));

        setFavoriteActivities(transformedData);
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
  }, [userId, token, prefectureMap, budgetMap]);

  const handleRemoveFromFavorites = async (activityId) => {
    try {
      const response = await fetch(
        `http://localhost:3333/users/${userId}/favorites/${activityId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from server:", errorText);
        throw new Error("Failed to remove from favorites");
      }

      setFavoritesSet((prevSet) => {
        const updatedSet = new Set(prevSet);
        updatedSet.delete(activityId);
        return updatedSet;
      });
    } catch (error) {
      setError(error.message);
      console.error("Failed to remove from favorites", error);
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
        My Favorite Activities
      </Typography>
      <Grid container spacing={2}>
        {favoriteActivities.length ? (
          favoriteActivities.map((activity) => (
            <Grid item key={activity._id}>
              <ActivitySmall
                activityId={activity._id}
                activityName={activity.activityName}
                description={activity.description}
                coverPath={activity.coverPath}
                categories={activity.categories}
                prefecture={activity.prefecture}
                budget={activity.budget}
                isFavorite={favoritesSet.has(activity._id)}
                onDelete={() => handleRemoveFromFavorites(activity._id)}
              />
            </Grid>
          ))
        ) : (
          <Typography
            variant="body1"
            sx={{ marginTop: 2, padding: 2, color: primaryMain }}
          >
            No favorite activities found.
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default FavoriteActivities;
