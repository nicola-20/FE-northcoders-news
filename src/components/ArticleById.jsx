import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import "./css/ArticleById.css";
import * as api from "../api.js";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ArticleById extends Component {
  state = {
    article: {
      _id: "",
      votes: 0,
      title: "",
      created_by: {
        username: "",
        name: ""
      },
      body: "",
      created_at: "",
      belongs_to: "",
      __v: 0,
      comment_count: 0
    }
  };
  render() {
    const { handleVoteChange } = this.props;
    console.log(this.props.article_id, "article_id");
    const { article } = this.state;
    console.log(article, "article");
    console.log(this.state, "state");
    return (
      <main className="ArticleById">
        <h2>{article.title}</h2>
        <p>Topic: {`${article.belongs_to}`}</p>
        <p>
          Created by:{" "}
          <Link to={`/users/${article.created_by.username}`}>
            {article.created_by.name}, {article.created_by.username}
          </Link>
        </p>
        <p>Created at: {new Date(article.created_at).toUTCString()}</p>
        <div>{article.body}</div>
        <p>
          <Link to={`/articles/${article._id}/comments`}>
            {article.comment_count} comments
          </Link>
        </p>
        <div className="voteChanger">
          <button
            onClick={() => {
              handleVoteChange(article._id, "up");
            }}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
            Up
          </button>
          <br />
          {article.votes} votes
          <br />
          <button
            onClick={() => {
              handleVoteChange(article._id, "down");
            }}
          >
            <FontAwesomeIcon icon={faThumbsDown} />
            Down
          </button>
        </div>
      </main>
    );
  }

  componentDidMount() {
    console.log("article mounted");
    const { article_id } = this.props;
    api.getArticleByID(article_id).then(article => {
      this.setState({
        article
      });
    });
  }
}

ArticleById.propTypes = {};

export default ArticleById;
