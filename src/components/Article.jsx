import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import "./css/Article.css";
import {
  faThumbsUp,
  faThumbsDown,
  faCommentAlt,
  faUserAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Article = ({ article, handleVoteChange }) => {
  return (
    <div className="Article" key={article._id}>
      <h3 className="article-title">
        <Link to={`/articles/${article._id}`}>{article.title}</Link>
      </h3>
      <p className="article-user">
        by{" "}
        <Link to={`/users/${article.created_by.username}`}>
          <FontAwesomeIcon className="icon" icon={faUserAlt} />
          {article.created_by.name}
        </Link>
      </p>
      <p className="article-createdAt">
        created at: {new Date(article.created_at).toUTCString()}
      </p>
      <p className="article-comments">
        <Link to={`/articles/${article._id}/comments`}>
          <FontAwesomeIcon className="icon" icon={faCommentAlt} />
          {article.comment_count} comments
        </Link>
      </p>
      <div className="article-votes">
        {/* <button onClick={() => {handleVoteChange(article._id, 'up')}}><FontAwesomeIcon icon={faThumbsUp} />Up</button> */}
        <FontAwesomeIcon
          className="icon thumb up"
          icon={faThumbsUp}
          onClick={() => {
            handleVoteChange(article._id, "up");
          }}
        />
        <p>{article.votes}</p>
        <FontAwesomeIcon
          className="icon thumb down"
          icon={faThumbsDown}
          onClick={() => {
            handleVoteChange(article._id, "down");
          }}
        />
        {/* <button onClick={() => {handleVoteChange(article._id, 'down')}}><FontAwesomeIcon icon={faThumbsDown} />Down</button> */}
      </div>
    </div>
  );
};

Article.propTypes = {};

export default Article;
