import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, navigate } from "@reach/router";
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
    const { user, login, logout } = this.props;
    return (
      <nav className="Nav">
        <Link to="articles">
          <FontAwesomeIcon
            data-tip="View All Articles"
            data-for="all-articles-icon"
            className="icon"
            icon={faNewspaper}
          />
        </Link>
        <ReactTooltip type="dark" id="all-articles-icon" />
        <Link to="topics/coding/articles">
        <FontAwesomeIcon
          className="icon"
          icon={faCode}
          data-tip="Coding Articles"
          data-for="coding-articles-icon"
          />
          </Link>
        <ReactTooltip type="dark" id="coding-articles-icon" />
        <Link to="topics/football/articles">
        <FontAwesomeIcon
          className="icon"
          icon={faFutbol}
          data-tip="Football Articles"
          data-for="football-articles-icon"
        />
        </Link>
        <ReactTooltip type="dark" id="football-articles-icon" />
        <Link to="topics/cooking/articles">
        <FontAwesomeIcon
          className="icon"
          icon={faUtensils}
          data-tip="Cooking Articles"
          data-for="cooking-articles-icon"
        />
        </Link>
        <ReactTooltip type="dark" id="cooking-articles-icon" />
        {topics.map(topic => {
          return (
            <Link key={topic.slug} to={`topics/${topic.slug}/articles`}>
              {topic.title.toUpperCase()}
            </Link>
          );
        })}

        <Link to="users" data-tip="View All Users" data-for="view-users">
          <FontAwesomeIcon className="icon" icon={faUserAlt} />{' '}
          USERS 
        </Link>
        <ReactTooltip type="dark" id="view-users" />
        <Login login={login} logout={logout} user={user} />
      </nav>
    );
  }

  componentDidMount() {
    api.getTopics().then(topics => {
      this.setState({
        topics
      });
    })
    .catch((err) => {
      navigate("/error", {state: {code: err.response.status, message: err.response.statusText}})
    })
  }
}

Nav.propTypes = {
  login: PropTypes.func,
  logout: PropTypes.func,
  user: PropTypes.object
};

export default Nav;
