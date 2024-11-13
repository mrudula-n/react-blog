/* eslint-disable no-unused-vars */
import { useState } from "react";
import PropTypes from "prop-types";
import "./CommentSection.module.css";
import moment from "moment";

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [hideComment, setHideComment] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setComments((prevComments) => [
      ...prevComments,
      { id: Date.now(), text: newComment, timestamp: new Date().toISOString() },
    ]);
    setNewComment("");
  };

  const toggleShowComments = () => {
    setHideComment(!hideComment);
  };

  const renderComments = () => {
    return comments.map((comment) => {
      return (
        <div key={comment.id}>
          {comment.text}{" "}
          {moment(comment.timestamp).format("Do MMM YYYY HH:mm:ss")}
        </div>
      );
    });
  };

  return (
    <div className="comment-section">
      <h3>Leave a comment</h3>
      <form onSubmit={handleSubmit} className="comment-form">
        <div className="textarea-container">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="comment-form__input"
            rows="10"
            cols={40}
          />
        </div>
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="comment-form__submit"
        >
          Comment
        </button>
      </form>

      {/* Toggle button */}
      <div>
        <button onClick={toggleShowComments} className="toggle-comments-btn">
          {hideComment ? "Show comments" : "Hide comments"}
        </button>
      </div>

      {/* Conditionally render comments */}
      <div>{!hideComment && renderComments()}</div>
    </div>
  );
}

CommentSection.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default CommentSection;