import React, { Component } from "react";
import PropTypes from "prop-types";
import * as api from "../api";
import Popup from "reactjs-popup";
import ReactTooltip from "react-tooltip";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/Login.css";
import _ from "lodash";

class Login extends Component {
  state = {
    username: "",
    password: "password",
    loggedIn: false,
    err: ""
  };
  render() {
    const { user } = this.props;
    if (user.username) {
      return (
        <>
          <FontAwesomeIcon
            className="icon"
            icon={faSignOutAlt}
            data-tip="Log Out"
            data-for="log-out-button"
            onClick={this.handleLogout}
          />
          <ReactTooltip type="dark" id="log-out-button" />
        </>
      );
    } else {
      return (
        <>
          <ReactTooltip type="dark" id="log-in-button" />
          <Popup
            className="input-popup"
            trigger={
              <FontAwesomeIcon
                className="icon"
                icon={faSignInAlt}
                data-tip="Log In"
                data-for="log-in-button"
              />
            }
            position="bottom right"
          >
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                id="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <p className="login form-error">
                {this.state.err ? "Username does not exist!" : ""}
              </p>
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
              <br />
              <button>LOG IN</button>
            </form>
          </Popup>
        </>
      );
    }
  }
  componentDidMount() {
    api
      .getUsers()
      .then(users => {
        const usernames = users.map(user => {
          return user.username;
        });
        this.setState({
          username: _.sample(usernames)
        });
      })
      .catch(err => {
        this.setState({
          err
        });
      });
  }
  handleChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };
  handleSubmit = event => {
    const { login } = this.props;
    event.preventDefault();
    api
      .getUserByUsername(this.state.username)
      .then(user => {
        login(user);
      })
      .catch(err => {
        this.setState({ err });
        // navigate("/error", {state: {code: err.response.status, message: err.response.statusText}})
      });
    this.setState({
      loggedIn: true
    });
  };
  handleLogout = event => {
    const { logout } = this.props;
    logout();
    this.setState({
      loggedIn: false
    });
  };
}

Login.propTypes = {
  login: PropTypes.func,
  logout: PropTypes.func,
  user: PropTypes.object
};

export default Login;
