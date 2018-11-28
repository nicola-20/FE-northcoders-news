import React, { Component } from "react";
import PropTypes from "prop-types";
import * as api from "../api";
import { Link } from "@reach/router";
import User from "./User";
import "./css/Users.css";

class Users extends Component {
  state = {
    users: [],
    isLoading: true
  };
  render() {
    const { users, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
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
    console.log("user mounted");
    api.getUsers().then(users => {
      this.setState({
        users,
        isLoading: false
      });
    });
  }
}

Users.propTypes = {};

export default Users;
