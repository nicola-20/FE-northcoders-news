import React, { Component } from "react";
import PropTypes from "prop-types";
import * as api from "../api";

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
      return <p>Loading...</p>;
    } else {
      return (
        <div>
          <p>{user.name}</p>
          <p>{user.username}</p>
          <img src={`${user.avatar_url}`} alt={`${user.name}`} />
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
    });
  }
}

UserByUsername.propTypes = {};

export default UserByUsername;
