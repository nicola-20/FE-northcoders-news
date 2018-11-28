import React from "react";
import PropTypes from "prop-types";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";
import './css/ArticleComments.css'
import './css/Article.css'

const VoteChanger = ({
  article,
  handleArticleVoteChange,
  comment,
  handleCommentVoteChange,
  user
}) => {
  if (comment) {
    if (user.username) {
      // if logged in
      return (
        <div className="comment-votes">
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
      );
    } else {
      // if not logged in
      return (
        <div className="comment-votes">
          <ReactTooltip type="dark" />
          <FontAwesomeIcon
            className="icon thumb up"
            icon={faThumbsUp}
            data-tip="You must be logged in to vote!"
          />
          <p>{comment.votes}</p>
          <FontAwesomeIcon
            className="icon thumb down"
            icon={faThumbsDown}
            data-tip="You must be logged in to vote!"
          />
        </div>
      );
    }
  } else if (article) {
    if (user.username) {
      // if logged in
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
      );
    } else {
      // if not logged in
      return (
        <div className="article-votes">
          <ReactTooltip type="dark" />
          <FontAwesomeIcon
            className="icon thumb up"
            icon={faThumbsUp}
            data-tip="You must be logged in to vote!"
          />
          <p>{article.votes}</p>
          <FontAwesomeIcon
            className="icon thumb down"
            icon={faThumbsDown}
            data-tip="You must be logged in to vote!"
          />
        </div>
      );
    }
  }
};

VoteChanger.propTypes = {};

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
