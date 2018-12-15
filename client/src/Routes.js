import React, { Component, Suspense, lazy, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { Container } from 'semantic-ui-react';

import Header from './components/Header';

import Landing from './components/Landing';
import LoginUser from './components/auth/login';
import RegisterUser from './components/auth/register';
import UserLanding from './components/user/UserLanding';

// feed back and versions
import AppVersion from './components/version/AppVersion';
import AppFeedback from './components/feedback/AppFeedback';
import AppFeedbckManager from './components/feedback/AppFeedbackManager';
import AdminApplicationTools from './components/admin/apptools/AdminApplicationTools';

import AdminOJTTools from './components/admin/onjobtraining/AdminOJTTools';
import AdminOJTManager from './components/admin/onjobtraining/AdminOJTManager';

import { selectCurrentUser } from './reducers/selectors/userSelectors';

// User components
const UserProfile = lazy(() => import('./components/user/profile/UserProfile'));
const CoursesHome = lazy(() => import('./components/user/CoursesHome'));
const CompsHome = lazy(() => import('./components/user/CompsHome'));

// Admin components
// dashboard
const AdminDashBoard = lazy(() => import('./components/admin/AdminDashboard'));

// dept
const AdminDeptView = lazy(() =>
  import('./components/admin/departments/AdminDeptView')
);
const AdminDeptTools = lazy(() =>
  import('./components/admin/departments/AdminDeptTools')
);
const AdminDeptManager = lazy(() =>
  import('./components/admin/departments/AdminDeptManager')
);
const AdminDeptCards = lazy(() =>
  import('./components/admin/departments/AdminDeptCards')
);
const AdminDeptUserView = lazy(() =>
  import('./components/admin/departments/AdminDeptUserView')
);

const AdminUsersNoDeptTable = lazy(() =>
  import('./components/admin/users/dept/AdminUsersNoDeptTable')
);

// courses
const AdminCourseManager = lazy(() =>
  import('./components/admin/courses/AdminCourseManager')
);
const AdminCourseTypes = lazy(() =>
  import('./components/admin/courses/AdminCourseTypes')
);
const AdminCourseLevels = lazy(() =>
  import('./components/admin/courses/AdminCourseLevels')
);
const AdminUserCseManager = lazy(() =>
  import('./components/admin/users/courses/AdminUserCseManager')
);
const AdminCourseView = lazy(() =>
  import('./components/admin/courses/AdminCourseView')
);
const AdminCourseTools = lazy(() =>
  import('./components/admin/courses/AdminCourseTools')
);

// ojts
// const AdminOJTTools = lazy(() => {
//   import('./components/admin/onjobtraining/AdminOJTTools');
// });

//comps
const AdminCompManager = lazy(() =>
  import('./components/admin/competencies/AdminCompManager')
);
const AdminCompetencyView = lazy(() =>
  import('./components/admin/competencies/AdminCompetencyView')
);
const AdminCompTools = lazy(() =>
  import('./components/admin/competencies/AdminCompTools')
);

// roles
const AdminRoleManager = lazy(() =>
  import('./components/admin/roles/AdminRoleManager')
);
const AdminRoleView = lazy(() =>
  import('./components/admin/roles/AdminRoleView')
);
const AdminRoleTools = lazy(() =>
  import('./components/admin/roles/AdminRoleTools')
);

// user
const AdminUserAccess = lazy(() =>
  import('./components/admin/users/access/AdminUserAccess')
);
const AdminUserManager = lazy(() =>
  import('./components/admin/users/roles/AdminUserManager')
);
const AdminUserTools = lazy(() =>
  import('./components/admin/users/AdminUserTools')
);

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
  // console.log(user);
  if (!isEmpty(user)) {
    if (user.verified) {
      return true;
    }
  }

  return false;
};

const checkAdmin = (user) => {
  // console.log(user);
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
      <Router>
        <Suspense fallback={<div>Loading......</div>}>
          <Fragment>
            <Header />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
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
                  path="/users/:id/profile"
                  component={UserProfile}
                />
                <PrivateRoute
                  user={user}
                  path="/users/:id/courses"
                  component={CoursesHome}
                />
                <PrivateRoute
                  user={user}
                  path="/users/:id/competencies"
                  component={CompsHome}
                />
                <PrivateAdminRoute
                  user={user}
                  path="/admin/dashboard"
                  component={AdminDashBoard}
                />
                <PrivateAdminRoute
                  user={user}
                  path="/admin/app-tools"
                  component={AdminApplicationTools}
                />
                <PrivateAdminRoute
                  user={user}
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
                  path="/admin/course-types"
                  component={AdminCourseTypes}
                />
                <PrivateAdminRoute
                  user={user}
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
                  path="/admin/ojt-tools"
                  component={AdminOJTTools}
                />
                <PrivateAdminRoute
                  user={user}
                  path="/admin/ojt-manager"
                  component={AdminOJTManager}
                />
                <PrivateAdminRoute
                  user={user}
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
                  path="/admin/comp-manager/view/:id"
                  component={AdminCompetencyView}
                />
                <PrivateAdminRoute
                  user={user}
                  path="/admin/role-tools"
                  component={AdminRoleTools}
                />
                <PrivateAdminRoute
                  exact
                  user={user}
                  path="/admin/role-manager"
                  component={AdminRoleManager}
                />
                <PrivateAdminRoute
                  user={user}
                  path="/admin/role-manager/view/:id"
                  component={AdminRoleView}
                />
                <PrivateAdminRoute
                  user={user}
                  path="/admin/user-tools"
                  component={AdminUserTools}
                />
                <PrivateAdminRoute
                  user={user}
                  path="/admin/user-access-manager"
                  component={AdminUserAccess}
                />
                <PrivateAdminRoute
                  user={user}
                  path="/admin/user-manager"
                  component={AdminUserManager}
                />
                <PrivateAdminRoute
                  user={user}
                  path="/admin/user-courses-manager"
                  component={AdminUserCseManager}
                />
                <PrivateAdminRoute
                  user={user}
                  path="/admin/dept-tools"
                  component={AdminDeptTools}
                />
                <PrivateAdminRoute
                  exact
                  user={user}
                  path="/admin/dept-manager"
                  component={AdminDeptManager}
                />
                <PrivateAdminRoute
                  user={user}
                  path="/admin/dept-views"
                  component={AdminDeptCards}
                />
                <PrivateAdminRoute
                  user={user}
                  path="/admin/dept-user-view/:id"
                  component={AdminDeptUserView}
                />
                <PrivateAdminRoute
                  user={user}
                  path="/admin/dept-manager/view/:id"
                  component={AdminDeptView}
                />
                <PrivateAdminRoute
                  user={user}
                  path="/admin/users-no-dept"
                  component={AdminUsersNoDeptTable}
                />
                <PrivateAdminRoute
                  user={user}
                  path="/application/feedback-manager"
                  component={AppFeedbckManager}
                />
                <Redirect to="/" />
              </Switch>
            </Container>
          </Fragment>
        </Suspense>
      </Router>
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
