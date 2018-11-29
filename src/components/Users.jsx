import React, { Component } from "react";
import PropTypes from "prop-types";
import * as api from "../api";
import User from "./User";
import "./css/Users.css";
import Loading from "./Loading";
import { navigate } from '@reach/router'

class Users extends Component {
  state = {
    users: [],
    isLoading: true
  };
  render() {
    const { users, isLoading } = this.state;
    if (isLoading) {
      return (
        <Loading />
      );
    } else {
      return (
        <div className="users-list">
          {users.map(user => {
            return <User user={user} />;
          })}
        </div>
      );
    }
  }
  componentDidMount() {
    api.getUsers().then(users => {
      this.setState({
        users,
        isLoading: false
      });
    })
    .catch((err) => {
      navigate("/error", {state: {code: err.response.status, message: err.response.statusText}})
    })
  }
}

Users.propTypes = {
  user: PropTypes.object,
};

export default Users;
