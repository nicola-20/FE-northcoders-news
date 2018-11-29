import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import "./css/Users.css";

const User = ({ user }) => {
  return (
    <div className="user-card">
      <Link to={`/users/${user.username}`}>
        <h4 key={user._id}>{user.name}</h4>
      </Link>
      <Link to={`/users/${user.username}`}>
        <p><strong>username: </strong> {user.username}</p>
      </Link>
      <br />
      <Link to={`/users/${user.username}`}>
        <img src={`${user.avatar_url}`} alt={`${user.name}`} />
      </Link>
    </div>
  );
};

User.propTypes = {};

export default User;
