import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';

export const LazyComponent = (Component) => {
  return (props) => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};

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

export const PrivateAdminRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.auth.user);
  // console.log(user);
  return (
    <Route
      {...rest}
      render={(props) =>
        checkAdmin(user) === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.auth.user);
  // console.log(user);
  return (
    <Route
      {...rest}
      render={(props) =>
        checkAuth(user) === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
};
