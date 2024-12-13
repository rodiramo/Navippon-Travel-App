import { Box, useMediaQuery, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "@components/NavBar/NavBar.jsx";
import FriendsSection from "./content/FriendsSection.jsx";

import FavoriteSection from "./content/FavoritesSection.jsx";
import TripsSection from "./content/TripsSection.jsx";
import PostsSection from "./content/PostsSection.jsx";
import config from "@config/config.js";
import Dashboard from "./content/dashboard/Dashboard.jsx";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams(); // ID of the profile being visited
  const loggedInUserId = useSelector((state) => state.user._id); // Logged-in user's ID
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

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

  if (!user) return null;

  return (
    <Box>
      <NavBar />

      <Typography
        variant="h3"
        paddingLeft="6%"
        paddingTop="8rem"
        sx={{ fontWeight: "bold" }}
        gutterBottom
      >
        {loggedInUserId === userId
          ? "Mi Perfil"
          : `Perfil de @${user.username}`}
      </Typography>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="space-between"
      >
        {/* Left side - Friends section */}
        <FriendsSection userId={userId} picturePath={user.picturePath} />

        {/* Right side - Trips, Favorites, and Posts sections */}
        <Box sx={{ width: "100%" }}>
          <Dashboard />
          <TripsSection />
          <FavoriteSection />
          <PostsSection userId={userId} picturePath={user.userPicturePath} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
