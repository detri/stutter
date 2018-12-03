import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faThumbsUp,
  faThumbsDown
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faThumbsDown, faThumbsUp);

class Post extends Component {
  state = {
    "ups": this.props.thumbsUps,
    "downs": this.props.thumbsDowns,
    "error": null
  }

  thumbs(id, up = true) {
    const fetchUrlSegment = up ? 'up' : 'down';
    return () => {
      fetch(`http://localhost:5000/api/post/${id}/${fetchUrlSegment}`, {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(json => {
          if (!json.post) {
            this.setState({
              "error": json.error
            });
            // show error for 5 seconds
            setTimeout(() => {
              this.setState({ "error": null })
            }, 5000);
            return;
          }
          this.setState({
            "ups": json.post.up,
            "downs": json.post.down
          });
        });
    };
  }

  render() {
    return (
      <div className="post">
        <p className="post-content">{this.props.content}</p>
        <p className="post-date">{this.props.dateCreated}</p>
        {this.state.error && <p className="thumb-error">You must be logged in to do that.</p>}
        <div className="votes">
          <button className="thumbs up button" onClick={this.thumbs(this.props.id)}>
            <FontAwesomeIcon icon={faThumbsUp} /> <span className="vote-count">{this.state.ups}</span>
          </button>
          <button className="thumbs down button" onClick={this.thumbs(this.props.id, false)}>
            <FontAwesomeIcon icon={faThumbsDown} /> <span className="vote-count">{this.state.downs}</span>
          </button>
        </div>
      </div>
    )
  }
}

export default Post;