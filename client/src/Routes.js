import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Grid from 'material-ui/Grid';

import Header from './components/Header';

import Landing from './components/Landing';
import LoginUser from './components/auth/login';
import RegisterUser from './components/auth/register';
import User from './components/user/User';
import CourseSelector from './components/model/courses';
import UserCourses from './components/user/UserCourses';

const Routes = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Grid container spacing={24}>
          <Grid item md={1} lg={2} />
          <Grid item xs={12} md={10} lg={8}>
            <Route exact path="/" component={Landing} />
            <Route exact path="/auth/login" component={LoginUser} />
            <Route exact path="/auth/register" component={RegisterUser} />
            <Route exact path="/users/:id" component={User} />
            <Route exact path="/users/:id/courses" component={UserCourses} />
            <Route exact path="/courses" component={CourseSelector} />
          </Grid>
          <Grid item md={1} lg={2} />
        </Grid>
      </div>
    </BrowserRouter>
  );
};

export default Routes;
