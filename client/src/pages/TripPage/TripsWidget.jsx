import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import TripForm from "./components/TripForm.jsx";
import { fetchTrips, deleteTrip } from "@services/services.js";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const TripsWidget = () => {
  const theme = useTheme();
  const primaryMain = theme.palette.primary.main;
  const [showForm, setShowForm] = useState(false);
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd.MM.yyyy");
  };

  const handleTripCreated = () => {
    fetchTripsData();
    setShowForm(false);
  };

  const fetchTripsData = async () => {
    setLoading(true);
    try {
      const data = await fetchTrips(token);
      // Filter trips that belong to the logged-in user
      const userTrips = data.filter((trip) => trip.userId === loggedInUserId);
      setTrips(userTrips);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTripsData();
    }
  }, [token, loggedInUserId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleViewDetails = (tripId) => {
    navigate(`/trips/${tripId}`);
  };

  const handleOpenDeleteDialog = (tripId) => {
    setTripToDelete(tripId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setTripToDelete(null);
    setOpenDeleteDialog(false);
  };

  const handleDeleteTrip = async () => {
    if (tripToDelete) {
      try {
        await deleteTrip(tripToDelete, token);
        setTrips((prevTrips) =>
          prevTrips.filter((trip) => trip._id !== tripToDelete)
        );
        handleCloseDeleteDialog();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => navigate("/trips/create-trip")}
      >
        Create New Trip
      </Button>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && (
        <Box mt={2}>
          {trips.length === 0 ? (
            <Typography variant="p" sx={{ marginTop: 2 }}>
              {trips.length === 0
                ? "Los viajes de este usuario son privados."
                : "No se ha agregado ningun viaje, agrega un viaje para poder verlo aquí."}
            </Typography>
          ) : (
            <List>
              {trips.map((trip) => (
                <ListItem key={trip._id} disablePadding>
                  <Button
                    onClick={() => handleViewDetails(trip._id)}
                    fullWidth
                    variant="outlined"
                    style={{ textAlign: "left" }}
                  >
                    <ListItemText
                      primary={trip.title}
                      secondary={`${formatDate(trip.startDate)} to ${formatDate(
                        trip.endDate
                      )}`}
                    />
                    <Typography>Click to View Details</Typography>
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleOpenDeleteDialog(trip._id)}
                    sx={{ ml: 2 }}
                  >
                    Delete
                  </Button>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this trip?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteTrip} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TripsWidget;
