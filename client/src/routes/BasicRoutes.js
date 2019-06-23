import React from 'react';
import { Route } from 'react-router-dom';

import LoginUser from '../components/auth/login';
import Landing from '../components/Landing';
import RegisterUser from '../components/auth/register';

const BasicRoutes = () => {
  return (
    <>
      <Route exact path="/" component={Landing} />
      <Route exact path="/auth/login" component={LoginUser} />
      <Route exact path="/auth/register" component={RegisterUser} />
    </>
  );
};

export default function() {
  return BasicRoutes;
}
