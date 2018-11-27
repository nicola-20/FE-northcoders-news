import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api'

class Login extends Component {
  state = {
    username: 'jessjelly',
  }
  render() {
    if (this.props.user.username) {
      return this.props.children
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">username: </label>
          <input type="text" id="username" value={this.state.username} onChange={this.handleChange}/>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" onChange={this.handleChange}/>
          <button>Log in</button>
        </form>
      );
    }
  }
  handleChange = (event) => {
    const { id, value } = event.target
    this.setState({
      [id]: value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    api.login(this.state.username)
    .then((user) => {
      this.props.login(user)
    })
  }
}

Login.propTypes = {

};

export default Login;