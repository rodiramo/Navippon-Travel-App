import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import TripForm from "../../components/TripForm.jsx";
import { useSelector } from "react-redux";

const TripsWidget = () => {
  const [showForm, setShowForm] = useState(false);
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.token);

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
  }, [token]);

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        My Trips
      </Typography>
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
          <Typography variant="h6">Your Trips</Typography>
          <List>
            {trips.map((trip) => (
              <ListItem key={trip._id}>
                <ListItemText
                  primary={trip.title}
                  secondary={`${trip.startDate} to ${trip.endDate}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default TripsWidget;
