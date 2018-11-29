import React, { Component } from "react";
import PropTypes from "prop-types";
import "../App.css";
import "./css/Home.css";
import * as api from "../api";
import _ from "lodash";
import { Link } from "@reach/router";
import Truncate from "react-truncate";
import ReactTooltip from "react-tooltip";

class Home extends Component {
  state = {
    featuredArticles: [],
    isLoading: true
  };
  render() {
    const { user } = this.props;
    console.log(user);
    const welcomeName = user.name ? `, ${user.name.split(" ")[0]}!` : "!";
    const { featuredArticles, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
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
              return (
                <div key={article._id} className="featured-article">
                  <h3 className="home-article-title">
                    <Link to={`/articles/${article._id}`}>{article.title}</Link>
                  </h3>
                  <p className="featured-article-user">
                    <Link to={`users/${article.created_by.username}`}>
                      {article.created_by.name}
                    </Link>
                  </p>
                  <p className="featured-article-body">
                    <Truncate lines={3} ellipsis={""}>
                      {article.body}
                    </Truncate>
                    <Link
                      to={`/articles/${article._id}`}
                      data-tip="Read rest of article"
                      data-for="article-see-more"
                      id="read-more"
                    >
                      ...
                    </Link>
                    <ReactTooltip type="dark" id="article-see-more" />
                  </p>
                </div>
              );
            })}
          </div>
        </main>
      );
    }
  }
  componentDidMount() {
    const sort = "";
    api.getArticles(sort).then(articles => {
      const featuredArticles = _.sampleSize(articles, 2)
      // let featuredArticles = [];
      // featuredArticles.push(_.sample(articles));
      // featuredArticles.push(_.sample(articles));
      this.setState({
        featuredArticles,
        isLoading: false
      });
    });
  }
}

Home.propTypes = {
  user: PropTypes.object
};

export default Home;
