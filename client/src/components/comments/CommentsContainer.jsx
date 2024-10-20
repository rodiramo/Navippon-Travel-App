import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import { getCommentsData } from '../../data/comments';  
import Comment from './Comment';

const CommentsContainer = ({ className, loggineUserId }) => {
    const [comments, setComments] = useState([]);
    const [affectedComment, setAffectedComment] = useState(null); // Mover el estado aquí
    const mainComments = comments.filter((comment) => comment.parent === null);
    console.log(comments);

    useEffect(() => {
        (async () => {
            const commentsData = await getCommentsData();
            setComments(commentsData);
        })();
    }, []);

    const addCommentHandler = (value, parent = null, replyOnuser = null) => {
        const newComment = {
            _id: Math.random().toString(),
            user: {
                _id: "a",
                name: "Usuario uno",
            },
            desc: value,
            post: "1",
            parent: parent,
            replyOnUser: replyOnuser,
            createdAt: new Date().toISOString(),
        };
        setComments((curState) => [newComment, ...curState]);
        setAffectedComment(null);
    };

    const updateCommentHandler = (value, commentId) => {
        const updatedComments = comments.map((comment) => {
            if (comment._id === commentId) {
                return {
                    ...comment,
                    desc: value,};
            }
            return comment;
        });        
        setComments(updatedComments);
        setAffectedComment(null);
    };

    const deleteCommentHandler = (commentId) => {
        const updatedComments = comments.filter((comment) =>{ 
        return comment._id !== commentId;
    });
        setComments(updatedComments);
    };

const getRepliesHandler = (commentId) => {
    return comments
    .filter((comment) => comment.parent === commentId)
    .sort((a, b) => {
        return (
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
});
    };
    

    return (
        <div className={`${className}`}>
            <CommentForm btnLabel="Enviar" formSubmitHandler={(value) => addCommentHandler(value)} />
            <div className='space-y-4 mt-8'>
                {mainComments.map((comment) => (
                    <Comment 
                        key={comment._id}
                        comment={comment} 
                        loggineUserId={loggineUserId} 
                        affectedComment={affectedComment} 
                        setAffectedComment={setAffectedComment}
                        addComment={addCommentHandler}
                        updateComment={updateCommentHandler}
                        deleteComment={deleteCommentHandler}
                        replies={getRepliesHandler(comment._id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CommentsContainer;