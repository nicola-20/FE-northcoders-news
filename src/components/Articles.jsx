import React, { Component } from "react";
import { Router } from "@reach/router";
import PropTypes from "prop-types";
import * as api from "../api.js";
import { Link } from "@reach/router";
import "./css/Articles.css";
import Article from "./Article";
import AddArticle from './AddArticle'


class Articles extends Component {
  state = {
    articles: [],
    filteredArticles: [],
    search: ''
  };
  render() {
    const { topic_slug } = this.props;
    const { filteredArticles } = this.state;
    return (
      <main className="Articles">
      {/* Title */}
        <h2>Some articles on {topic_slug || `everything`}...</h2>
      {/* Add article */}
        <AddArticle user={this.props.user}/>
      {/* Sort  */}
        <label htmlFor="sort-select">Sort:</label>
        <select name="sort-select" id="sort-select">
          <option value="">Sort by...</option>
          <option value="title asc">Title (A-Z)</option>
          <option value="title desc">Title (Z-A)</option>
          <option value="votes asc">Votes (Low-High)</option>
          <option value="votes des">Votes(High-Low)</option>
        </select>
      {/* Search */}
        <label htmlFor="article-search">Search:</label><input type="text" placeholder="Search..." id="article-search" onChange={this.handleSearch} value={this.state.search}/>
      {/* Articles */}
        {filteredArticles.map(article => {
          return (
            <Article
              key={article._id}
              article={article}
              handleArticleVoteChange={this.handleArticleVoteChange}
            />
          );
        })}
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
          articles,
          filteredArticles: articles
        });
      });
    } else {
      api.getArticles().then(articles => {
        this.setState({
          articles,
          filteredArticles: articles
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

  handleSearch = (event) => {
    const search = event.target.value.toLowerCase()
    console.log(search, 'handlesearch search')
    this.setSearch(search)
    this.filterArticles()
  }

  setSearch = (search) => {
    this.setState({
      search
    })
  }

  filterArticles = () => {
    const { articles, search } = this.state
    console.log(search, '<- search')
    const filteredArticles = articles.filter((article) => {
      return article.body.toLowerCase().includes(search) || article.title.toLowerCase().includes(search) || article.belongs_to.toLowerCase().includes(search)
    })
    this.setState({
      filteredArticles
    })
  }
}

Articles.propTypes = {};

export default Articles;
