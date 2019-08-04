import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Container } from 'semantic-ui-react';
import ErrorBoundary from './ErrorBoundary';

import Header from './components/Header';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import BasicRoutes from './routes/BasicRoutes';

const Layout = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Fragment>
          <Header />
          <Container style={{ marginTop: '7em' }}>
            <Route>{BasicRoutes()}</Route>
            <Route>{UserRoutes()}</Route>
            <Route>{AdminRoutes()}</Route>
          </Container>
        </Fragment>
      </ErrorBoundary>
    </Router>
  );
};

export default Layout;
