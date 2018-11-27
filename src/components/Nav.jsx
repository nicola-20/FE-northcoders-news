import React, { Component } from "react";
// import PropTypes from "prop-types";
import { Link } from "@reach/router";
import * as api from "../api";
import "./css/Nav.css";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import {
  faCode,
  faFutbol,
  faUtensils,
  faUserAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Nav extends Component {
  state = {
    topics: []
  };
  render() {
    const { topics } = this.state;
    return (
      <nav className="Nav">
        <Link to="articles">
          <FontAwesomeIcon className="icon" icon={faNewspaper} />
          All Articles
        </Link>
        <FontAwesomeIcon className="icon" icon={faCode} />
        <FontAwesomeIcon className="icon" icon={faFutbol} />
        <FontAwesomeIcon className="icon" icon={faUtensils} />
        {topics.map(topic => {
          return (
            <Link key={topic.slug} to={`topics/${topic.slug}/articles`}>
              {topic.title}
            </Link>
          );
        })}

        <Link to="users">
          <FontAwesomeIcon className="icon" icon={faUserAlt} />
          Users
        </Link>
      </nav>
    );
  }

  componentDidMount() {
    api.getTopics().then(topics => {
      this.setState({
        topics
      });
    });
  }
}

// Nav.propTypes = {

// };

export default Nav;
