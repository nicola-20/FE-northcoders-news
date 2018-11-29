import React from "react";
import PropTypes from "prop-types";
import VoteChanger from "./VoteChanger";
import "./css/ArticleComments.css";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";
import {Link} from '@reach/router'

const Comment = ({
  comment,
  user,
  deleteComment,
  updateVotes,
  handleCommentVoteChange
}) => {
  return (
    <div className="comment">
      <span className="comment-user"><Link to={`/users/${comment.created_by.username}`}>{comment.created_by.name}</Link></span>
      <span className="comment-date">
        {new Date(comment.created_at).toUTCString()}
      </span>
      <p className="comment-body">{comment.body}</p>
      <FontAwesomeIcon
        className="comment-delete"
        icon={faTrashAlt}
        data-tip={
          user.username
            ? user.name === comment.created_by.name
              ? "Delete Comment"
              : "You can only delete your own comment!"
            : "You must be logged in to delete comments"
        }
        onClick={() => {
          if (user.name === comment.created_by.name) {
            deleteComment(comment._id);
          }
        }}
      />
      <ReactTooltip type="dark" />
      <VoteChanger
        comment={comment}
        user={user}
        updateVotes={updateVotes}
        handleCommentVoteChange={handleCommentVoteChange}
      />
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
  user: PropTypes.object,
  deleteComment: PropTypes.func,
  updateVotes: PropTypes.func,
  handleCommentVoteChange: PropTypes.func,
};

export default Comment;
