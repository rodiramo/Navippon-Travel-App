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
  const [prefectureMap, setPrefectureMap] = useState({});
  const [budgetMap, setBudgetMap] = useState({});

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
