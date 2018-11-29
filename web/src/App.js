import React, { Component, Fragment } from 'react';
import Post from './Post';
import { Loader } from 'react-loaders';
import './App.scss';

class App extends Component {
  state = {}

  componentDidMount() {
    fetch('http://localhost:5000/api/post')
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({ posts: json.posts });
      });
  }

  render() {
    return (
      <Fragment>
        <h1 className="logo">stutter</h1>
        <div className="main-container">
          <textarea className="new-post" placeholder="write something"></textarea>
          <button className="submit-post button">+</button>
          {this.state.posts ?
          this.state.posts.map(post => {
            return <Post content={post.content} thumbsUps={post.up} thumbsDowns={post.down} />
          })
          :
          <center><Loader type="ball-scale" color="grey" /></center>}
        </div>
      </Fragment>
    );
  }
}

export default App;
