import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faThumbsUp,
  faThumbsDown
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAuth } from './auth';
import {
  PostContainer,
  PostContent,
  PostDate,
  Votes,
  ThumbsButton
} from './Display';

library.add(faThumbsDown, faThumbsUp);

class Post extends Component {
  state = {
    "ups": this.props.thumbsUps,
    "downs": this.props.thumbsDowns,
    "error": null
  }

  thumbs(id, up = true) {
    const fetchUrlSegment = up ? 'up' : 'down';
    const auth = getAuth();
    const headers = auth ? { "Authorization": "JWT " + auth.accessToken } : {};
    fetch(`/api/post/${id}/${fetchUrlSegment}`, {
      headers
    })
      .then(res => res.json())
      .then(json => {
        if (!json.post) {
          this.setState({
            "error": json.error
          });
          // show error for 5 seconds
          if (this.state.timeout) {
            clearTimeout(this.state.timeout);
          }
          this.setState({
            timeout: setTimeout(() => {
              this.setState({ "error": null });
            }, 5000)
          });
          return;
        }
        this.setState({
          "ups": json.post.up,
          "downs": json.post.down
        });
      });
  }

  render() {
    return (
      <PostContainer>
        <PostContent>{this.props.content}</PostContent>
        <PostDate>{this.props.dateCreated}</PostDate>
        {this.state.error && <p className="thumb-error">You must be logged in to do that.</p>}
        <Votes>
          <ThumbsButton up onClick={() => { this.thumbs(this.props.id) }}>
            <FontAwesomeIcon icon={faThumbsUp} /> <span className="vote-count">{this.state.ups}</span>
          </ThumbsButton>
          <ThumbsButton down onClick={() => { this.thumbs(this.props.id, false) }}>
            <FontAwesomeIcon icon={faThumbsDown} /> <span className="vote-count">{this.state.downs}</span>
          </ThumbsButton>
        </Votes>
      </PostContainer>
    )
  }
}

export default Post;