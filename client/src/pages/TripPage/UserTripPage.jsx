import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  CircularProgress,
  Box,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import NavBar from "../../components/NavBar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { useNavigate } from "react-router-dom";

const UserTripsPage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserTrips = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3333/trips`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user trips");
        }

        const data = await response.json();
        setTrips(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTrips();
  }, [userId, token]);

  const handleViewDetails = (tripId) => {
    navigate(`/trips/${tripId}`);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <NavBar />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h1" gutterBottom>
          My Trips
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {trips.length ? (
          trips.map((trip) => (
            <Card key={trip._id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography component="div" variant="h5">
                  {trip.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {trip.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleViewDetails(trip._id)}
                  sx={{ mt: 2 }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1">You have no trips planned.</Typography>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default UserTripsPage;
