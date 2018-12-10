import React, { Component, Fragment } from 'react';
import Post from './Post';
import { Loader } from 'react-loaders';
import { getAuth } from './auth';

class HomePage extends Component {
  state = {
    sort: "date",
    page: "1",
    postContent: ""
  }

  componentDidMount() {
    this.fetchPosts(this.state.sort, this.state.page);
  }

  fetchPosts = (sort, page) => {
    fetch(`http://localhost:5000/api/post/${sort}/${page}`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({ posts: json.posts });
      });
  }

  formatTime(hours, minutes) {
    let am = true;
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (hours > 11) {
      am = false;
    }
    if (hours > 12) {
      hours -= 12;
    }
    return `${hours}:${minutes} ${am ? 'AM' : 'PM'}`;
  }

  onInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    }, () => {
      if (name === "sort") {
        this.fetchPosts(this.state.sort, this.state.page);
      }
    });
  }

  submitPost = () => {
    const auth = getAuth();
    const post = this.state.postContent;
    if (auth) {
      fetch('http://localhost:5000/api/post', {
        method: 'POST',
        headers: {
          'Authorization': 'JWT ' + auth.accessToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: post })
      })
        .then(res => res.json())
        .then(json => {
          this.setState({
            posts: [json.post, ...this.state.posts],
            sort: "date",
            page: "1",
            postContent: ""
          }, () => {
            this.fetchPosts(this.state.sort, this.state.page);
          });
        });
    } else {
      this.setState({
        error: "You must be logged in to do this."
      });
      if (this.state.timeout) {
        clearTimeout(this.state.timeout);
      }
      this.setState({
        timeout: setTimeout(() => {
          this.setState({ "error": null });
        }, 5000)
      });
    }
  }

  render() {
    return (
      <Fragment>
          {this.state.error && <p>{this.state.error}</p>}
          <textarea className="new-post" name="postContent" placeholder="write something" value={this.state.postContent} onChange={this.onInputChange} />
          <button className="submit-post button" onClick={this.submitPost}>+</button>
          sort: <select value={this.state.sort} name="sort" onChange={this.onInputChange}>
            <option value="date">most recent</option>
            <option value="thumbs_up">thumbs up</option>
            <option value="thumbs_down">thumbs down</option>
          </select>
          {this.state.posts ?
          this.state.posts.map(post => {
            const dateCreated = new Date(post.date_created * 1000);
            const dateString = `${dateCreated.getMonth() + 1}/${dateCreated.getDate()}/${dateCreated.getFullYear()} ${this.formatTime(dateCreated.getHours(), dateCreated.getMinutes())}`;
            return <Post
                      key={post.id}
                      id={post.id}
                      content={post.content}
                      thumbsUps={post.up}
                      thumbsDowns={post.down}
                      dateCreated={dateString}
                      thumbsFunc={this.thumbs}
                    />
          })
          :
          <center><Loader type="ball-scale" color="grey" /></center>}
      </Fragment>
    );
  }
}

export default HomePage;