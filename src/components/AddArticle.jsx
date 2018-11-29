import React, { Component } from "react";
import PropTypes from "prop-types";
import Popup from "reactjs-popup";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/AddArticle.css";
import ReactTooltip from "react-tooltip";

class AddArticle extends Component {
  state = {
    title: "",
    body: "",
    created_by: "",
    topic_slug: "",
    err: ""
  };
  render() {
    const { user, topic_slug } = this.props;
    if (user.username) {
      // if logged in
      return (
        <Popup
          className="article-popup"
          trigger={
            <FontAwesomeIcon
              className="icon plus"
              icon={faPlusSquare}
              data-tip="Add Article"
              data-for="plus-icon-add"
            />
          }
          modal
          // closeOnDocumentClick
        >
          {close => (
            <form className="add-article-form" onSubmit={this.handleSubmit}>
              <ReactTooltip type="dark" id="plus-icon-add" />
              <h4>Add Article:</h4>
              <label htmlFor="new-article-title" id="title-label">
                Title:
              </label>
              <textarea
                name="title"
                id="new-article-title"
                cols="60"
                rows="2"
                required
                value={this.state.title}
                onChange={this.handleChange}
              />
              <p className="form-error">
                {this.state.err ? "Article needs a title" : ""}
              </p>
              <br />
              <label htmlFor="new-article-body" id="content-label">
                Content:{" "}
              </label>
              <textarea
                name="body"
                id="new-article-body"
                cols="60"
                rows="10"
                required
                value={this.state.body}
                onChange={this.handleChange}
              />
              <p className="form-error">
                {this.state.err ? "Article needs some content" : ""}
              </p>
              <br />
              <label htmlFor="new-article-user" id="user-label">
                User:{" "}
              </label>
              <textarea
                name="user"
                id="new-article-user"
                cols="60"
                rows="1"
                readOnly
                required
                value={this.props.user.username}
              />
              <br />
              <label htmlFor="new-article-topic" id="topic-label">
                Topic:{" "}
              </label>
              {topic_slug ? (
                <select
                  name="topic_slug"
                  required
                  readOnly
                  value={this.props.topic_slug}
                  id="new-article-topic"
                >
                  <option>Choose a topic...</option>
                  <option>coding</option>
                  <option>football</option>
                  <option>cooking</option>
                </select>
              ) : (
                <select
                  name="topic_slug"
                  required
                  value={this.state.topic_slug}
                  id="new-article-topic"
                  onChange={this.handleChange}
                >
                  <option value="">Choose a topic...</option>
                  <option value="coding">coding</option>
                  <option value="football">football</option>
                  <option value="cooking">cooking</option>
                </select>
              )}
              <br />
              <button
                className="close"
                type="submit"
                onClick={event => {
                  if (
                    this.state.title.length > 1 &&
                    this.state.body.length > 1
                  ) {
                    close();
                  }
                  this.handleSubmit(event);
                }}
              >
                POST
              </button>
            </form>
          )}
        </Popup>
      );
    } else {
      // if not logged in
      return (
        <>
          <FontAwesomeIcon
            className="icon plus"
            icon={faPlusSquare}
            data-tip="You must be logged in to add an article!"
            data-for="plus-icon-login"
          />
          <ReactTooltip type="dark" id="plus-icon-login" />
        </>
      );
    }
  }
  componentDidMount() {
    const { user, topic_slug } = this.props;
    this.setState({
      created_by: user._id,
      topic_slug
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
    const { addArticle } = this.props;
    const { topic_slug } = this.state;
    event.preventDefault();
    const newArticle = {
      title: this.state.title,
      body: this.state.body,
      created_by: this.state.created_by
    };
    if (newArticle.title.length < 1 || newArticle.body.length < 1) {
      if (newArticle.title.length < 1) {
        this.setState({
          err: "Article must have a title!"
        });
      }
      if (newArticle.body.length < 1) {
        this.setState({
          err: "Article must have some content!"
        });
      }
    } else {
      addArticle(topic_slug, newArticle);
      this.setState({
        title: "",
        body: ""
      });
    }
  };
}

AddArticle.propTypes = {
  user: PropTypes.object,
  topic_slug: PropTypes.string,
  addArticle: PropTypes.func
};

export default AddArticle;
