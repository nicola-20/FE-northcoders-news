import React, { Component } from "react";
import { Router } from "@reach/router";
import PropTypes from "prop-types";
import * as api from "../api.js";
import { Link } from "@reach/router";
import "./css/Articles.css";
import Article from "./Article";
import AddArticle from "./AddArticle";
import { faSearch, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Articles extends Component {
  state = {
    articles: [],
    search: "",
    isLoading: true
  };
  render() {
    const { topic_slug, user } = this.props;
    const { articles, search, isLoading } = this.state;

    const filteredArticles = articles.filter(article => {
      return (
        article.body.toLowerCase().includes(search) ||
        article.title.toLowerCase().includes(search) ||
        article.belongs_to.toLowerCase().includes(search)
      );
    });
    if (isLoading) {
      return <p>Loading...</p>;
    } else {
      return (
        <main className="Articles">
          {/* Title */}
          <h2>Some articles on {topic_slug || `everything`}...</h2>
          {/* Add article */}
          {topic_slug && <AddArticle user={user} topic_slug={topic_slug} />}
          {/* Sort  */}
          <FontAwesomeIcon icon={faSort} />
          <label htmlFor="sort-select">Sort:</label>
          <select name="sort-select" id="sort-select">
            <option value="">Sort by...</option>
            <option value="title asc">Title (A-Z)</option>
            <option value="title desc">Title (Z-A)</option>
            <option value="votes asc">Votes (Low-High)</option>
            <option value="votes des">Votes(High-Low)</option>
          </select>
          {/* Search */}
          <label htmlFor="article-search">Search:</label>
          <input
            type="text"
            placeholder={`Search...`}
            id="article-search"
            onChange={this.handleSearch}
            value={this.state.search}
          />
          <FontAwesomeIcon icon={faSearch} />
          {/* Articles */}
          {filteredArticles.map(article => {
            return (
              <Article
                key={article._id}
                article={article}
                handleArticleVoteChange={this.handleArticleVoteChange}
                user={user}
              />
            );
          })}
        </main>
      );
    }
  }

  componentDidMount() {
    console.log("articles mounting");
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
          articles,
          isLoading: false
        });
      });
    } else {
      api.getArticles().then(articles => {
        this.setState({
          articles,
          isLoading: false
        });
      });
    }
  }

  handleArticleVoteChange = (article_id, change) => {
    api.updateArticleVotes(article_id, change).then(data => {
      console.log(data);
      this.fetchArticles();
    });
  };
  // increment votes by one
  // state => {return {article: {...state.article, votes: state.article.votes + 1}}}
  // votes: state.article.votes + 1
  // re sort on vote

  // optimistic rendering, assume it works - give immediate feedback
  // error handling
  // err ? <p> Something went wrong </p> : <votes>
  // api.votes()
  // .catch((err) => {
  //  this.setState({
  //  err
  // })
  // })
  // this.setState(state => {
  //   return {article: {...state.article, votes: state.article.votes + 1}}
  // }
  // )

  // LIMIT NUMBER OF TIMES YOU CAN VOTE

  handleSearch = event => {
    const search = event.target.value.toLowerCase();
    this.setState({
      search
    });
  };
}

Articles.propTypes = {};

export default Articles;
