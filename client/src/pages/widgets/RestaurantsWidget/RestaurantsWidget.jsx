import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurants } from "../../../state/state.js";
import RestaurantWidget from "./RestaurantWidget.jsx";
import { Skeleton, Typography, Box, Pagination } from "@mui/material";
import {
  fetchRestaurants,
  saveOrUnsaveRestaurant,
} from "../../../services/services.js";

const RestaurantsWidget = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 8;
  const token = useSelector((state) => state.token);

  // Ensure restaurants has a default value of an empty array
  const restaurants = useSelector((state) => state.restaurants) || [];
  const loggedInUserId = useSelector((state) => state.user._id);

  // Safe access to length to avoid error
  const totalPages = Math.ceil((restaurants?.length || 0) / restaurantsPerPage);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await fetchRestaurants(token);
        dispatch(setRestaurants(data));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, [dispatch, token]);

  // Handle pagination change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Pagination logic to slice restaurants for the current page
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = restaurants.slice(
    indexOfFirstRestaurant,
    indexOfLastRestaurant
  );

  const handleSave = async (restaurantId, isSaved) => {
    try {
      const updatedRestaurant = await saveOrUnsaveRestaurant(
        loggedInUserId,
        restaurantId,
        isSaved,
        token
      );
      dispatch(
        setRestaurants(
          restaurants.map((restaurant) =>
            restaurant._id === updatedRestaurant._id
              ? { ...restaurant, isSaved: !isSaved }
              : restaurant
          )
        )
      );
    } catch (error) {
      console.error("Error saving the restaurant:", error.message);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Skeleton variant="text" width={300} height={40} />
        <Skeleton
          variant="rectangular"
          width={350}
          height={200}
          sx={{ marginTop: 2, borderRadius: "8px" }}
        />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {restaurants.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          No restaurants available
        </Typography>
      ) : (
        <>
          <Box justifyContent="center">
            {currentRestaurants.map((restaurant) => (
              <Box key={restaurant._id}>
                <RestaurantWidget
                  {...restaurant}
                  onSave={() => handleSave(restaurant._id, restaurant.isSaved)}
                />
              </Box>
            ))}
          </Box>

          {/* Pagination Controls */}
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            sx={{ marginTop: 2 }}
          />
        </>
      )}
    </Box>
  );
};

export default RestaurantsWidget;
