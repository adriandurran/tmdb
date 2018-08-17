import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { Container } from 'semantic-ui-react';

import Header from './components/Header';

import Landing from './components/Landing';
import LoginUser from './components/auth/login';
import RegisterUser from './components/auth/register';
import UserLanding from './components/user/UserLanding';
import UserProfile from './components/user/profile/UserProfile';
import CoursesHome from './components/user/CoursesHome';
import CompsHome from './components/user/CompsHome';

// admin components
import AdminDashboard from './components/admin/AdminDashboard';
import AdminCourseManager from './components/admin/courses/AdminCourseManager';
import AdminCourseTypes from './components/admin/courses/AdminCourseTypes';
import AdminCourseLevels from './components/admin/courses/AdminCourseLevels';
import AdminUserCseManager from './components/admin/users/courses/AdminUserCseManager';
import AdminCourseView from './components/admin/courses/AdminCourseView';
import AdminCourseTools from './components/admin/courses/AdminCourseTools';

import AdminCompManager from './components/admin/competencies/AdminCompManager';
import AdminCompetencyView from './components/admin/competencies/AdminCompetencyView';
import AdminCompTools from './components/admin/competencies/AdminCompTools';

import AdminRoleManager from './components/admin/roles/AdminRoleManager';
import AdminRoleView from './components/admin/roles/AdminRoleView';
import AdminRoleTools from './components/admin/roles/AdminRoleTools';

import AdminUserAccess from './components/admin/users/access/AdminUserAccess';
import AdminUserManager from './components/admin/users/roles/AdminUserManager';
import AdminUserTools from './components/admin/users/AdminUserTools';

import AdminDeptView from './components/admin/departments/AdminDeptView';
import AdminDeptTools from './components/admin/departments/AdminDeptTools';
import AdminDeptManager from './components/admin/departments/AdminDeptManager';
import AdminDeptCards from './components/admin/departments/AdminDeptCards';
import AdminDeptUserView from './components/admin/departments/AdminDeptUserView';

// feed back and versions
import AppVersion from './components/version/AppVersion';
import AppFeedback from './components/feedback/AppFeedback';
import AppFeedbckManager from './components/feedback/AppFeedbackManager';
import AdminApplicationTools from './components/admin/apptools/AdminApplicationTools';

import { selectCurrentUser } from './reducers/selectors/userSelectors';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkAuth(rest.user) === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/auth/login" />
      )
    }
  />
);

const PrivateAdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkAdmin(rest.user) === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const checkAuth = (user) => {
  if (!isEmpty(user)) {
    if (user.verified) {
      return true;
    }
  }

  return false;
};

const checkAdmin = (user) => {
  if (checkAuth(user)) {
    if (user.isAdmin || user.isSuperAdmin) {
      return true;
    }
  }
  return false;
};

class Routes extends Component {
  render() {
    const { user } = this.props;

    return (
      <BrowserRouter>
        <div>
          <Header />
          <Container style={{ marginTop: '7em' }}>
            <Route exact path="/" component={Landing} />
            <Route exact path="/auth/login" component={LoginUser} />
            <Route exact path="/auth/register" component={RegisterUser} />
            <PrivateRoute
              user={user}
              exact
              path="/application/version"
              component={AppVersion}
            />
            <PrivateRoute
              user={user}
              exact
              path="/application/feedback"
              component={AppFeedback}
            />
            <Route exact path="/users/:id" component={UserLanding} />
            <PrivateRoute
              user={user}
              exact
              path="/users/:id/profile"
              component={UserProfile}
            />
            <PrivateRoute
              user={user}
              exact
              path="/users/:id/courses"
              component={CoursesHome}
            />
            <PrivateRoute
              user={user}
              exact
              path="/users/:id/competencies"
              component={CompsHome}
            />
            <PrivateAdminRoute
              user={user}
              exact
              path="/admin/dashboard"
              component={AdminDashboard}
            />
            <PrivateAdminRoute
              user={user}
              exact
              path="/admin/app-tools"
              component={AdminApplicationTools}
            />
            <PrivateAdminRoute
              user={user}
              exact
              path="/admin/course-tools"
              component={AdminCourseTools}
            />
            <PrivateAdminRoute
              user={user}
              exact
              path="/admin/course-manager"
              component={AdminCourseManager}
            />
            <PrivateAdminRoute
              user={user}
              exact
              path="/admin/course-types"
              component={AdminCourseTypes}
            />
            <PrivateAdminRoute
              user={user}
              exact
              path="/admin/course-levels"
              component={AdminCourseLevels}
            />
            <PrivateAdminRoute
              user={user}
              exact
              path="/admin/course-manager/view/:id"
              component={AdminCourseView}
            />
            <PrivateAdminRoute
              user={user}
              exact
              path="/admin/comp-tools"
              component={AdminCompTools}
            />
            <PrivateAdminRoute
              user={user}
              exact
              path="/admin/comp-manager"
              component={AdminCompManager}
            />
            <PrivateAdminRoute
              user={user}
              exact
              path="/admin/comp-manager/view/:id"
              component={AdminCompetencyView}
            />
            <PrivateAdminRoute
              user={user}
              exact
              path="/admin/role-tools"
              component={AdminRoleTools}
            />
            <PrivateAdminRoute
              user={user}
              exact
              path="/admin/role-manager"
              component={AdminRoleManager}
            />
            <PrivateAdminRoute
              user={user}
              exact
              path="/admin/role-manager/view/:id"
              component={AdminRoleView}
            />
            <PrivateAdminRoute
              user={user}
              exact
              path="/admin/user-tools"
              component={AdminUserTools}
            />
            <PrivateAdminRoute
              user={user}
              exact
              path="/admin/user-access-manager"
              component={AdminUserAccess}
            />
            <PrivateAdminRoute
              user={user}
              exact
              path="/admin/user-manager"
              component={AdminUserManager}
            />
            <PrivateAdminRoute
              user={user}
              exact
              path="/admin/user-courses-manager"
              component={AdminUserCseManager}
            />
            <PrivateAdminRoute
              user={user}
              exact
              path="/admin/dept-tools"
              component={AdminDeptTools}
            />
            <PrivateAdminRoute
              user={user}
              exact
              path="/admin/dept-manager"
              component={AdminDeptManager}
            />
            <PrivateAdminRoute
              user={user}
              exact
              path="/admin/dept-views"
              component={AdminDeptCards}
            />
            <PrivateAdminRoute
              user={user}
              exact
              path="/admin/dept-user-view/:id"
              component={AdminDeptUserView}
            />
            <PrivateAdminRoute
              user={user}
              exact
              path="/admin/dept-manager/view/:id"
              component={AdminDeptView}
            />
            <PrivateAdminRoute
              user={user}
              exact
              path="/application/feedback-manager"
              component={AppFeedbckManager}
            />
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: selectCurrentUser(state)
  };
};

Routes = connect(mapStateToProps)(Routes);

export default Routes;
