import React from 'react';
import PropTypes from 'prop-types';
import "../App.css";
import "./css/Home.css";
import { Link } from "@reach/router";
import Truncate from "react-truncate";
import ReactTooltip from "react-tooltip";

const FeaturedArticle = props => {
  const { article } = props
  return (
    <div key={article._id} className="featured-article">
    <h3 className="home-article-title">
      <Link to={`/articles/${article._id}`}>{article.title}</Link>
    </h3>
    <p className="featured-article-user">
      <Link to={`users/${article.created_by.username}`}>
        {article.created_by.name}
      </Link>
    </p>
    <p className="featured-article-body">
      <Truncate lines={3} ellipsis={""}>
        {article.body}
      </Truncate>
      <Link
        to={`/articles/${article._id}`}
        data-tip="Read rest of article"
        data-for="article-see-more"
        id="read-more"
      >
        ...
      </Link>
    </p>
      <ReactTooltip type="dark" id="article-see-more" />
  </div>
  );
};

FeaturedArticle.propTypes = {
  article: PropTypes.object
};

export default FeaturedArticle;