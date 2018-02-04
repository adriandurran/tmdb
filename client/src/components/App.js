import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import User from './user/User';

class App extends Component {
  componentDidMount() {
    this.props.fetchRoles(); //this needs to change when we add authentication
    this.props.fetchCourses(); //this needs to change when we add authentication
    this.props.fetchComps(); //this needs to change when we add authentication
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div className="container">
              <Route exact path="/" component={Landing} />
              <Route exact path="/users/:id" component={User} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
