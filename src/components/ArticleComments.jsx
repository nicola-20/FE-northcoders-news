import React, { Component } from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";
import * as api from "../api";
import "./css/ArticleComments.css";
import AddComment from "./AddComment";
import { faSearch, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ArticleComments extends Component {
  state = {
    comments: [],
    sort: "created_at desc",
    isLoading: true
  };
  render() {
    const { comments, isLoading } = this.state;
    const { user, article_id, updateVotes } = this.props;
    if (isLoading) {
      return <p>Loading...</p>;
    } else {
      return (
        <div className="articlebyid-comments-box">
          <AddComment
            article_id={article_id}
            user={user}
            addComment={this.addComment}
          />

          <div className="articlebyid-comment-sort">
            <FontAwesomeIcon icon={faSort} />
            <label htmlFor="sort-select">Sort:</label>
            <select
              name="sort-select"
              id="sort-select"
              onChange={this.handleChangeSort}
              value={this.state.sort}
            >
              <option value="">Sort by...</option>
              <option value="votes asc">Votes (Low-High)</option>
              <option value="votes desc">Votes (High-Low)</option>
              <option value="created_at asc">Date (Oldest-Newest)</option>
              <option value="created_at desc">Date (Newest-Oldest)</option>
            </select>
          </div>

          {comments.map(comment => {
            return (
              <Comment
                key={comment._id}
                comment={comment}
                user={this.props.user}
                deleteComment={this.deleteComment}
                updateVotes={updateVotes}
                handleCommentVoteChange={this.handleCommentVoteChange}
              />
            );
          })}
        </div>
      );
    }
  }

  componentDidMount() {
    console.log("comments mounted");
    this.fetchComments();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort !== this.state.sort) {
      this.fetchComments();
    }
  }
  fetchComments = () => {
    const { article_id } = this.props;
    const { sort } = this.state;
    api.getCommentsByArticleID(article_id, sort).then(comments => {
      this.setState({
        comments,
        isLoading: false
      });
    });
  };
  deleteComment = comment_id => {
    const { comments } = this.state;
    api.deleteComment(comment_id).then(() => {
      this.props.updateCommentCount(-1)
      const commentsWithDeletes = comments.filter(comment => {
        return comment._id !== comment_id;
      });
      this.setState({
        comments: commentsWithDeletes,
        isLoading: false
      });
    });
  };
  addComment = (article_id, newComment) => {
    const { comments } = this.state;
    api.addCommentToArticle(article_id, newComment).then(addedComment => {
      this.props.updateCommentCount(1)
      const commentsWithNewCommentAdded = [addedComment, ...comments];
      this.setState({
        comments: commentsWithNewCommentAdded,
        isLoading: false
      });
    });
  };
  handleCommentVoteChange = (comment_id, change) => {
    this.props.updateVotes("comment", comment_id, change);
    let voteChange = 0;
    if (change === "up") voteChange = +1;
    if (change === "down") voteChange = -1;
    const { comments, sort } = this.state;
    const updatedComments = comments.map(comment => {
      if (comment._id === comment_id) {
        return { ...comment, votes: comment.votes + voteChange };
      } else {
        return comment;
      }
    });
    if (sort.split(" ")[0] === "votes") {
      const direction = sort.split(" ")[1];
      let sortedComments = [];
      if (direction === "asc") {
        sortedComments = updatedComments.sort((a, b) => {
          if (a.votes < b.votes) {
            return -1;
          } else if (a.votes > b.votes) {
            return 1;
          } else {
            return 0;
          }
        });
      } else if (direction === "desc") {
        sortedComments = updatedComments.sort((a, b) => {
          if (a.votes < b.votes) {
            return 1;
          } else if (a.votes > b.votes) {
            return -1;
          } else {
            return 0;
          }
        });
      }
      this.setState({
        comments: sortedComments
      });
    } else {
      this.setState({
        comments: updatedComments
      });
    }
  };

  handleChangeSort = event => {
    const sort = event.target.value;
    this.setState({
      sort
    });
  };
}

ArticleComments.propTypes = {};

export default ArticleComments;
