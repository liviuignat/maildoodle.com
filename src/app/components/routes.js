import * as React from 'react';
import { Route, DefaultRoute } from 'react-router';

import AppComponent from './AppComponent';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/login/LoginPage';
import ResetPasswordPage from './pages/auth/reset-password/ResetPasswordPage';
import CreateUserPage from './pages/auth/create-user/CreateUserPage';

import AppHomePage from './pages/app/home/AppHomePage';
import MyAccountPage from './pages/app/my-account/MyAccountPage';

export const routes = (
  <Route path="/" handler={AppComponent}>
    <DefaultRoute handler={HomePage} />
    <Route path="auth/login" handler={LoginPage} />
    <Route path="auth/signup" handler={CreateUserPage} />
    <Route path="auth/resetpassword" handler={ResetPasswordPage} />

    <Route path="/app" handler={AppHomePage} />
    <Route path="/app/my-account" handler={MyAccountPage} />

    <Route path="*" handler={HomePage} />
  </Route>
);

