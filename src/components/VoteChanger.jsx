import React from "react";
import PropTypes from "prop-types";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";

const VoteChanger = ({
  article,
  handleArticleVoteChange,
  comment,
  handleCommentVoteChange,
  user
}) => {
  if (comment) {
    if (user.username) {
      // if logged in
      return (
        <div className="comment-votes">
          <FontAwesomeIcon
            className="icon thumb up"
            icon={faThumbsUp}
            onClick={() => {
              handleCommentVoteChange(comment._id, "up");
            }}
          />
          <p>{comment.votes}</p>
          <FontAwesomeIcon
            className="icon thumb down"
            icon={faThumbsDown}
            onClick={() => {
              handleCommentVoteChange(comment._id, "down");
            }}
          />
        </div>
      );
    } else {
      // if not logged in
      return (
        <div className="comment-votes">
          <ReactTooltip type="dark" />
          <FontAwesomeIcon
            className="icon thumb up"
            icon={faThumbsUp}
            data-tip="You must be logged in to vote!"
          />
          <p>{comment.votes}</p>
          <FontAwesomeIcon
            className="icon thumb down"
            icon={faThumbsDown}
            data-tip="You must be logged in to vote!"
          />
        </div>
      );
    }
  } else if (article) {
    if (user.username) {
      // if logged in
      return (
        <div className="article-votes">
          <FontAwesomeIcon
            className="icon thumb up"
            icon={faThumbsUp}
            onClick={() => {
              handleArticleVoteChange(article._id, "up");
            }}
          />
          <p>{article.votes}</p>
          <FontAwesomeIcon
            className="icon thumb down"
            icon={faThumbsDown}
            onClick={() => {
              handleArticleVoteChange(article._id, "down");
            }}
          />
        </div>
      );
    } else {
      // if not logged in
      return (
        <div className="article-votes">
          <ReactTooltip type="dark" />
          <FontAwesomeIcon
            className="icon thumb up"
            icon={faThumbsUp}
            data-tip="You must be logged in to vote!"
          />
          <p>{article.votes}</p>
          <FontAwesomeIcon
            className="icon thumb down"
            icon={faThumbsDown}
            data-tip="You must be logged in to vote!"
          />
        </div>
      );
    }
  }
};

VoteChanger.propTypes = {};

export default VoteChanger;
