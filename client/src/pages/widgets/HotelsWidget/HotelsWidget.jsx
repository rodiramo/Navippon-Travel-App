import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHotels } from "@state/state.js";
import HotelWidget from "./HotelWidget.jsx";
import { Skeleton, Typography, Box, Pagination } from "@mui/material";
import {
  fetchHotels,
  saveOrUnsaveHotel,
  deleteHotel,
} from "@services/services.js";

const HotelsWidget = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 8;
  const token = useSelector((state) => state.token);
  const hotels = useSelector((state) => state.hotels);
  const loggedInUserId = useSelector((state) => state.user._id);

  const totalPages = Math.ceil(hotels.length / hotelsPerPage);

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const data = await fetchHotels(token);
        dispatch(setHotels(data));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadHotels();
  }, [dispatch, token]);

  // Handle pagination change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Pagination logic to slice hotels for the current page
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);

  const handleSave = async (hotelId, isSaved) => {
    try {
      const updatedHotel = await saveOrUnsaveHotel(
        loggedInUserId,
        hotelId,
        isSaved,
        token
      );
      dispatch(
        setHotels(
          hotels.map((hotel) =>
            hotel._id === updatedHotel._id
              ? { ...hotel, isSaved: !isSaved }
              : hotel
          )
        )
      );
    } catch (error) {
      console.error("Error saving the hotel:", error.message);
    }
  };

  const handleDelete = async (hotelId) => {
    try {
      await deleteHotel(hotelId, token);
      dispatch(setHotels(hotels.filter((hotel) => hotel._id !== hotelId)));
    } catch (error) {
      console.error("Error deleting the hotel: ", error.message);
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
      {hotels.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          No hotels available
        </Typography>
      ) : (
        <>
          <Box justifyContent="center">
            {currentHotels.map((hotel) => (
              <Box key={hotel._id}>
                <HotelWidget
                  {...hotel}
                  onSave={() => handleSave(hotel._id, hotel.isSaved)}
                  onDelete={() => handleDelete(hotel._id)}
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

export default HotelsWidget;
