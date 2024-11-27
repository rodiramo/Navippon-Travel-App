import { useState } from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createNewComment,
  deleteComment,
  updateComment,
} from "@services/index/comments.js";
import { toast } from "react-hot-toast";
import useAuth from "@hooks/useAuth";

const CommentsContainer = ({
  className,
  logginedUserId,
  comments,
  postSlug,
}) => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const [affectedComment, setAffectedComment] = useState(null);

  const {
    mutate: mutateNewComment,
    isLoading: isLoadingNewComment,
  } = useMutation({
    mutationFn: ({ token, desc, slug, parent, replyOnUser }) => {
      return createNewComment({ token, desc, slug, parent, replyOnUser });
    },
    onSuccess: () => {
      toast.success(
        "Tu comentario se ha enviado con éxito, será visible tras la confirmación del Administrador"
      );
      queryClient.invalidateQueries(["blog", postSlug]);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const { mutate: mutateUpdateComment } = useMutation({
    mutationFn: ({ token, desc, commentId }) => {
      return updateComment({ token, desc, commentId });
    },
    onSuccess: () => {
      toast.success("Tu comentario se ha actualizado correctamente");
      queryClient.invalidateQueries(["blog", postSlug]);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const { mutate: mutateDeleteComment } = useMutation({
    mutationFn: ({ token, commentId }) => {
      return deleteComment({ token, commentId });
    },
    onSuccess: () => {
      toast.success("Tu comentario se borró correctamente");
      queryClient.invalidateQueries(["blog", postSlug]);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  // Handler for adding a new comment
  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    if (!isAuthenticated) {
      toast.error("Debes estar autenticado para agregar un comentario");
      return;
    }
    const token = localStorage.getItem("jwt");
    mutateNewComment({
      desc: value,
      parent,
      replyOnUser,
      token,
      slug: postSlug,
    });
    setAffectedComment(null);
  };

  // Handler for updating an existing comment
  const updateCommentHandler = (value, commentId) => {
    if (!isAuthenticated) {
      toast.error("Debes estar autenticado para actualizar un comentario");
      return;
    }
    const token = localStorage.getItem("jwt");
    mutateUpdateComment({
      token,
      desc: value,
      commentId,
    });
    setAffectedComment(null);
  };

  // Handler for deleting a comment
  const deleteCommentHandler = (commentId) => {
    if (!isAuthenticated) {
      toast.error("Debes estar autenticado para eliminar un comentario");
      return;
    }
    const token = localStorage.getItem("jwt");
    mutateDeleteComment({ token, commentId });
  };

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Enviar"
        formSubmitHanlder={(value) => addCommentHandler(value)}
        loading={isLoadingNewComment}
      />
      <div className="space-y-4 mt-8">
        {comments === 0 ? (
          <p className="text-center text-gray-500">No hay comentarios aún.</p>
        ) : (
          comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              logginedUserId={logginedUserId}
              affectedComment={affectedComment}
              setAffectedComment={setAffectedComment}
              addComment={addCommentHandler}
              updateComment={updateCommentHandler}
              deleteComment={deleteCommentHandler}
              replies={comment.replies}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Prop Types validation
CommentsContainer.propTypes = {
  className: PropTypes.string,
  logginedUserId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      replies: PropTypes.array,
      // other comment properties you expect
    })
  ).isRequired,
  postSlug: PropTypes.string.isRequired,
};

export default CommentsContainer;
