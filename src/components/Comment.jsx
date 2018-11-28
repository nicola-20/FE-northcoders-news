import React from "react";
import PropTypes from "prop-types";
import VoteChanger from "./VoteChanger";
import "./css/ArticleComments.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";

const Comment = ({ comment, user, deleteComment }) => {
  return (
    <div className="comment">
      <span className="comment-user">{comment.created_by.name}</span>
      <span className="comment-date">
        {new Date(comment.created_at).toUTCString()}
      </span>
      <p className="comment-body">{comment.body}</p>
      {/* <p>{new Date(comment.created_at).toUTCString()}</p> */}
      <FontAwesomeIcon
        className="comment-delete"
        icon={faTrash}
        data-tip={
          user.username
            ? user.name === comment.created_by.name
              ? "Delete Comment"
              : "You can only delete your own comment!"
            : "You must be logged in to delete comments"
        }
        onClick = {() => {
          if(user.name === comment.created_by.name) {deleteComment(comment._id)}
        }}
      />
      <ReactTooltip type="dark" />
      <VoteChanger comment={comment} user={user} />
      {/* <p>{comment.votes}</p> */}
    </div>
  );
};

Comment.propTypes = {};

export default Comment;
