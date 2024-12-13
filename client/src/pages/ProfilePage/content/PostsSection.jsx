import { Box, Typography } from "@mui/material";
import MyPostWidget from "@widgets/MyPostWidget.jsx";
import PostsWidget from "@widgets/PostsWidget.jsx";
import PropTypes from "prop-types";
const PostsSection = ({ userId, picturePath }) => {
  return (
    <Box flexBasis="42%" mt="2rem">
      <Typography variant="h2">Publica algo nuevo</Typography>
      <MyPostWidget userId={userId} picturePath={picturePath} isProfile />
      <Box m="2rem 0" />
      <Typography variant="h2">Mis Publicaciones</Typography>
      <PostsWidget userId={userId} picturePath={picturePath} isProfile />
    </Box>
  );
};
PostsSection.propTypes = {
  userId: PropTypes.string.isRequired,
  picturePath: PropTypes.string,
};
export default PostsSection;
