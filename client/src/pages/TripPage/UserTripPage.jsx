import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  CircularProgress,
  Box,
  Card,
  CardContent,
  Button,
  Breadcrumbs,
  Link,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchTrips, deleteTrip } from "@services/services.js";
import NavBar from "@components/NavBar/NavBar.jsx";
import Footer from "@components/Footer/Footer.jsx";
import DeleteIcon from "@mui/icons-material/Delete";

const UserTripsPage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserTrips = async () => {
      setLoading(true);
      try {
        const data = await fetchTrips(token);
        setTrips(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTrips();
  }, [token]);

  const handleViewDetails = (tripId) => {
    navigate(`/trips/${tripId}`);
  };

  const handleOpenDialog = (tripId) => {
    setTripToDelete(tripId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setTripToDelete(null);
    setOpenDialog(false);
  };

  const handleDeleteTrip = async () => {
    if (tripToDelete) {
      try {
        await deleteTrip(tripToDelete, token);
        setTrips((prevTrips) =>
          prevTrips.filter((trip) => trip._id !== tripToDelete)
        );
        handleCloseDialog();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box id="body">
      <NavBar />
      <Box sx={{ paddingTop: 15 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link color="inherit" href="/home">
            Home
          </Link>
          <Typography color="textPrimary">My Trips</Typography>
        </Breadcrumbs>
        <Typography variant="h1" gutterBottom>
          My Trips
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/trips/create-trip")}
        >
          Create New Trip
        </Button>
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
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleOpenDialog(trip._id)}
                  sx={{ ml: 2 }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1">You have no trips planned.</Typography>
        )}
      </Box>
      <Footer />

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this trip?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDeleteTrip} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserTripsPage;
