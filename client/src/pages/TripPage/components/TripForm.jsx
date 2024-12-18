import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Switch,
  FormControlLabel,
  OutlinedInput,
  Chip,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@components/Toast/ToastManager.jsx";
import config from "@config/config.js";

const TripForm = ({ onTripCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [loading, setLoading] = useState(true);
  const [prefectureOptions, setPrefectureOptions] = useState([]);
  const [friends, setFriends] = useState([]); // List of friends
  const [selectedFriends, setSelectedFriends] = useState([]); // Selected travelers

  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);

  const addToast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        // Fetch prefectures
        const [prefecturesRes, friendsRes] = await Promise.all([
          fetch(`${config.API_URL}/prefectures`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${config.API_URL}/users/${loggedInUserId}/friends`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!prefecturesRes.ok || !friendsRes.ok) {
          throw new Error("Failed to fetch form data.");
        }

        setPrefectureOptions(await prefecturesRes.json());
        setFriends(await friendsRes.json()); // Set friends list
      } catch (err) {
        addToast("Error al cargar los datos del formulario!", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [token, loggedInUserId, addToast]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(endDate) < new Date(startDate)) {
      addToast(
        "La fecha final no puede ser anterior a la fecha de inicio.",
        "error"
      );
      return;
    }

    try {
      const response = await fetch(`${config.API_URL}/trips/create-trip`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: loggedInUserId,
          title,
          description,
          startDate,
          endDate,
          prefecture,
          isPrivate,
          travelers: selectedFriends, // Send selected friends as travelers
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "No se pudo crear el viaje.");
      }

      addToast("¡Viaje creado exitosamente!", "success");
      onTripCreated();
      navigate("/trips");
    } catch (err) {
      addToast(err.message, "error");
    }
  };

  const handleFriendSelection = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedFriends(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h6">Crear un Viaje</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TextField
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            type="date"
            label="Fecha de Inicio"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            type="date"
            label="Fecha Final"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />

          <FormControl required>
            <InputLabel>Prefectura</InputLabel>
            <Select
              value={prefecture}
              onChange={(e) => setPrefecture(e.target.value)}
            >
              {prefectureOptions.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Travelers Selection */}
          <FormControl>
            <InputLabel>Amigos (Viajeros)</InputLabel>
            <Select
              multiple
              value={selectedFriends}
              onChange={handleFriendSelection}
              input={<OutlinedInput label="Amigos (Viajeros)" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((id) => {
                    const friend = friends.find((f) => f._id === id);
                    console.log(friends);
                    return (
                      <Chip key={id} label={friend?.firstName || "Amigo"} />
                    );
                  })}
                </Box>
              )}
            >
              {friends.map((friend) => (
                <MenuItem key={friend._id} value={friend._id}>
                  {friend.firstName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={isPrivate}
                onChange={() => setIsPrivate(!isPrivate)}
              />
            }
            label={isPrivate ? "Privado" : "Público"}
          />

          <Button type="submit" variant="contained">
            Crear Viaje
          </Button>
        </>
      )}
    </Box>
  );
};

TripForm.propTypes = {
  onTripCreated: PropTypes.func.isRequired,
};

export default TripForm;
