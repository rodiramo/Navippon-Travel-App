import PropTypes from "prop-types";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import config from "@config/config.js";
import { format } from "date-fns";

const CommentsSection = ({
  comments,
  loggedInUserId,
  addComment,
  deleteComment,
  commentText,
  setCommentText,
}) => {
  return (
    <Box mt="0.5rem">
      {comments.map((comment, i) => (
        <Box key={`${comment.userId}-${i}`} mb="0.5rem">
          <Divider />
          <Box display="flex" alignItems="center" p="0.5rem">
            <Avatar
              src={`${config.API_URL}/assets/${comment.userPicturePath}`}
            />
            <Box ml="0.75rem" flexGrow={1}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {comment.firstName}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {comment.comment}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {comment.createdAt
                  ? format(new Date(comment.createdAt), "MMMM dd, yyyy h:mm a")
                  : "Unknown date"}{" "}
              </Typography>
            </Box>
            {comment.userId === loggedInUserId && (
              <IconButton onClick={() => deleteComment(comment.userId, i)}>
                <DeleteOutline />
              </IconButton>
            )}
          </Box>
        </Box>
      ))}
      <Divider />
      <Box mt="0.5rem">
        <TextField
          fullWidth
          id="comment"
          label="Add a comment"
          variant="outlined"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addComment}
          disabled={commentText.trim() === ""}
          sx={{ mt: "0.5rem" }}
        >
          Comment
        </Button>
      </Box>
    </Box>
  );
};

CommentsSection.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      comment: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      userPicturePath: PropTypes.string,
    })
  ).isRequired,
  loggedInUserId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  commentText: PropTypes.string.isRequired,
  setCommentText: PropTypes.func.isRequired,
};

export default CommentsSection;
