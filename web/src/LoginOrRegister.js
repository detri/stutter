import React, { Component } from 'react';
import { getAuth } from './auth';
import { NavLink } from 'react-router-dom';

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
      <div className="loginRegister">
      {this.state.username ? 
      <span>hello, <strong>{this.state.username}</strong>. <a href="#" className="link" onClick={this.logout}>logout</a></span>
      :
      <span><NavLink to="/login" className="link">login</NavLink> or <NavLink to="/register" className="link">register</NavLink></span>}
      </div>
    );
  }
}

export default LoginOrRegister;