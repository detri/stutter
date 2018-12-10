import React, { Component } from 'react';
import { setAuth } from './auth';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = {}

  handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:5000/auth', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          this.setState({
            error: json.error
          })
          return;
        }
        setAuth(this.state.username, json.access_token);
        this.setState({
          success: true
        });
      });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.state.success && <Redirect to="/" />}
        <h1>login</h1>
        {this.state.error && <p>incorrect username or password. try again.</p>}
        <input type="text" name="username" id="username" placeholder="username" onChange={this.handleInputChange} />
        <br />
        <input type="password" name="password" id="password" placeholder="password" onChange={this.handleInputChange} />
        <br />
        <button type="submit" id="loginsubmit">log me in</button>
      </form>
    );
  }
}

export default Login;