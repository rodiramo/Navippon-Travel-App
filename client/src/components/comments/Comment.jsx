import React from 'react';
import { images } from '../../constants';
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { BiMessage } from "react-icons/bi";
import CommentForm from './CommentForm';

const Comment = ({ comment, loggineUserId, affectedComment, setAffectedComment, addComment, parentId = null, updateComment, deleteComment, replies, }) => {
    const isUserLoggined = Boolean(loggineUserId);
    const commentBelongsToUser = loggineUserId === comment.user._id;
    const isReplying = affectedComment && affectedComment.type === "repliying" && affectedComment._id === comment._id;
    const repliedCommentId = parentId ? parentId : comment._id;
    const repluOnUserId = comment.user._id;

    const isEditing = affectedComment && affectedComment.type === "editing" && affectedComment._id === comment._id;

    return (
        <div className='flex flex-nowrap items-start gsp-x-3 bg-[#F2F4F5] p-3 rounded-lg'>
            <img src={images.PostProfileImage} alt="Avatar" className='w-9 h-9 object-cover rounded-full mr-3' />
            <div>
                <div className='flex-l flex flex-col'>
                    <h5 className='font-bold'>{comment.user.name}</h5>
                    <span className="text-gray-600 text-xs pl-2">
                        {new Date(comment.createdAt).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                        })}
                    </span>                    
                </div>
                {!isEditing && (<p className='mt-[10px]'>{comment.desc}</p>)}
                
                {isEditing && (
                    <CommentForm 
                    btnLabel="Editar" 
                    formSubmitHanlder={(value) => updateComment(value, comment._id)} 
                    formCancelHandler={() => setAffectedComment(null)}
                    initialText={comment.desc}/>
                ) }
                <div className=' flex items-center gap-x-3 text-sm mt-3 mb-3'>
                    {isUserLoggined && (
                        <button className='flex items-center space-x-2' onClick={() => setAffectedComment({type:"repliying", _id:comment._id}) }>
                            <BiMessage className='w-4 h-auto text-[#96C6D9]' />
                            <span className='text-[#96C6D9]'>Responder</span>
                        </button>
                    )}
                    {commentBelongsToUser && (
                        <div className='flex space-x-4'>
                            <button className='flex items-center space-x-2' onClick={() => setAffectedComment({type:"editing", _id:comment._id}) }>
                                <FaEdit className='w-4 h-auto text-[#96C6D9]' />
                                <span className='text-[#96C6D9]'>Editar</span>
                            </button>
                            <button className='flex items-center space-x-2' onClick={() => deleteComment(comment._id)}>
                                <FaRegTrashAlt className='w-4 h-auto text-[#96C6D9]' />
                                <span className='text-[#96C6D9]'>Borrar</span>
                            </button>
                        </div>
                    )}
                </div>
                {isReplying && (
                    <CommentForm btnLabel="Reply" 
                    formSubmitHanlder={(value) => addComment(value, repliedCommentId, repluOnUserId)}
                    formCancelHandler={() => setAffectedComment(null)} /> 
                )}
                {replies.length > 0 && (
                    <div className='pl-9 border-l-2 border-[#96C6D9]'>
                        {replies.map((reply) => (
                            <Comment 
                                key={reply._id}
                                addComment={addComment}
                                affectedComment={affectedComment}
                                setAffectedComment={setAffectedComment}
                                comment={reply}
                                deleteComment={deleteComment}
                                loggineUserId={loggineUserId}
                                replies={[]}
                                updateComment={updateComment}
                                parentId={comment._id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Comment;