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
    isLoading: true,
    sort: "votes desc"
  };
  render() {
    const { topic_slug, user, updateVotes } = this.props;
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
          <AddArticle
            user={user}
            topic_slug={topic_slug}
            addArticle={this.addArticle}
          />
          {/* Sort  */}
          <FontAwesomeIcon icon={faSort} />
          <label htmlFor="sort-select">Sort:</label>
          <select
            name="sort-select"
            id="sort-select"
            onChange={this.handleChangeSort}
            value={this.state.sort}
          >
            <option value="">Sort by...</option>
            <option value="title asc">Title (A-Z)</option>
            <option value="title desc">Title (Z-A)</option>
            <option value="votes asc">Votes (Low-High)</option>
            <option value="votes desc">Votes (High-Low)</option>
            <option value="created_at asc">Date (Oldest-Newest)</option>
            <option value="created_at desc">Date (Newest-Oldest)</option>
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
                updateVotes={updateVotes}
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
    if (prevState.sort !== this.state.sort) {
      this.fetchArticles();
    }
  }

  fetchArticles() {
    const { topic_slug } = this.props;
    const { sort } = this.state;
    if (topic_slug) {
      api.getArticlesByTopic(topic_slug, sort).then(articles => {
        this.setState({
          articles,
          isLoading: false
        });
      });
    } else {
      api.getArticles(sort).then(articles => {
        this.setState({
          articles,
          isLoading: false
        });
      });
    }
  }

  handleArticleVoteChange = (article_id, change) => {
    this.props.updateVotes("article", article_id, change);
    let voteChange = 0;
    if (change === "up") voteChange = +1;
    if (change === "down") voteChange = -1;
    const { articles, sort } = this.state;
    const updatedArticles = articles.map(article => {
      if (article._id === article_id) {
        return { ...article, votes: article.votes + voteChange };
      } else {
        return article;
      }
    });
    if (sort.split(" ")[0] === "votes") {
      const direction = sort.split(" ")[1];
      let sortedArticles = [];
      if (direction === "asc") {
        sortedArticles = updatedArticles.sort((a, b) => {
          if (a.votes < b.votes) {
            return -1;
          } else if (a.votes > b.votes) {
            return 1;
          } else {
            return 0;
          }
        });
      } else if (direction === "desc") {
        sortedArticles = updatedArticles.sort((a, b) => {
          if (a.votes < b.votes) {
            return 1;
          } else if (a.votes > b.votes) {
            return -1;
          } else {
            return 0;
          }
        });
      }
      this.setState({
        articles: sortedArticles
      });
    } else {
      this.setState({
        articles: updatedArticles
      });
    }
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
  addArticle = (topic_slug, newArticle) => {
    const { articles } = this.state;
    api.addArticleToTopic(topic_slug, newArticle).then(addedArticle => {
      const articlesWithNewArticleAdded = [addedArticle, ...articles];
      this.setState({
        articles: articlesWithNewArticleAdded,
        search: "",
        isLoading: false
      });
    });
  };
  handleChangeSort = event => {
    const sort = event.target.value;
    this.setState({
      sort
    });
  };
}

Articles.propTypes = {};

export default Articles;
