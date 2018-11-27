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
    return (
      <ul>
      {comments.map((comment) => {
        return (
            <Comment key={comment._id} comment={comment} user={this.props.user}/>
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
      this.setState({
        comments
      })
    })
  }
}

ArticleComments.propTypes = {

};

export default ArticleComments;