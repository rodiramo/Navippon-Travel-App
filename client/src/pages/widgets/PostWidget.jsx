import PropTypes from "prop-types";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  DeleteOutline,
  EditOutlined,
} from "@mui/icons-material";
import {
  TextField,
  IconButton,
  Typography,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import config from "@config/config.js";
import FlexBetween from "@components/FlexBetween.jsx";
import Friend from "@components/Friend.jsx";
import WidgetWrapper from "@components/Wrapper.jsx";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, removePost } from "@state/state.js";
import CommentsSection from "@components/CommentSection.jsx";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editDescription, setEditDescription] = useState(description);
  const [commentText, setCommentText] = useState("");
  const [currentUserPicturePath, setCurrentUserPicturePath] = useState(
    userPicturePath || "/assets/image.jpg"
  );
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  useEffect(() => {
    const fetchUserPicture = async () => {
      try {
        const response = await fetch(`${config.API_URL}/users/${postUserId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        if (userData && userData.picturePath) {
          setCurrentUserPicturePath(userData.picturePath);
        } else {
          setCurrentUserPicturePath("/assets/image.jpg");
        }
      } catch (err) {
        console.error("Failed to fetch user picture", err);
        setCurrentUserPicturePath("/assets/image.jpg");
      }
    };

    fetchUserPicture();
  }, [postUserId, token]);

  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const patchLike = async () => {
    const response = await fetch(`${config.API_URL}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const deletePost = async () => {
    const response = await fetch(`${config.API_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      dispatch(removePost({ postId }));
      handleDeleteClose();
    }
  };

  const editPost = async () => {
    const response = await fetch(`${config.API_URL}/posts/${postId}/edit`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: loggedInUserId,
        description: editDescription,
      }),
    });

    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    handleEditClose();
  };

  const addComment = async () => {
    const response = await fetch(`${config.API_URL}/posts/${postId}/comment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId, comment: commentText }),
    });

    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setCommentText("");
  };

  const deleteComment = async (userId, commentIndex) => {
    try {
      const response = await fetch(
        `${config.API_URL}/posts/${postId}/comment`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, commentIndex }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        userPicturePath={currentUserPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="50%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${config.API_URL}/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        {loggedInUserId === postUserId && (
          <FlexBetween gap="0.3rem">
            <IconButton onClick={handleDeleteOpen}>
              <DeleteOutline />
            </IconButton>
            <IconButton onClick={handleEditOpen}>
              <EditOutlined />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {isComments && (
        <CommentsSection
          comments={comments}
          postId={postId}
          loggedInUserId={loggedInUserId}
          addComment={addComment}
          deleteComment={deleteComment}
          commentText={commentText}
          setCommentText={setCommentText}
        />
      )}

      <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Post"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deletePost} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby="edit-dialog-title"
        aria-describedby="edit-dialog-description"
      >
        <DialogTitle id="edit-dialog-title">{"Edit Post"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="edit-dialog-description">
            Edit your post description below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Post Description"
            type="text"
            fullWidth
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editPost} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </WidgetWrapper>
  );
};

PostWidget.propTypes = {
  postId: PropTypes.string.isRequired,
  postUserId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  picturePath: PropTypes.string,
  userPicturePath: PropTypes.string.isRequired,
  likes: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
};

export default PostWidget;
