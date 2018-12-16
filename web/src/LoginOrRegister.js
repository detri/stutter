import React, { Component } from 'react';
import { getAuth } from './auth';
import {
  LoginStatus,
  StyledLink,
  RouterLink
} from './Display';

class LoginOrRegister extends Component {
  state = {}

  componentDidMount() {
    this.interval = setInterval(this.checkAuth, 1000);
  }

  checkAuth = () => {
    const auth = getAuth();
    if (auth) {
      this.setState({
        username: auth.username
      });
    } else {
      this.setState({
        username: undefined
      });
    }
  }

  logout = () => {
    localStorage.removeItem('auth');
  }

  render() {
    return (
      <LoginStatus>
      {this.state.username ? 
      <span>hello, <strong>{this.state.username}</strong>. <StyledLink onClick={this.logout}>logout</StyledLink></span>
      :
      <span><RouterLink to="/login">login</RouterLink> or <RouterLink to="/register">register</RouterLink></span>}
      </LoginStatus>
    );
  }
}

export default LoginOrRegister;