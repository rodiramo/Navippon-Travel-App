import PropTypes from "prop-types";
import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend.jsx";
import WidgetWrapper from "../../components/Wrapper.jsx";
import { useEffect } from "react";
import {  useSelector } from "react-redux";
import { setFriends } from "../../state/state.js";

const FriendListWidget = ({ userId }) => {
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    try {
      const response = await fetch(`http://localhost:3333/posts/${userId}/friends`);
      if (!response.ok) {
        throw new Error("Failed to fetch friends");
      }
      const data = await response.json();
      setFriends({ data });
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  useEffect(() => {
    getFriends();
  }, [userId, token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {Array.isArray(friends) &&
          friends.map((friend) => (
            <Friend
              key={friend.userId}
              friendId={friend.userId}
              name={`${friend.firstName} ${friend.lastName}`}
              userPicturePath={friend.picturePath}
            />
          ))}
      </Box>
    </WidgetWrapper>
  );
};

FriendListWidget.propTypes = {
  userId: PropTypes.string, 
};

export default FriendListWidget;
