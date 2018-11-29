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
import ReactTooltip from "react-tooltip";
import Login from "./Login";

class Nav extends Component {
  state = {
    topics: []
  };
  render() {
    const { topics } = this.state;
    const { user, login, logout } = this.props
    return (
      <nav className="Nav">
        <Link to="articles">
          <FontAwesomeIcon
            data-tip="View All Articles"
            className="icon"
            icon={faNewspaper}
          />
          <ReactTooltip type="dark" />
        </Link>
        <FontAwesomeIcon
          className="icon"
          icon={faCode}
          data-tip="Coding Articles"
        />
        <FontAwesomeIcon
          className="icon"
          icon={faFutbol}
          data-tip="Football Articles"
        />
        <FontAwesomeIcon
          className="icon"
          icon={faUtensils}
          data-tip="Cooking Articles"
        />
        {topics.map(topic => {
          return (
            <Link key={topic.slug} to={`topics/${topic.slug}/articles`}>
              {topic.title.toUpperCase()}
            </Link>
          );
        })}

        <Link to="users">
          <FontAwesomeIcon
            className="icon"
            icon={faUserAlt}
            data-tip="View All Users"
          />
          View Users
        </Link>
        <Login login={login} logout={logout} user={user}/>
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
