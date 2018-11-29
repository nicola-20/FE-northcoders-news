import React, { Component } from "react";
import PropTypes from "prop-types";
import "./css/ArticleComments.css";

class AddComment extends Component {
  state = {
    body: "",
    created_by: ""
  };
  render() {
    const { user } = this.props;
    if (user.username) {
      // if logged in
      return (
        <div className="add-comment">
          <h4>Add Comment</h4>
          <form onSubmit={this.handleSubmit}>
            <br />
            <label htmlFor="new-comment-body" id="comment-content-label">
              {`Comment as ${user.username}`}
            </label>
            <br />
            <textarea
              name="body"
              id="new-comment-body"
              cols="60"
              rows="2"
              required
              value={this.state.body}
              onChange={this.handleChange}
            />
            <button type="submit">Add Comment</button>
          </form>
        </div>
      );
    } else {
      // if not logged in
      return <p>You must be logged in to post a comment</p>;
    }
  }
  componentDidMount() {
    const { user } = this.props;
    this.setState({
      created_by: user._id
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user !== this.props.user) {
      this.setState({
        created_by: this.props.user._id
      });
    }
  }
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { article_id, addComment } = this.props;
    const newComment = {
      body: this.state.body,
      created_by: this.state.created_by
    };
    addComment(article_id, newComment);
    this.setState({
      body: "",
      created_by: ""
    });
  };
}

AddComment.propTypes = {
  addComment: PropTypes.func,
  article_id: PropTypes.string,
  user: PropTypes.object
};

export default AddComment;
