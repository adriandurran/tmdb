import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Grid from 'material-ui/Grid';

import Header from './components/Header';

import Landing from './components/Landing';
import LoginUser from './components/auth/login';
import RegisterUser from './components/auth/register';
import User from './components/user/User';
import CoursesHome from './components/user/CoursesHome';
import CompsHome from './components/user/CompsHome';

// admin components
import AdminDashboard from './components/admin/AdminDashboard';
import AdminCourseManager from './components/admin/courses/AdminCourseManager';
import AdminCompManager from './components/admin/competencies/AdminCompManager';

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
            <Route exact path="/users/:id/courses" component={CoursesHome} />
            <Route exact path="/users/:id/competencies" component={CompsHome} />
            <Route exact path="/admin/dashboard" component={AdminDashboard} />
            <Route
              exact
              path="/admin/course-manager"
              component={AdminCourseManager}
            />
            <Route
              exact
              path="/admin/comp-manager"
              component={AdminCompManager}
            />
          </Grid>
          <Grid item md={1} lg={2} />
        </Grid>
      </div>
    </BrowserRouter>
  );
};

export default Routes;
