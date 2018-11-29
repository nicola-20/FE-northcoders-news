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
    username: _.sample([
      "jessjelly",
      "tickle122",
      "grumpy19",
      "happyamy2016",
      "cooljmessy",
      "weegembump"
    ]),
    password: "password",
    loggedIn: false
  };
  render() {
    console.log(this.props, "login props");
    const { user } = this.props;
    if (user.username) {
      return (
        <>
          <FontAwesomeIcon
            className="icon"
            icon={faSignOutAlt}
            data-tip="Log Out"
            onClick={this.handleLogout}
          />
          <ReactTooltip type="dark" />
        </>
      );
    } else {
      return (
        <Popup
          className="input-popup"
          trigger={
            <FontAwesomeIcon
              className="icon"
              icon={faSignInAlt}
              data-tip="Log In"
            />
          }
          position="bottom right"
        >
          <form onSubmit={this.handleSubmit}>
            <ReactTooltip type="dark" />
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
            <br />
            <button>Log in</button>
          </form>
        </Popup>
      );
    }
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
    api.getUserByUsername(this.state.username).then(user => {
      login(user);
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
