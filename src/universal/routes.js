import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isUserLoaded, loadUserAction } from './redux/reducers/auth';
import {
    AppContainer,
    HomePage,
    LoginPage,
    SignUpPage,
    DashboardPage,
    ProjectListPage,
    ProjectDetailPage,
    LayoutDetailPage,
    TemplateDetailPage,
    MyAccountPage,
    NotFoundPage
  } from './containers';

export default (store) => {
  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        replaceState(null, '/auth/login');
      }
      cb();
    }

    if (!isUserLoaded(store.getState())) {
      store.dispatch(loadUserAction()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  const requireNotLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (user) {
        replaceState(null, '/app');
      }
      cb();
    }

    if (!isUserLoaded(store.getState())) {
      store.dispatch(loadUserAction()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  return (
    <Route path="/" component={AppContainer}>
      <IndexRoute component={HomePage} />

      <Route path="/auth/login" component={LoginPage} onEnter={requireNotLogin} />
      <Route path="/auth/sign-up" component={SignUpPage} onEnter={requireNotLogin} />

      <Route onEnter={requireLogin}>
        <Route path="/app" component={DashboardPage} />

        <Route path="/app/projects" component={ProjectListPage} />
        <Route path="/app/projects/:projectId" component={ProjectDetailPage} />
        <Route path="/app/projects/:projectId/layouts/:layoutId" component={LayoutDetailPage} />
        <Route path="/app/projects/:projectId/templates/:templateId" component={TemplateDetailPage} />

        <Route path="/app/my-account" component={MyAccountPage}/>
      </Route>

      <Route path="*" component={NotFoundPage} status={404} />
    </Route>
  );
};
