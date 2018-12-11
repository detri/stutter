import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Register extends Component {
  state = {
    disabled: true
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch('/register', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.username,
        password: this.state.password,
        email: this.state.email
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          this.setState({
            error: json.error
          })
          return;
        }
        this.setState({
          success: true
        });
      });
  }

  validate = () => {
    if (this.state.confirmemail !== this.state.email) {
      return false;
    }
    if (this.state.confirmpass !== this.state.password) {
      return false;
    }
    return true;
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    }, () => {
      const validated = this.validate();
      this.setState({
        disabled: !validated
      });
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>register</h1>
        {this.state.success && <p>registration successful! you may now <NavLink to="/login" className="link">login</NavLink></p>}
        {this.state.error && <p>something went wrong. please try again</p>}
        <input type="text" name="username" id="username" placeholder="username" onChange={this.handleInputChange} />
        <br />
        <input type="password" name="password" id="password" placeholder="password" onChange={this.handleInputChange} />
        <br />
        <input type="password" name="confirmpass" id="confirmpass" placeholder="confirm password" onChange={this.handleInputChange} />
        <br />
        <input type="email" name="email" id="email" placeholder="email" onChange={this.handleInputChange} />
        <br />
        <input type="email" name="confirmemail" id="confirmemail" placeholder="confirm email" onChange={this.handleInputChange} />
        <br />
        <button type="submit" id="loginsubmit" disabled={this.state.disabled}>sign me up!</button>
      </form>
    );
  }
}

export default Register;