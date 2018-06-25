import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Container } from 'semantic-ui-react';

import Header from './components/Header';

import Landing from './components/Landing';
import LoginUser from './components/auth/login';
import RegisterUser from './components/auth/register';
import UserLanding from './components/user/UserLanding';
import CoursesHome from './components/user/CoursesHome';
import CompsHome from './components/user/CompsHome';

// admin components
import AdminDashboard from './components/admin/AdminDashboard';
import AdminCourseManager from './components/admin/courses/AdminCourseManager';
import AdminCourseTypes from './components/admin/courses/AdminCourseTypes';
import AdminCourseLevels from './components/admin/courses/AdminCourseLevels';
import AdminCompManager from './components/admin/competencies/AdminCompManager';
import AdminCompetencyView from './components/admin/competencies/AdminCompetencyView';
import AdminRoleManager from './components/admin/roles/AdminRoleManager';
import AdminUserAccess from './components/admin/users/access/AdminUserAccess';
import AdminUserManager from './components/admin/users/roles/AdminUserManager';
import AdminUserCoursesManager from './components/admin/users/courses/AdminUserCoursesManager';

const Routes = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Container style={{ marginTop: '7em' }}>
          <Route exact path="/" component={Landing} />
          <Route exact path="/auth/login" component={LoginUser} />
          <Route exact path="/auth/register" component={RegisterUser} />
          <Route exact path="/users/:id" component={UserLanding} />
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
            path="/admin/course-types"
            component={AdminCourseTypes}
          />
          <Route
            exact
            path="/admin/course-levels"
            component={AdminCourseLevels}
          />
          <Route
            exact
            path="/admin/comp-manager"
            component={AdminCompManager}
          />
          <Route
            exact
            path="/admin/comp-manager/view/:id"
            component={AdminCompetencyView}
          />
          <Route
            exact
            path="/admin/role-manager"
            component={AdminRoleManager}
          />
          <Route
            exact
            path="/admin/user-access-manager"
            component={AdminUserAccess}
          />
          <Route
            exact
            path="/admin/user-manager"
            component={AdminUserManager}
          />
          <Route
            exact
            path="/admin/user-courses-manager"
            component={AdminUserCoursesManager}
          />
        </Container>
      </div>
    </BrowserRouter>
  );
};

export default Routes;
