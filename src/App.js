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
import Login from "./components/Login";

class App extends Component {
  state = {
    user: {}
  };
  // login in navigator, sidebar, component
  // composition
  render() {
    return (
      <div className="App">
        <Header />
        <Nav />
        <Login login={this.login} user={this.state.user}>
          <Router>
            <Home path="/" />
            <Articles path="/articles" user={this.state.user} />
            <Articles
              path="/topics/:topic_slug/articles"
              user={this.state.user}
            />
            <ArticleById path="articles/:article_id/*" />
            <Users path="/users" />
            <UserByUsername path="users/:username" />
          </Router>
        </Login>
        <Footer />
      </div>
    );
  }
  login = user => {
    this.setState({
      user
    });
    // store in local storage or session storage
  };
}

export default App;
