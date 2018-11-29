import React, { Component } from "react";
import PropTypes from "prop-types";
import * as api from "../api";
import "./css/UserByUsername.css";
import Loading from "./Loading";
import { navigate } from '@reach/router'

class UserByUsername extends Component {
  state = {
    user: {
      _id: "",
      username: "",
      name: "",
      avatar_url: "",
      __v: 0
    },
    isLoading: true
  };
  render() {
    const { user, isLoading } = this.state;
    if (isLoading) {
      return (
        <Loading />
      );
    } else {
      return (
        <div className="user-page">
          <div className="userbyusername-box">
            <h4>{user.name}</h4>
            <p>{user.username}</p>
            <img src={`${user.avatar_url}`} alt={`${user.name}`} />
          </div>
        </div>
      );
    }
  }
  componentDidMount() {
    const { username } = this.props;
    api.getUserByUsername(username).then(user => {
      this.setState({
        user,
        isLoading: false
      });
    })
    .catch((err) => {
      navigate("/error", {state: {code: err.response.status, message: err.response.statusText}})
    })
  }
}

UserByUsername.propTypes = {
  user: PropTypes.object,
};

export default UserByUsername;
