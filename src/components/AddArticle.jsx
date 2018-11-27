import React, { Component } from "react";
import PropTypes from "prop-types";
import Popup from "reactjs-popup";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/AddArticle.css";
import ReactTooltip from "react-tooltip";
import Login from "./Login";
import * as api from "../api";

// const postedArticle = {
//   "title": "new article",
//   "body": "This is my new article content",
//   "created_by": `${userDocs[0]._id}`
// }

class AddArticle extends Component {
  state = {
    title: "",
    body: "",
    created_by: ""
  };
  render() {
    console.log(this.state, 'state addarticle')
    const { user } = this.props;
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
            />
          }
          modal
          closeOnDocumentClick
        >
          <ReactTooltip type="dark" />
          <form className="add-article-form" onSubmit={this.handleSubmit}>
            <h4>Add new article:</h4>
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
            <br />
            <label htmlFor="new-article-user" id="user-label">
              User:{" "}
            </label>
            {/* <input type="text" name="user" id="new-article-user" value={this.props.user.username}/> */}
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
            <button>Add Article</button>
          </form>
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
          />
          <ReactTooltip type="dark" />
        </>
      );
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
    const topic_slug = this.props.topic_slug;
    // const newArticle = this.state
    const newArticle = {
      title: this.state.title,
      body: this.state.body,
      created_by: this.state.created_by
    }
    console.log(newArticle, 'new article inside add article')
    api.addArticleToTopic(topic_slug, newArticle);
  };
}

AddArticle.propTypes = {};

export default AddArticle;
