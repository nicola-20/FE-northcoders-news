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
import * as api from './api'

class App extends Component {
  state = {
    user: {}
  };
  render() {
    console.log(this.state.user, "user in app state");
    return (
      <div className="App">
        <Header />
        <Nav login={this.login} logout={this.logout} user={this.state.user} />
        {/* <Login login={this.login} user={this.state.user}> */}
        <Router>
          <Home path="/" user={this.state.user}/>
          <Articles path="/articles" user={this.state.user} updateVotes={this.updateVotes}/>
          <Articles
            path="/topics/:topic_slug/articles"
            user={this.state.user}
            updateVotes={this.updateVotes}
          />
          <ArticleById path="articles/:article_id/*" user={this.state.user} updateVotes={this.updateVotes}/>
          <Users path="/users" user={this.state.user} />
          <UserByUsername path="users/:username" user={this.state.user} />
        </Router>
        {/* </Login> */}
        <Footer />
      </div>
    );
  }
  componentDidMount() {
    if (sessionStorage.length > 0) {
      const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
        .user;
      console.log(loggedInUser, "<< loggedin user");
      if (loggedInUser.username) {
        this.setState({
          user: loggedInUser
        });
      }
    }
  }
  login = user => {
    console.log(user);
    sessionStorage.setItem("loggedInUser", JSON.stringify({ user }));
    this.setState({
      user
    });
  };

  logout = () => {
    sessionStorage.clear();
    this.setState({
      user: {}
    });
  };

  updateVotes = (articleOrComment, id, change) => {
    if (articleOrComment === 'article') {
      const article_id = id
      api.updateArticleVotes(article_id, change)
      .then((data) => {
        return data
      })
    } else if (articleOrComment === 'comment') {
      const comment_id = id
      api.updateCommentVotes(comment_id, change)
      .then((data) => {
        return data
      })
    }
  }
}

export default App;
