import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import config from "@config/config.js";
import Footer from "@components/Footer/Footer.jsx";
import NavBar from "@components/NavBar/NavBar.jsx";
import DaysList from "./DaysList.jsx";
import {
  Typography,
  Box,
  Button,
  ListItem,
  List,
  CircularProgress,
  Divider,
  useTheme,
} from "@mui/material";

const TripView = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [days, setDays] = useState([]);
  const theme = useTheme();
  const token = useSelector((state) => state.token);
  const primaryMain = theme.palette.primary.main;

  useEffect(() => {
    const fetchTrip = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${config.API_URL}/trips/${tripId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch trip details");
        }
        const data = await response.json();
        setTrip(data);
        setDays(data.days);
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
      <Box
        mt={2}
        p={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ maxWidth: "800px", margin: "0 auto" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.history.back()}
          sx={{ mb: 4 }}
        >
          Back
        </Button>
        <Typography variant="h2" color={primaryMain} align="center">
          {trip.title}
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          align="center"
          sx={{ mb: 2 }}
        >
          {`${formatDate(trip.startDate)} to ${formatDate(trip.endDate)}`}
        </Typography>
        <Divider sx={{ width: "100%", mb: 2 }} />
        <Box sx={{ width: "100%" }}>
          <Typography variant="body1" mt={2} align="center">
            {trip.description}
          </Typography>
        </Box>
        <Divider sx={{ width: "100%", mt: 2, mb: 2 }} />
        <Box>
          <Typography variant="h6" sx={{ textAlign: "center", margin: 1 }}>
            Categories
          </Typography>
          <List
            sx={{
              textAlign: "center",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              margin: 1,
            }}
          >
            {trip.categories.map((category) => (
              <ListItem
                key={category._id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "0.7rem",
                  boxShadow: "0px 1px 8px #CDD9E1",
                  backgroundColor: "#fff",
                  color: "text.primary",
                  width: 120,
                  borderRadius: "8px",
                  padding: "0.5rem",
                  textAlign: "center",
                }}
              >
                <Box
                  component="img"
                  src={`${config.API_URL}/assets/${category.icon}`}
                  alt={category.category}
                  sx={{
                    width: 50,
                    height: 50,
                    padding: "0.4rem",
                    marginBottom: "0.5rem",
                  }}
                />
                <Typography variant="body2">{category.category}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider sx={{ width: "100%", mt: 2, mb: 2 }} />
        <DaysList days={days} />
      </Box>
      <Footer />
    </Box>
  );
};

export default TripView;
