import PropTypes from "prop-types";
import { EditOutlined, Close } from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import UserImage from "../../components/UserImage.jsx";
import FlexBetween from "../../components/FlexBetween.jsx";
import WidgetWrapper from "../../components/Wrapper.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import config from '../../config.js';


const User = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
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
      firstName: data.firstName,
      lastName: data.lastName,
      image: null,
    });
    setImagePreview(data.picturePath);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const { firstName, lastName } = user;

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

  const handleSave = async () => {
    const formDataToSend = new FormData();
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
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
          </Box>
        </FlexBetween>
        <IconButton onClick={handleEditUser}>
          <EditOutlined
            sx={{
              color: palette.primary.main,
            }}
          />
        </IconButton>
      </FlexBetween>

      <Divider />

      <Divider />

    
      {/* EDIT USER MODAL */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Edit User
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
          <TextField
            autoFocus
            margin="dense"
            name="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="lastName"
            label="Last Name"
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
                    Drag and drop an image here, or click to select one
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
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
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
