import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import config from "@config/config.js";
import Footer from "@components/Footer/Footer.jsx";
import NavBar from "@components/NavBar/NavBar.jsx";
import DaysList from "./components/DaysList.jsx";
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Divider,
  useTheme,
  List,
  ListItem,
  Avatar,
} from "@mui/material";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import BreadCrumb from "@components/BreadCrumbBack.jsx";
const TripView = () => {
  const loggedInUserId = useSelector((state) => state.user._id);

  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [days, setDays] = useState([]);
  const [friends, setFriends] = useState([]); // To hold the list of friends
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

    const fetchFriends = async () => {
      try {
        const response = await fetch(
          `${config.API_URL}/users/${loggedInUserId}/friends`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch friends list");
        }
        const friendsData = await response.json();
        setFriends(friendsData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTrip();
    fetchFriends();
  }, [tripId, token]);

  const formatDate = (dateString) => format(new Date(dateString), "dd.MM.yyyy");

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  if (!trip) return <Typography>No trip data available</Typography>;

  return (
    <Box id="body">
      <NavBar />
      <BreadCrumb></BreadCrumb>
      <Box
        mt={2}
        p={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{}}
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
          {trip.isPrivate ? (
            <Box>
              <LockOutlinedIcon />
              <Typography>Privado</Typography>
            </Box>
          ) : (
            <Box>
              <LanguageOutlinedIcon />
              <Typography>Público</Typography>
            </Box>
          )}
        </Box>
        <Divider sx={{ width: "100%", mt: 2, mb: 2 }} />

        <Typography variant="h6" align="center" sx={{ mb: 2 }}>
          Participantes
        </Typography>
        <List sx={{ width: "100%" }}>
          {friends.map((friend) => (
            <ListItem key={friend.id}>
              <Avatar alt={friend.username} src={friend.picturePath} />
              <Typography sx={{ ml: 2 }}>@{friend.username}</Typography>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ width: "100%", mt: 2, mb: 2 }} />

        <DaysList days={days} />
      </Box>
      <Footer />
    </Box>
  );
};

export default TripView;
