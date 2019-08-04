import React, { lazy } from 'react';

import { LazyComponent, PrivateRoute } from './routeHelpers';

const UserLanding = lazy(() => import('../components/user/UserLanding'));
const AppVersion = lazy(() => import('../components/version/AppVersion'));
const AppFeedback = lazy(() => import('../components/feedback/AppFeedback'));
const UserProfile = lazy(() =>
  import('../components/user/profile/UserProfile')
);
const CoursesHome = lazy(() => import('../components/user/CoursesHome'));
const CompsHome = lazy(() => import('../components/user/CompsHome'));

const UserRoutes = () => {
  return (
    <>
      <PrivateRoute
        // user={user}
        exact
        path="/application/version"
        component={LazyComponent(AppVersion)}
      />
      <PrivateRoute
        // user={user}
        exact
        path="/application/feedback"
        component={LazyComponent(AppFeedback)}
      />
      <PrivateRoute
        // user={user}
        exact
        path="/users/:id"
        component={LazyComponent(UserLanding)}
      />
      <PrivateRoute
        // user={user}
        path="/users/:id/profile"
        component={LazyComponent(UserProfile)}
      />
      <PrivateRoute
        // user={user}
        path="/users/:id/courses"
        component={LazyComponent(CoursesHome)}
      />
      <PrivateRoute
        // user={user}
        path="/users/:id/competencies"
        component={LazyComponent(CompsHome)}
      />
    </>
  );
};

export default function() {
  return UserRoutes;
}
