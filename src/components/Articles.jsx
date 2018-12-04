import React, { Component } from "react";
import PropTypes from "prop-types";
import * as api from "../api.js";
import "./css/Articles.css";
import Article from "./Article";
import AddArticle from "./AddArticle";
import Loading from "./Loading.jsx";
import SortAndSearch from "./SortAndSearch.jsx";
import { navigate } from "@reach/router";

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
            {/* Title */}
            <h2>
              articles on{" "}
              <span className="italic">{topic_slug || `everything`}</span>
            </h2>
            {/* Add article */}
            <AddArticle
              user={user}
              topic_slug={topic_slug}
              addArticle={this.addArticle}
            />
            {/* Sort and Search */}
            <SortAndSearch
              handleChangeSort={this.handleChangeSort}
              sort={this.state.sort}
              search={this.state.search}
              handleSearch={this.handleSearch}
            />
          </div>
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
    this.fetchArticles();
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

    // topic_slug ? api.getArticlesByTopic(topic_slug, sort) : api.getArticles(sort)
    // .then(articles => {
    //   this.setState({
    //     articles,
    //     isLoading: false
    //   });
    // })
    // .catch(err => {
    //   navigate("/error", {
    //     state: {
    //       code: err.response.status,
    //       message: err.response.statusText
    //     }
    //   });
    // });

    if (topic_slug) {
      api
        .getArticlesByTopic(topic_slug, sort)
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
    } else {
      api
        .getArticles(sort)
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
  }

  handleArticleVoteChange = (article_id, change) => {
    this.props.updateVotes("article", article_id, change);
    const voteChange = change === 'up' ? 1 : change === 'down' ? -1 : 0;
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
