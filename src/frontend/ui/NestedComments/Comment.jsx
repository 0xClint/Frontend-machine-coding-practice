import { useState } from "react";
import "./Comment.css";

export const Comment = ({
  comment,
  onSubmit = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState("");
  const [replyText, setreplyText] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [showReplyInputBar, setShowReplyInputBar] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setText(comment.content);
  };

  const handleSubmitReply = (e) => {
    e.preventDefault();
    onSubmit(comment.id, replyText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(comment.id, text);
    setEditMode(false);
  };

  const handleDelete = () => {
    onDelete(comment.id);
  };

  return (
    <div className="comment-container">
      {editMode ? (
        <form onSubmit={handleSubmit} className="edit-container">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      ) : (
        <div>{comment.content}</div>
      )}
      <div className="btn-container">
        <span>
          <button
            className="btn"
            onClick={() => setShowReplyInputBar(!showReplyInputBar)}
          >
            reply
          </button>
          <button className="btn" onClick={() => setShowReply(!showReply)}>
            {showReply ? "🔼" : "🔽"}
          </button>
        </span>
        <button className="btn" onClick={toggleEditMode}>
          {editMode ? "cancel" : "edit"}
        </button>
        <button className="btn">👍</button>
        <button className="btn">👎</button>
        <button className="btn" onClick={handleDelete}>delete</button>
      </div>

      <div className="reply-container">
        {showReplyInputBar && (
          <form onSubmit={handleSubmitReply} className="reply-input-container">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setreplyText(e.target.value)}
            />
            <button type="submit">submit</button>
          </form>
        )}
        {showReply &&
          comment?.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} onSubmit={onSubmit} onEdit={onEdit} onDelete={onDelete}/>
          ))}
      </div>
    </div>
  );
};
