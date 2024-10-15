import { Box } from "@mui/material";
import PropTypes from "prop-types";
import UserWidget from "../../widgets/UserWidget/User.jsx";
import FriendListWidget from "../../widgets/FriendListWidget.jsx";

const FriendsSection = ({ userId, picturePath }) => {
  return (
    <Box flexBasis="26%">
      <UserWidget userId={userId} picturePath={picturePath} />
      <Box m="2rem 0" />
      <FriendListWidget userId={userId} />
    </Box>
  );
};

// Prop validation
FriendsSection.propTypes = {
  userId: PropTypes.string.isRequired,
  picturePath: PropTypes.string,
};

export default FriendsSection;
