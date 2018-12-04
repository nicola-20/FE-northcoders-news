import React, { Component } from "react";
import PropTypes from "prop-types";
import "../App.css";
import "./css/Home.css";
import * as api from "../api";
import _ from "lodash";
import Loading from "./Loading";
import FeaturedArticle from "./FeaturedArticle";
import { navigate } from '@reach/router'

class Home extends Component {
  state = {
    featuredArticles: [],
    isLoading: true
  };
  render() {
    const { user } = this.props;
    const welcomeName = user.name ? `, ${user.name.split(" ")[0]}!` : "!";
    const { featuredArticles, isLoading } = this.state;
    if (isLoading) {
      return (
        <Loading />
      );
    } else {
      return (
        <main className="Home">
          <div className="home-box">
            <h1>
              Welcome to{" "}
              <span id="home-northcoders-news">NORTHCODERS/news</span>
              {welcomeName}
            </h1>
            <h2>FEATURED ARTICLES: </h2>
            {featuredArticles.map(article => {
              return <FeaturedArticle article={article}/>
            })}
          </div>
        </main>
      );
    }
  }
  componentDidMount() {
    const sort = "";
    api.getArticles(sort)
    .then(articles => {
      const featuredArticles = _.sampleSize(articles, 2)
      this.setState({
        featuredArticles,
        isLoading: false
      });
    })
    .catch((err) => {
      navigate("/error", {state: {code: err.response.status, message: err.response.statusText}})
    })
    
  }
}

Home.propTypes = {
  user: PropTypes.object
};

export default Home;
