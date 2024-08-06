import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Typography,
  Box,
  Button,
  List,
  useTheme,
  ListItem,
  ListItemText,
} from "@mui/material";
import TripForm from "../../components/TripForm.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TripsWidget = () => {
  const theme = useTheme();
  const primaryMain = theme.palette.primary.main;
  const [showForm, setShowForm] = useState(false);
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate(); // Hook for navigation

  const handleToggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3333/trips", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch trips");
      }
      const data = await response.json();
      setTrips(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTrips();
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd.MM.yyyy");
  };

  const handleViewDetails = (tripId) => {
    navigate(`/trips/${tripId}`); // Navigate to the trip details page
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleToggleForm}>
        {showForm ? "Cancel" : "Create New Trip"}
      </Button>
      {showForm && (
        <Box mt={2}>
          <TripForm />
        </Box>
      )}
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && (
        <Box mt={2}>
          <Typography variant="h6">My Trips</Typography>
          {trips.length === 0 ? (
            <Typography sx={{ marginTop: 2, color: primaryMain }}>
              No trips found. You havent created any trips yet.
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
                  </Button>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      )}
    </Box>
  );
};

export default TripsWidget;
