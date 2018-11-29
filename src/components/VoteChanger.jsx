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
          <ReactTooltip type="dark" />
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
            />
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
            />
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
            />
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
            />
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

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// <Voter type="article"/>
// <Voter type="comment"/>

// class Voter extends Component {
//   const { err, voteMod } = this.state
//   const { votes } = this.props
//   state = {
//     voteMod: 0
//   }
//   render() {
//     return (
//       <div>
//         {err ? (<p>Something went wrong</p>) : (<><button onClick={() => {this.vote('up')}} disabled={voteMod === 1}>Like</button>Votes: {votes + voteMod}<button onClick={() => {this.vote('down')}} disabled={voteMod === -1}>Dislike</button></>)}
//       </div>
//     );
//   }
//   vote = (direction) => {
//     api.vote(this.props.id, direction)
//     .catch(err => {
//       this.setState({
//         err
//       })
//     })
//     this.setState({
//       voteMod: direction === 'up' ? 1 : -1
//     })
//   }
// }

// VoteChanger.propTypes = {

// };

// export default VoteChanger;
