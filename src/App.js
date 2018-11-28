import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Articles from "./components/Articles";
import Users from "./components/Users";
import UserByUsername from "./components/UserByUsername";
import ArticleById from "./components/ArticleById";

class App extends Component {
  state = {
    user: {}
  };
  render() {
    console.log(this.state.user, 'user in app state')
    return (
      <div className="App">
        <Header />
        <Nav login={this.login} logout={this.logout} user={this.state.user} />
        {/* <Login login={this.login} user={this.state.user}> */}
        <Router>
          <Home path="/" />
          <Articles path="/articles" user={this.state.user} />
          <Articles
            path="/topics/:topic_slug/articles"
            user={this.state.user}
          />
          <ArticleById path="articles/:article_id/*" user={this.state.user} />
          <Users path="/users" user={this.state.user} />
          <UserByUsername path="users/:username" user={this.state.user} />
        </Router>
        {/* </Login> */}
        <Footer />
      </div>
    );
  }
  componentDidMount() {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser')).user
    console.log(loggedInUser, '<< loggedin user')
    if (loggedInUser.username) {
      this.setState({
        user: loggedInUser
      })
    }
  }
  login = user => {
    console.log(user)
    sessionStorage.setItem('loggedInUser', JSON.stringify({user}))
    this.setState({
      user
    });
  };

  logout = () => {
    sessionStorage.clear()
    this.setState({
      user: {}
    });
  };
}

export default App;
