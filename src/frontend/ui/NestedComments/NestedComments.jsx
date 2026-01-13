import { useState } from "react";
import { Comment } from "./Comment";
import "./NestedComments.css";
import { useComment } from "./useComment";

export const NestedComments = () => {
  const { comments, addNewComment,editComment,deleteComment } = useComment();
  const [text, setText] = useState("");

  const handleNewComment = (e) => {
    e.preventDefault();
    addNewComment(NaN, text);
};

const handleAddReply = (id, content) => {
    addNewComment(id, content);
};

const handleEdit = (id,content) => {
editComment(id,content)
  };

  const handleDelete = (id) => {
    deleteComment(id)
  };
  return (
    <div>
      <h2>NestedComments</h2>
      <div className="comments-container">
        <form onSubmit={handleNewComment} className="new-msg-container">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onSubmit={handleAddReply}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};
