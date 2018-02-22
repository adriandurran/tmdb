import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import LoginUser from './auth/login';
import RegisterUser from './auth/register';
import User from './user/User';
import CourseSelector from './model/courses';

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
              <Route exact path="/auth/login" component={LoginUser} />
              <Route exact path="/auth/register" component={RegisterUser} />
              <Route exact path="/users/:id" component={User} />
              <Route exact path="/courses" component={CourseSelector} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
