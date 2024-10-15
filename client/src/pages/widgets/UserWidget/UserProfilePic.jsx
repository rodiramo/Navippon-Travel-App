import PropTypes from "prop-types";
import { Box } from "@mui/material";
import UserImage from "@components/UserImage.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import config from "@config/config.js";

const UserProfilePicture = ({ userId }) => {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(`${config.API_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  return (
    <Box>
      <UserImage image={user.picturePath} name={user.firstName} />
    </Box>
  );
};

UserProfilePicture.propTypes = {
  userId: PropTypes.string.isRequired,
  picturePath: PropTypes.string.isRequired,
};

export default UserProfilePicture;
