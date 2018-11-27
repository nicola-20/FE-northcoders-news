import React, { Component } from "react";
import { Router } from "@reach/router";
import PropTypes from "prop-types";
import * as api from "../api.js";
import { Link } from "@reach/router";
import "./css/Articles.css";
import Article from "./Article";
import ArticleById from "./ArticleById";

class Articles extends Component {
  state = {
    articles: []
  };
  render() {
    const { topic_slug } = this.props;
    const { articles } = this.state;
    console.log(topic_slug);
    return (
      <main className="Articles">
        <h2>Some articles on {topic_slug || `everything`}...</h2>
        {articles.map(article => {
          return (
            <Article
              key={article._id}
              article={article}
              handleVoteChange={this.handleVoteChange}
            />
          );
        })}
        {/* <Router>
          <ArticleById path="/:article_id" handleVoteChange={this.handleVoteChange}/>
        </Router> */}
      </main>
    );
  }

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic_slug !== this.props.topic_slug) {
      this.fetchArticles();
    }
  }

  fetchArticles() {
    const { topic_slug } = this.props;
    if (topic_slug) {
      api.getArticlesByTopic(topic_slug).then(articles => {
        this.setState({
          articles
        });
      });
    } else {
      api.getArticles().then(articles => {
        this.setState({
          articles
        });
      });
    }
  }

  handleVoteChange = (article_id, change) => {
    api.updateArticleVotes(article_id, change).then(data => {
      console.log(data);
      this.fetchArticles();
    });
  };
}

Articles.propTypes = {};

export default Articles;

// const Articles = props => {
//   console.log(props.topic_slug)
//   if (props.topic_slug) {
//     return (
//       <div>
//         Some articles on {props.topic_slug}
//       </div>
//     )
//   } else {
//     return (
//       <div>
//         Articles
//       </div>
//     )
//   }

// };

// Articles.propTypes = {

// };

// export default Articles;
