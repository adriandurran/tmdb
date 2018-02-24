import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import { fetchRoles, fetchCourses, fetchComps } from '../actions';

import Header from './Header';
import Landing from './Landing';
import LoginUser from './auth/login';
import RegisterUser from './auth/register';
import User from './user/User';
import CourseSelector from './model/courses';

import withRoot from '../withRoot';
import rootStyles from '../styles/rootStyle';

class App extends Component {
  componentDidMount() {
    const { fetchRoles, fetchCourses, fetchComps } = this.props;
    fetchRoles(); //this needs to change when we add authentication
    fetchCourses(); //this needs to change when we add authentication
    fetchComps(); //this needs to change when we add authentication
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Grid container className={classes.grid} spacing={24}>
              <Grid item md={1} lg={2} />
              <Grid item xs={12} md={10} lg={8}>
                <Route exact path="/" component={Landing} />
                <Route exact path="/auth/login" component={LoginUser} />
                <Route exact path="/auth/register" component={RegisterUser} />
                <Route exact path="/users/:id" component={User} />
                <Route exact path="/courses" component={CourseSelector} />
              </Grid>
              <Grid item md={1} lg={2} />
            </Grid>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchRoles,
  fetchCourses,
  fetchComps
};

App = withStyles(rootStyles)(App);

export default withRoot(connect(null, mapDispatchToProps)(App));
