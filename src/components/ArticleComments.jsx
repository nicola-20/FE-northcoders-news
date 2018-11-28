import React, { Component } from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";
import * as api from "../api";
import "./css/ArticleComments.css";
import AddComment from "./AddComment";

class ArticleComments extends Component {
  state = {
    comments: [],
    isLoading: true
  };
  render() {
    const { comments, isLoading } = this.state;
    const { user, article_id } = this.props;
    if (isLoading) {
      return <p>Loading...</p>;
    } else {
      return (
        <div class="articlebyid-comments-box">
          <AddComment article_id={article_id} user={user}/>
          {comments.map(comment => {
            return (
              <Comment
                key={comment._id}
                comment={comment}
                user={this.props.user}
                deleteComment={this.deleteComment}
              />
            );
          })}
        </div>
      );
    }
  }

  componentDidMount() {
    const { article_id } = this.props;
    console.log("comments mounted");
    api.getCommentsByArticleID(article_id).then(comments => {
      this.setState({
        comments,
        isLoading: false
      });
    });
  }
  deleteComment = comment_id => {
    const { comments } = this.state;
    api.deleteComment(comment_id).then(() => {
      const commentsWithDeletes = comments.map(comment => {
        if (comment._id === comment_id) {
          return { Deleted: "comment was deleted" };
        } else {
          return comment
        }
      });
      this.setState({
        comments: commentsWithDeletes,
        isLoaing: false
      });
    });
  };
}

ArticleComments.propTypes = {};

export default ArticleComments;
