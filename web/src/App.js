import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Fragment>
        <h1 className="logo">stutter</h1>
        <div className="main-container">
          <Router>
              <Switch>
                <Route exact path="/" component={HomePage} />
              </Switch>
          </Router>
        </div>
      </Fragment>
    );
  }
}

export default App;
