import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, navigate } from "@reach/router";
import "./css/ArticleById.css";
import * as api from "../api.js";
import ArticleComments from "./ArticleComments";
import VoteChanger from "./VoteChanger";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "./Loading";

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
    const { user, updateVotes } = this.props;
    if (isLoading) {
      return <Loading />;
    } else {
      return (
        <main className="ArticleById">
          <div className="article-byid">
            <h2 className="articlebyid-title">{article.title}</h2>
            <VoteChanger
              article={article}
              user={user}
              updateVotes={updateVotes}
              handleArticleVoteChange={this.handleArticleVoteChange}
            />
            <p className="articlebyid-topic">
              Topic:{" "}
              <strong>
                <Link to={`/topics/${article.belongs_to}/articles`}>{`${
                  article.belongs_to
                }`}</Link>
              </strong>
            </p>
            <p className="articlebyid-user">
              Created by:{" "}
              <strong>
                <Link to={`/users/${article.created_by.username}`}>
                  {article.created_by.name} ({article.created_by.username})
                </Link>
              </strong>
            </p>
            <p className="articlebyid-date">
              Created at:{" "}
              <strong>{new Date(article.created_at).toUTCString()}</strong>
            </p>
            <div className="articlebyid-body">{article.body}</div>
            <p className="articlebyid-comments">
              {/* <Collapsible
                trigger={
                  <> */}
                    <FontAwesomeIcon className="icon" icon={faCommentAlt} />
                    <strong>{article.comment_count}</strong> comments
                  {/* </>
                }
              > */}
              {/* </Collapsible> */}
              {/* <Link to={`/articles/${article._id}/comments`}>
                <FontAwesomeIcon className="icon" icon={faCommentAlt} />{" "}
                <strong>{article.comment_count}</strong> comments
              </Link> */}
            </p>
          </div>
              <ArticleComments
                article_id={this.state.article._id}
                user={user}
                updateVotes={updateVotes}
                updateCommentCount={this.updateCommentCount}
              />
          {/* <Router>
            <ArticleComments
              path="/comments"
              article_id={this.state.article._id}
              user={user}
              updateVotes={updateVotes}
              updateCommentCount={this.updateCommentCount}
            />
          </Router> */}
        </main>
      );
    }
  }

  componentDidMount() {
    const { article_id } = this.props;
    api
      .getArticleByID(article_id)
      .then(article => {
        this.setState({
          article,
          isLoading: false
        });
      })
      .catch(err => {
        navigate("/error", {
          state: { code: err.response.status, message: err.response.statusText }
        });
      });
    // .catch(err => {
    //   console.log(err, 'error')
    //   this.setState({ err });
    // });
  }
  handleArticleVoteChange = (article_id, change) => {
    this.props.updateVotes("article", article_id, change);
    const { article } = this.state;
    let voteChange = 0;
    if (change === "up") voteChange = +1;
    if (change === "down") voteChange = -1;
    const updatedArticle = { ...article, votes: article.votes + voteChange };
    this.setState({
      article: updatedArticle
    });
  };
  updateCommentCount = change => {
    const { article } = this.state;
    const updatedArticle = {
      ...article,
      comment_count: article.comment_count + change
    };
    this.setState({
      article: updatedArticle
    });
  };
}

ArticleById.propTypes = {
  user: PropTypes.object,
  article_id: PropTypes.string,
  updateVotes: PropTypes.func
};

export default ArticleById;
