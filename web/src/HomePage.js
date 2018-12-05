import React, { Component, Fragment } from 'react';
import Post from './Post';
import { Loader } from 'react-loaders';

class HomePage extends Component {
  state = {}

  componentDidMount() {
    fetch('http://localhost:5000/api/post')
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

  render() {
    return (
      <Fragment>
          <textarea className="new-post" placeholder="write something"></textarea>
          <button className="submit-post button">+</button>
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