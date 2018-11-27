import React, { Component, Fragment } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <h1 className="logo">stutter</h1>
        <div className="main-container">
          <textarea className="new-post" placeholder="write something"></textarea>
          <button className="submit-post">+</button>
          <div className="post">
            <p className="post-content">wow</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
