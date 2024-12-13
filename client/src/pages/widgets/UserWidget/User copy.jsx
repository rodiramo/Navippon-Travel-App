import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { EditOutlined, Close } from "@mui/icons-material";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import UserImage from "@components/UserImage.jsx";
import FlexBetween from "@components/FlexBetween.jsx";
import WidgetWrapper from "@components/Wrapper.jsx";
import config from "@config/config.js";

const User = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [location, setLocation] = useState({ city: "", country: "" });
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    image: null,
  });
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;

  const getUser = async () => {
    const response = await fetch(`${config.API_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
    setFormData({
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      image: null,
    });
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const { username, firstName, lastName } = user;

  // Fetch country based on city
  const fetchCountry = async (city) => {
    const apiKey = "520000b141fc413aae789c43254dd0bb";
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        city
      )}&key=${apiKey}`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      const country = data.results[0].components.country;
      setLocation({ city, country });
    }
  };

  const handleLocationSubmit = async () => {
    if (!location.city) return;

    // Save location to backend
    const response = await fetch(`${config.API_URL}/users/${userId}/location`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location),
    });

    if (response.ok) {
      setUser({ ...user, location });
      setOpenLocation(false);
    }
  };

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween gap="0.5rem" pb="1.1rem" sx={{ flexDirection: "column" }}>
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} size="150px" />
        </FlexBetween>
        <Box gap="1rem">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: palette.secondary.main }}
              fontWeight="500"
            >
              @{username}
            </Typography>
            <Typography variant="h4" color={dark} fontWeight="500">
              {firstName} {lastName}{" "}
              <IconButton onClick={() => setOpenEdit(true)}>
                <EditOutlined sx={{ color: palette.primary.main }} />
              </IconButton>
            </Typography>
            <Typography>
              <FmdGoodOutlinedIcon />
              <Button
                variant="text"
                color="primary"
                onClick={() => setOpenLocation(true)}
              >
                Agrega tu Ubicación
              </Button>
            </Typography>
          </Box>
        </Box>
      </FlexBetween>

      {/* EDIT LOCATION MODAL */}
      <Dialog open={openLocation} onClose={() => setOpenLocation(false)}>
        <DialogTitle>Agrega tu Ubicación</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="city"
            label="Ciudad"
            type="text"
            fullWidth
            variant="outlined"
            value={location.city}
            onChange={(e) => setLocation({ ...location, city: e.target.value })}
            onBlur={(e) => fetchCountry(e.target.value)} // Automatically fetch country on blur
          />
          {location.country && (
            <Typography mt={2}>
              País detectado: <strong>{location.country}</strong>
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLocation(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleLocationSubmit} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* OTHER MODALS LIKE EDIT PROFILE */}
      {/* ... */}
    </WidgetWrapper>
  );
};

User.propTypes = {
  userId: PropTypes.string.isRequired,
  picturePath: PropTypes.string.isRequired,
};

export default User;
