import React from "react";
import PropTypes from "prop-types";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VoteChanger = props => {
  const { article, handleArticleVoteChange } = props;
  const { comment, handleCommentVoteChange } = props;
  if (comment) {
    return (
      <div className="article-votes">
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
    )
  } else if (article) {
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
    )
  }
};

VoteChanger.propTypes = {};

export default VoteChanger;
