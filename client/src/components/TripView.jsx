import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import Footer from "../components/Footer/Footer.jsx";
import NavBar from "../components/NavBar/Navbar.jsx";
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";

const TripView = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const theme = useTheme();
  const token = useSelector((state) => state.token);
  const primaryMain = theme.palette.primary.main;

  useEffect(() => {
    const fetchTrip = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3333/trips/${tripId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch trip details");
        }
        const data = await response.json();
        setTrip(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [tripId, token]);

  const formatDate = (dateString) => format(new Date(dateString), "dd.MM.yyyy");

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  if (!trip) return <Typography>No trip data available</Typography>;

  return (
    <Box>
      <NavBar />
      <Box mt={2} p={2}>
        <Typography variant="h1" color={primaryMain}>
          {trip.title}
        </Typography>
        <Typography variant="h2" color="textSecondary">
          {`${formatDate(trip.startDate)} to ${formatDate(trip.endDate)}`}
        </Typography>
        <Typography variant="body1" mt={2}>
          {trip.description}
        </Typography>
        <Box mt={2}>
          <Typography variant="h2">Prefecture:</Typography>
          <Typography>{trip.prefecture.name}</Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="h2">Budget:</Typography>
          <Typography>{trip.budget.name}</Typography>{" "}
          {/* Adjust this if necessary */}
        </Box>
        <Box mt={2}>
          <Typography variant="h2">Categories:</Typography>
          <List>
            {trip.categories.map((category) => (
              <ListItem key={category._id}>
                <ListItemText primary={category.category} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box mt={2}>
          <Typography variant="h2">Days ({trip.days.length}):</Typography>
          <List>
            {trip.days.map((day) => (
              <ListItem key={day}>
                <ListItemText primary={formatDate(day)} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.history.back()}
          sx={{ mt: 2 }}
        >
          Back
        </Button>
      </Box>
      <Footer />
    </Box>
  );
};

export default TripView;
