import PropTypes from "prop-types";
import { EditOutlined, Close } from "@mui/icons-material";
import { Box, Input, Typography, Divider, useTheme, IconButton, Dialog, DialogTitle, DialogContent, TextField, Button } from "@mui/material";
import UserImage from "../../components/UserImage.jsx";
import FlexBetween from "../../components/FlexBetween.jsx";
import WidgetWrapper from "../../components/Wrapper.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const User = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    image: null,
  });
  const { palette } = useTheme();
  const [imagePreview, setImagePreview] = useState(picturePath); 
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3333/users/${userId}`, {
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

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
      }
  };

  const handleSave = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    if (formData.image) {
      formDataToSend.append("picture", formData.image);
    }
  
    const response = await fetch(`http://localhost:3333/users/${userId}`, {
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
        <EditOutlined sx={{ color: main }} />
        </IconButton>
      </FlexBetween>

      <Divider />

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Interests
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            {/* Change to user interests from database */}
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Going Out..
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>

      {/* EDIT USER MODAL */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Edit User
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
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
           <Input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            sx={{ mt: 2 }}
          />
          {imagePreview && (
            <Box mt={2}>
              <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            </Box>
          )}
        </DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
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

