import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment'
import * as api from '../api'

class ArticleComments extends Component {
  state = {
    comments: []
  }
  render() {
    const { comments } = this.state
    console.log(this.state, 'articlecomments state')
    return (
      <ul>
      {comments.map((comment) => {
        return (
            <Comment key={comment._id} comment={comment}/>
        )
      })}
    </ul>
    );
  }

  componentDidMount() {
    const { article_id } = this.props
    console.log('comments mounted')
    api.getCommentsByArticleID(article_id)
    .then((comments) => {
      console.log(comments, 'comments from api')
      this.setState({
        comments
      })
    })
  }
}

ArticleComments.propTypes = {

};

export default ArticleComments;