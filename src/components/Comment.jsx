import React from 'react';
import PropTypes from 'prop-types';
import VoteChanger from './VoteChanger';

const Comment = ({ comment }) => {
  return (
    <li>
    <p>{comment.created_by.name} {' '} {new Date(comment.created_at).toUTCString()}</p>
      <p>{comment.body}</p>
      {/* <p>{new Date(comment.created_at).toUTCString()}</p> */}
      <VoteChanger comment={comment}/>
      {/* <p>{comment.votes}</p> */}
    </li>
  );
};

Comment.propTypes = {
  
};

export default Comment;