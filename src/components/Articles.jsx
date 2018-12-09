import React, { Component } from "react";
import PropTypes from "prop-types";
import * as api from "../api.js";
import "./css/Articles.css";
import Article from "./Article";
import AddArticle from "./AddArticle";
import Loading from "./Loading.jsx";
import SortAndSearch from "./SortAndSearch.jsx";
import { navigate } from "@reach/router";
import * as utils from '../utils/index.js'

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
      return <Loading />;
    } else {
      return (
        <main className="Articles">
          <div className="article-header">
            <h2>
              articles on{" "}
              <span className="italic">{topic_slug || `everything`}</span>
            </h2>
            <AddArticle
              user={user}
              topic_slug={topic_slug}
              addArticle={this.addArticle}
            />
            <SortAndSearch
              handleChangeSort={this.handleChangeSort}
              sort={this.state.sort}
              search={this.state.search}
              handleSearch={this.handleSearch}
            />
          </div>
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
    const { topic_slug } = this.props
    if (topic_slug) {
      api.getTopics().then(topics => {
        if (
          topics.filter(topic => {
            return topic.slug === topic_slug;
          }).length < 1
        ) {
          navigate("error", {
            state: {
              code: 404,
              message: `The topic "${topic_slug}" does not exist`
            }
          });
        } else {
          this.fetchArticles();
        }
      })
    } else {
      this.fetchArticles();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic_slug !== this.props.topic_slug) {
      this.fetchArticles();
      this.setState({
        search: ""
      });
    }
    if (prevState.sort !== this.state.sort) {
      this.fetchArticles();
    }
  }

  fetchArticles() {
    const { topic_slug } = this.props;
    const { sort } = this.state;
    const funcToCall = topic_slug ? api.getArticlesByTopic : api.getArticles;
    funcToCall(sort, topic_slug)
      .then(articles => {
        this.setState({
          articles,
          isLoading: false
        });
      })
      .catch(err => {
        navigate("/error", {
          state: {
            code: err.response.status,
            message: err.response.statusText
          }
        });
      });
  }

  handleArticleVoteChange = (article_id, change) => {
    const { articles, sort } = this.state;
    this.props.updateVotes("article", article_id, change);
    const voteChange = change === "up" ? 1 : change === "down" ? -1 : 0;
    const updatedArticles = articles.map(article => {
      if (article._id === article_id) {
        return { ...article, votes: article.votes + voteChange };
      } else {
        return article;
      }
    });
    if (sort.split(" ")[0] === "votes") {
      const direction = sort.split(" ")[1];
      utils.sortByVotes(updatedArticles, direction)
    }
    this.setState({
      articles: updatedArticles
    });
  };

  handleSearch = event => {
    const search = event.target.value.toLowerCase();
    this.setState({
      search
    });
  };

  addArticle = (topic_slug, newArticle) => {
    const { articles } = this.state;
    api
      .addArticleToTopic(topic_slug, newArticle)
      .then(addedArticle => {
        const articlesWithNewArticleAdded = [addedArticle, ...articles];
        this.setState({
          articles: articlesWithNewArticleAdded,
          search: "",
          isLoading: false
        });
      })
      .catch(err => {
        navigate("/error", {
          state: { code: err.response.status, message: err.response.statusText }
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

Articles.propTypes = {
  user: PropTypes.object,
  topic_slug: PropTypes.string,
  updateVotes: PropTypes.func
};

export default Articles;
