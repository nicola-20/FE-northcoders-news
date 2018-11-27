import React, { Component } from "react";
import PropTypes from "prop-types";
import * as api from "../api";
import { Link } from "@reach/router";

class Users extends Component {
  state = {
    users: []
  };
  render() {
    const { users } = this.state;
    return (
      <ul>
        {users.map(user => {
          console.log(user, 'user')
          return (
            <li key={user._id}>
              <Link to={`/users/${user.username}`}>{user.name}</Link>
              <img src={`${user.avatar_url}`} alt={`${user.name}`}/>
            </li>
          );
        })}
      </ul>
    );
  }
  componentDidMount() {
    console.log('user mounted')
    api.getUsers().then(users => {
      this.setState({
        users
      });
    });
  }
}

Users.propTypes = {};

export default Users;
