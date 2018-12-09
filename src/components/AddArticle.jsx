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
    title_err: "",
    body_err: "",
    topic_err: ""
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
              {/* Heading */}
              <h4>ADD ARTICLE:</h4>
              {/* Title input */}
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
              <p className="form-error" id="title-error">
                {this.state.title_err}
              </p>

              {/* <br /> */}
              {/* Body input */}
              <label htmlFor="new-article-body" id="body-label">
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
              <p className="form-error" id="body-error">
                {this.state.body_err}
              </p>

              {/* <br /> */}
              {/* User */}
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

              {/* <br /> */}
              {/* Topic */}
              <label htmlFor="new-article-topic" id="topic-label">
                Topic:{" "}
              </label>
              {topic_slug ? (
                <textarea
                  name="topic_slug"
                  className="new-article-topic-set"
                  id="new-article-topic"
                  cols="60"
                  rows="1"
                  readOnly
                  required
                  value={this.props.topic_slug}
                />
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
              <p className="form-error" id="topic-error">
                {this.state.topic_err}
              </p>

              {/* <br /> */}
              {/* Submit */}
              <button
                className="close"
                type="submit"
                onClick={event => {
                  if (
                    this.state.title.length > 1 &&
                    this.state.body.length > 1 &&
                    this.state.topic_slug.length > 1
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
    if (!this.props.topic_slug) {
      this.setState({
        topic_slug: ""
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user !== this.props.user) {
      this.setState({
        created_by: this.props.user._id
      });
    }
    if (prevProps.topic_slug !== this.props.topic_slug) {
      this.setState({
        topic_slug: this.props.topic_slug
      });
    }
    if (prevState.body.length === 0 && this.state.body.length > 0) {
      this.setState({
        body_err: ""
      });
    }
    if (prevState.title.length === 0 && this.state.title.length > 0) {
      this.setState({
        title_err: ""
      });
    }
    // if (prevState.topic_slug) {
      if (
        prevState.topic_slug.length === 0 &&
        this.state.topic_slug.length > 0
      ) {
        this.setState({
          topic_err: ""
        });
      }
    // }
  }
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = event => {
    const { addArticle } = this.props;
    const { title, body, created_by, topic_slug } = this.state;
    event.preventDefault();
    const newArticle = {
      title,
      body,
      created_by
    };
    if (title.length < 1 || body.length < 1 || topic_slug.length < 1) {
      if (title.length < 1) {
        this.setState({
          title_err: "Article needs a title!"
        });
      }
      if (body.length < 1) {
        this.setState({
          body_err: "Article needs some content!"
        });
      }
      if (topic_slug.length < 1) {
        this.setState({
          topic_err: "Article needs a topic!"
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
