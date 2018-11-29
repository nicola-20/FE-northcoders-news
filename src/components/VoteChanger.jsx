import React, { Component } from "react";
import PropTypes from "prop-types";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";
import "./css/ArticleComments.css";
import "./css/Article.css";

class VoteChanger extends Component {
  state = {
    vote: ""
  };
  render() {
    const {
      article,
      handleArticleVoteChange,
      comment,
      handleCommentVoteChange,
      user
    } = this.props;
    if (comment) {
      return (
        <div className="comment-votes">
          <button
            value="up"
            disabled={this.state.vote === "up" || !user.username}
            onClick={event => {
              this.vote("up");
              handleCommentVoteChange(comment._id, "up");
            }}
          >
            <FontAwesomeIcon
              className="icon thumb up"
              icon={faThumbsUp}
              data-tip={
                user.username
                  ? this.state.vote === "up"
                    ? "You can only vote once!"
                    : "Vote Up"
                  : "You must be logged in to vote!"
              }
              data-for="comment-up"
            />
            <ReactTooltip type="dark" id="comment-up"/>
          </button>
          <p>{comment.votes}</p>
          <button
            value="down"
            disabled={this.state.vote === "down" || !user.username}
            onClick={event => {
              this.vote("down");
              handleCommentVoteChange(comment._id, "down");
            }}
          >
            <FontAwesomeIcon
              className="icon thumb down"
              icon={faThumbsDown}
              data-tip={
                user.username
                  ? this.state.vote === "down"
                    ? "You can only vote once!"
                    : "Vote Down"
                  : "You must be logged in to vote!"
              }
              data-for="comment-down"
            />
            <ReactTooltip type="dark" id="comment-down"/>
          </button>
        </div>
      );
    } else if (article) {
      return (
        <div className="article-votes">
          <button
            value="up"
            disabled={this.state.vote === "up" || !user.username}
            onClick={event => {
              this.vote("up");
              handleArticleVoteChange(article._id, "up");
            }}
          >
            <FontAwesomeIcon
              className="icon thumb up"
              icon={faThumbsUp}
              data-tip={
                user.username
                  ? this.state.vote === "up"
                    ? "You can only vote once!"
                    : "Vote Up"
                  : "You must be logged in to vote!"
              }
              data-for="article-up"
            />
            <ReactTooltip type="dark" id="article-up"/>
          </button>
          <p>{article.votes}</p>
          <button
            value="down"
            disabled={this.state.vote === "down" || !user.username}
            onClick={event => {
              this.vote("down");
              handleArticleVoteChange(article._id, "down");
            }}
          >
            <FontAwesomeIcon
              className="icon thumb down"
              icon={faThumbsDown}
              data-tip={
                user.username
                  ? this.state.vote === "down"
                    ? "You can only vote once!"
                    : "Vote Down"
                  : "You must be logged in to vote!"
              }
              data-for="article-down"
            />
            <ReactTooltip type="dark" id="article-down"/>
          </button>
        </div>
      );
    }
  }
  vote = vote => {
    this.setState({
      vote
    });
  };
}

VoteChanger.propTypes = {
  handleArticleVoteChange: PropTypes.func,
  handleCommentVoteChange: PropTypes.func,
  user: PropTypes.object,
  comment: PropTypes.object,
  article: PropTypes.object
};

export default VoteChanger;
