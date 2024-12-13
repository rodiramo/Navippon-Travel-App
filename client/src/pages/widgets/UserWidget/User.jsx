import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { EditOutlined, Close } from "@mui/icons-material";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import {
  Box,
  Typography,
  DialogActions,
  Divider,
  useTheme,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import UserImage from "@components/UserImage.jsx";
import FlexBetween from "@components/FlexBetween.jsx";
import WidgetWrapper from "@components/Wrapper.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import config from "@config/config.js";

const User = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const loggedInUserId = useSelector((state) => state.user._id);
  const [openLocation, setOpenLocation] = useState(false);
  const [location, setLocation] = useState({ city: "", country: "" });
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    image: null,
  });
  const [hasSelectedImage, setHasSelectedImage] = useState(false);
  const { palette } = useTheme();
  const [imagePreview, setImagePreview] = useState(picturePath);
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
    setImagePreview(data.picturePath);
  };

  useEffect(() => {
    getUser();
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const { username, firstName, lastName, city, country } = user;

  const handleEditUser = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
      setHasSelectedImage(true);
    }
  };

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
    const response = await fetch(`${config.API_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location),
    });

    if (response.ok) {
      const updatedUser = {
        ...user,
        city: location.city,
        country: location.country,
      };
      setUser(updatedUser);
      setOpenLocation(false);
    } else {
      console.error("Failed to update location");
    }
  };

  const handleSave = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    if (formData.image) {
      formDataToSend.append("picture", formData.image);
    }

    const response = await fetch(`${config.API_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataToSend,
    });

    if (!response.ok) {
      console.error("Failed to update user");
    } else {
      const data = await response.json();
      setUser(data);
      setImagePreview(data.picturePath);
      setOpen(false);
      window.location.reload();
    }
  };

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween gap="0.5rem" pb="1.1rem" sx={{ flexDirection: "column" }}>
        {" "}
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
            {" "}
            <Typography
              variant="h6"
              sx={{ color: palette.secondary.main }}
              fontWeight="500"
            >
              @{username}
            </Typography>
            <Typography variant="h4" color={dark} fontWeight="500">
              {!loggedInUserId === userId ? (
                `${firstName} ${lastName}`
              ) : (
                <Box sx={{ display: "flex" }}>
                  <Typography fontWeight="bold" variant="h4">
                    {firstName} {lastName}
                  </Typography>{" "}
                  <IconButton onClick={handleEditUser}>
                    <EditOutlined
                      sx={{
                        color: palette.primary.main,
                      }}
                    />
                  </IconButton>
                </Box>
              )}
            </Typography>
            {user.city && user.country ? (
              <Typography>
                <FmdGoodOutlinedIcon sx={{ color: palette.primary.main }} />{" "}
                {user.city}, {user.country}
              </Typography>
            ) : (
              <Button
                variant="text"
                color="primary"
                onClick={() => setOpenLocation(true)}
              >
                Agrega tu Ubicación
              </Button>
            )}
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
      {/* EDIT USER MODAL */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Edita tu Perfil
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {" "}
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="Nombre de usuario"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="firstName"
            label="Primer Nombre"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="lastName"
            label="Apellido"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.lastName}
            onChange={handleChange}
          />
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={handleImageChange}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div
                  {...getRootProps({ className: "dropzone" })}
                  style={{
                    border: `2px dashed ${palette.primary.main}`,
                    padding: "1rem",
                    marginTop: "1rem",
                    borderRadius: "8px",
                    textAlign: "center",
                    color: palette.text.secondary,
                  }}
                >
                  <input {...getInputProps()} />
                  <Typography>
                    Arrastra y suelta una imagen aquí, o haz clic para
                    seleccionar una.
                  </Typography>
                </div>
                {hasSelectedImage && imagePreview && (
                  <Box mt={2}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </Box>
                )}
              </section>
            )}
          </Dropzone>
        </DialogContent>
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            style={{
              background: palette.primary.main,
              color: palette.primary.white,
              padding: "0.7rem",
              borderRadius: "30rem",
              marginLeft: "0.7rem",
            }}
          >
            Guardar
          </Button>
        </Box>
      </Dialog>
    </WidgetWrapper>
  );
};

User.propTypes = {
  userId: PropTypes.string.isRequired,
  picturePath: PropTypes.string.isRequired,
};

export default User;
