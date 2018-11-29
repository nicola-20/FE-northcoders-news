import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import "./css/Article.css";
import { faCommentAlt, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VoteChanger from "./VoteChanger";

const Article = ({ article, handleArticleVoteChange, user, updateVotes }) => {
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
      <VoteChanger
        handleArticleVoteChange={handleArticleVoteChange}
        article={article}
        user={user}
        updateVotes={updateVotes}
      />
    </div>
  );
};

Article.propTypes = {
  article: PropTypes.object,
  user: PropTypes.object,
  handleArticleVoteChange: PropTypes.func,
  updateVotes: PropTypes.func
};

export default Article;
