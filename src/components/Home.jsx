import React, { Component } from "react";
import PropTypes from "prop-types";
import "../App.css";
import "./css/Home.css";
import * as api from "../api";
import _ from "lodash";
import { Link } from "@reach/router";
import Truncate from "react-truncate";
import ReactTooltip from "react-tooltip";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

class Home extends Component {
  state = {
    featuredArticles: [],
    isLoading: true
  };
  render() {
    const { featuredArticles, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    } else {
      return (
        <main className="Home">
          <h1>HOME</h1>
          <h2>Featured Articles: </h2>
          {/* <Carousel showArrows={true} showIndicators={true} id="carousel">
            <div>
              <img src="https://www.businessupnorth.co.uk/wp-content/uploads/DHM_4RSUMAAMpbQ-640x333.jpg" />
              <div>
               
              </div>
              <p className="legend">Legend 1</p>
            </div>
            <div>
              <img src="http://insight-rec.com/wp-content/uploads/2017/09/Northcoders-Graduate-photo-e1505755116690.jpg" />
              <div>
            
              </div>
              <p className="legend">Legend 2</p>
            </div>
            <div>
              <img src="https://northcoders.com/images/general/index/coding-bootcamp-northcoders-manchester-heart-wall.jpg" />
              <p className="legend">Legend 3</p>
            </div> */}
          {featuredArticles.map(article => {
            return (
              <div>
                <h3 className="article-title">
                  <Link to={`/articles/${article._id}`}>{article.title}</Link>
                </h3>
                <p>{article.created_by.name}</p>
                <Truncate lines={3} ellipsis={<span />}>
                  {article.body}
                </Truncate>
                <ReactTooltip type="dark" />
                <Link
                  to={`/articles/${article._id}`}
                  data-tip="Read rest of article"
                >
                  ...
                </Link>
              </div>
            );
          })}
          {/* </Carousel> */}
        </main>
      );
    }
  }
  componentDidMount() {
    api.getArticles().then(articles => {
      let featuredArticles = [];
      featuredArticles.push(_.sample(articles));
      featuredArticles.push(_.sample(articles));
      this.setState({
        featuredArticles,
        isLoading: false
      });
    });
  }
}

Home.propTypes = {};

export default Home;
