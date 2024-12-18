import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import PostsWidget from "@widgets/PostsWidget.jsx";
import PropTypes from "prop-types";
const PostsSection = ({ userId, picturePath }) => {
  const loggedInUserId = useSelector((state) => state.user._id);
  return (
    <Box flexBasis="42%" mt="2rem">
      <Box m="2rem 0" />
      <Typography variant="h2">
        {" "}
        {loggedInUserId === userId ? "Mis Publicaciones" : `Publicaciones`}
      </Typography>
      <PostsWidget userId={userId} picturePath={picturePath} isProfile />
    </Box>
  );
};
PostsSection.propTypes = {
  userId: PropTypes.string.isRequired,
  picturePath: PropTypes.string,
};
export default PostsSection;
