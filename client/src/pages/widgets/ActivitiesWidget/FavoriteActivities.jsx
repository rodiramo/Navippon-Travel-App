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
import ActivitySmall from "./ActivitySmall.jsx";
import { setActivities } from "../../../state/state.js";
import config from "@config/config.js";

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
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPrefecturesAndBudgets = async () => {
      try {
        const prefectureResponse = await fetch(`${config.API_URL}/prefectures`);
        if (!prefectureResponse.ok)
          throw new Error("Failed to fetch prefectures");
        const prefectures = await prefectureResponse.json();
        const prefectureMap = prefectures.reduce((acc, prefecture) => {
          acc[prefecture._id] = prefecture.name;
          return acc;
        }, {});
        setPrefectureMap(prefectureMap);

        const budgetResponse = await fetch(`${config.API_URL}/budget`);
        if (!budgetResponse.ok) throw new Error("Failed to fetch budgets");
        const budgets = await budgetResponse.json();
        const budgetMap = budgets.reduce((acc, budget) => {
          acc[budget._id] = budget.name;
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
          `${config.API_URL}/users/${userId}/activities`,
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
        const transformedData = data.map((activity) => ({
          ...activity,
          prefecture: { name: prefectureMap[activity.prefecture] || "Unknown" },
          budget: { name: budgetMap[activity.budget] || "Unknown" },
          isSaved: true,
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

  const handleRemoveFromFavorites = (activityId) => {
    setFavoriteActivities((prevActivities) =>
      prevActivities.filter((activity) => activity._id !== activityId)
    );
  };

  const handleDelete = async (activityId) => {
    try {
      const response = await fetch(
        `${config.API_URL}/activities/${activityId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from server:", errorText);
        throw new Error("Failed to delete activity");
      }

      setFavoriteActivities((prevActivities) =>
        prevActivities.filter((activity) => activity._id !== activityId)
      );

      dispatch(
        setActivities(
          favoriteActivities.filter((activity) => activity._id !== activityId)
        )
      );
    } catch (error) {
      setError(error.message);
      console.error("Failed to delete activity", error);
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
                {...activity}
                isSaved={activity.isSaved}
                activityId={activity._id}
                onDelete={() => handleDelete(activity._id)}
                onRemoveFromFavorites={handleRemoveFromFavorites}
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
