import { Box, useMediaQuery, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "@components/NavBar/NavBar.jsx";
import FriendListWidget from "../widgets/FriendListWidget.jsx";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/User.jsx";
import FavoriteActivities from "../widgets/ActivitiesWidget/FavoriteActivities.jsx";
import TripsWidget from "../widgets/TripsWidget.jsx";
import config from "@config/config.js";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
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
      <NavBar />{" "}
      <Typography
        variant="h1"
        sx={{ textAlign: "center", fontWeight: "bold", marginTop: 2 }}
        gutterBottom
      >
        My Profile
      </Typography>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        {/* left screen */}
        {/* friends */}
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>

        {/* right screen */}
        <Box>
          {" "}
          {/* trips */}
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <Box m="2rem 0" />
            <h2>My Trips</h2>
            <TripsWidget />
          </Box>
          {/* favorites */}
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <Box m="2rem 0" />
            <h2>My Favorites</h2>
            <FavoriteActivities />
          </Box>
          {/** posts */}
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <h2>Post Something New</h2>
            <MyPostWidget picturePath={user.picturePath} />
            <Box m="2rem 0" />
            <h2>My Posts</h2>
            <PostsWidget
              userId={userId}
              picturePath={user.userPicturePath}
              isProfile
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
