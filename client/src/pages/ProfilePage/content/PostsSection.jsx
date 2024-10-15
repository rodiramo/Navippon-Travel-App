import { Box } from "@mui/material";
import MyPostWidget from "@widgets/MyPostWidget.jsx";
import PostsWidget from "@widgets/PostsWidget.jsx";
import PropTypes from "prop-types";
const PostsSection = ({ userId, picturePath }) => {
  return (
    <Box flexBasis="42%" mt="2rem">
      <h2>Post Something New</h2>
      <MyPostWidget picturePath={picturePath} />
      <Box m="2rem 0" />
      <h2>My Posts</h2>
      <PostsWidget userId={userId} picturePath={picturePath} isProfile />
    </Box>
  );
};
PostsSection.propTypes = {
  userId: PropTypes.string.isRequired,
  picturePath: PropTypes.string,
};
export default PostsSection;
