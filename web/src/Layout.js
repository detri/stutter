import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';
import LoginOrRegister from './LoginOrRegister';

class Layout extends Component {
  render() {
    return (
      <Fragment>
        <h1 className="logo">stutter</h1>
        <LoginOrRegister />
        <div className="main-container">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

export default Layout;