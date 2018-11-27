import React, { Component } from "react";
import PropTypes from "prop-types";
import { Router, Link } from "@reach/router";
import "./css/ArticleById.css";
import * as api from "../api.js";
import ArticleComments from "./ArticleComments";
import VoteChanger from "./VoteChanger";

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
    // isLoading
  };
  render() {
    const { article } = this.state;
    const { user } = this.props;
    // if (isLoading)
    return (
      <main className="ArticleById">
        <h2>{article.title}</h2>
        <VoteChanger article={article} user={user}/>
        <p>Topic: {`${article.belongs_to}`}</p>
        <p>
          Created by:{" "}
          <Link to={`/users/${article.created_by.username}`}>
            {article.created_by.name}({article.created_by.username})
          </Link>
        </p>
        <p>Created at: {new Date(article.created_at).toUTCString()}</p>
        <div>{article.body}</div>
        <p>
          <Link to={`/articles/${article._id}/comments`}>
            {article.comment_count} comments
          </Link>
        </p>

        <Router>
          <ArticleComments
            path="/comments"
            article_id={this.state.article._id}
            user={user}
          />
        </Router>
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
    // return Promise.all([api.getArticleByID(article_id), api.getCommentsByArticleID(article_id)])
    // .then(([article, comments]) => {
    //   this.setState({
    //     article, comments
    //   });
    // });
  }
}

ArticleById.propTypes = {};

export default ArticleById;
