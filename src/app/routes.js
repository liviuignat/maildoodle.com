import * as React from 'react';
import { Router, Route, DefaultRoute } from 'react-router';
import AppComponent from './components/AppComponent';
import HomePage from './components/pages/home/HomePage';
// import LoginPage from './components/pages/auth/login/LoginPage';
// import ResetPasswordPage from './components/pages/auth/reset-password/ResetPasswordPage';
// import CreateUserPage from './components/pages/auth/create-user/CreateUserPage';

const routes = (
  <Route path='/' handler={AppComponent}>
    <DefaultRoute handler={ HomePage }/>
  </Route>
);

export default routes;
