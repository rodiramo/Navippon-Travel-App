import PropTypes from "prop-types";
import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend.jsx";
import WidgetWrapper from "../../components/Wrapper.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state/state.js";
import config from "@config/config";

const FriendListWidget = ({ userId }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends) || [];

  const getFriends = async () => {
    console.log("Token:", token);

    try {
      const response = await fetch(
        `${config.API_URL}/users/${userId}/friends`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error fetching friends: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error("Error fetching friends:", error.message);
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
        {friends.length > 0 ? (
          friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              userPicturePath={friend.picturePath}
            />
          ))
        ) : (
          <Typography>No friends found</Typography>
        )}
      </Box>
    </WidgetWrapper>
  );
};

FriendListWidget.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default FriendListWidget;
