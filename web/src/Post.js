import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faThumbsUp,
  faThumbsDown
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faThumbsDown, faThumbsUp);

class Post extends Component {
  render() {
    return (
      <div className="post">
        <p className="post-content">{this.props.content}</p>
        <div className="votes">
          <button className="thumbs up button">
            <FontAwesomeIcon icon={faThumbsUp} /> <span className="vote-count">{this.props.thumbsUps}</span>
          </button>
          <button className="thumbs down button">
            <FontAwesomeIcon icon={faThumbsDown} /> <span className="vote-count">{this.props.thumbsDowns}</span>
          </button>
        </div>
      </div>
    )
  }
}

export default Post;