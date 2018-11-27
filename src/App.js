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
  render() {
    return (
      <div className="App">
        <Header />
        <Nav />
        <Router>
          <Home path="/" />
          <Articles path="/articles" />
          <Articles path="/topics/:topic_slug/articles" />
          <ArticleById path="articles/:article_id/*" />
          <Users path="/users" />
          <UserByUsername path="users/:username" />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
