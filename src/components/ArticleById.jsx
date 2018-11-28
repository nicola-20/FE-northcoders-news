import React, { Component } from "react";
import PropTypes from "prop-types";
import { Router, Link } from "@reach/router";
import "./css/ArticleById.css";
import * as api from "../api.js";
import ArticleComments from "./ArticleComments";
import VoteChanger from "./VoteChanger";
import { faCommentAlt, faComments } from "@fortawesome/free-regular-svg-icons";
// import { faComments, faComment, faCommentAlt } from "@fortawesome/free-solid-svg-icons"
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
    },
    isLoading: true
  };
  render() {
    const { article, isLoading } = this.state;
    const { user } = this.props;
    if (isLoading) {
      return <p>Loading...</p>;
    } else {
      return (
        <main className="ArticleById">
        <div className="article-byid">
          <h2 className="articlebyid-title">{article.title}</h2>
          <VoteChanger article={article} user={user}/>
          <p className="articlebyid-topic">Topic: {`${article.belongs_to}`}</p>
          <p className="articlebyid-user">
            Created by:{" "}
            <Link to={`/users/${article.created_by.username}`}>
              {article.created_by.name}({article.created_by.username})
            </Link>
          </p>
          <p className="articlebyid-date">Created at: {new Date(article.created_at).toUTCString()}</p>
          <div className="articlebyid-body">{article.body}</div>
          <p className="articlebyid-comments">
            <Link to={`/articles/${article._id}/comments`}>
              <FontAwesomeIcon className="icon" icon={faComments} />
              {article.comment_count} comments
            </Link>
          </p>
          </div>

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
  }

  componentDidMount() {
    console.log("article mounted");
    const { article_id } = this.props;
    api.getArticleByID(article_id).then(article => {
      this.setState({
        article,
        isLoading: false
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
