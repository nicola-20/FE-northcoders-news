import React, { Component } from "react";
import PropTypes from "prop-types";
import Popup from "reactjs-popup";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/AddArticle.css";
import ReactTooltip from "react-tooltip";

// const postedArticle = {
//   "title": "new article",
//   "body": "This is my new article content",
//   "created_by": `${userDocs[0]._id}`
// }

class AddArticle extends Component {
  state = {
    newArticle: {
      title: "",
      body: "",
      created_by: ""
    }
  };
  render() {
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
        <form className="add-article-form">
          <ReactTooltip type="dark" />
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
            value={this.state.newArticle.title}
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
            value={this.state.newArticle.body}
          />
          <label htmlFor="new-article-user" id="user-label">
            User:{" "}
          </label>
          <textarea
            name="user"
            id="new-article-user"
            cols="60"
            rows="1"
            readonly
            required
            value={this.props.user.username}
          />
          <button>Add Article</button>
        </form>
      </Popup>
    );
  }
  componentDidMount() {
    const { user } = this.props
    this.setState({
      created_by: user._id
    })
  }
}

AddArticle.propTypes = {};

export default AddArticle;
