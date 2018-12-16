import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './Layout';

class App extends Component {
  render() {
    return (
      <Router>
        <Layout />
      </Router>
    );
  }
}

export default App;
