import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isUserLoaded, loadUserAction } from './redux/reducers/auth/actionCreators';
import {
    AppContainer,
    HomePage,
    DocumentationPage,
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

const REDIRECT_URL_LOGGED_IN = '/app/projects';
const REDIRECT_URL_LOGGED_OUT = '/auth/login';

export default (store) => {
  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        replaceState(null, REDIRECT_URL_LOGGED_OUT);
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
        replaceState(null, REDIRECT_URL_LOGGED_IN);
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
    <Route name="test" path="/" component={AppContainer}>
      <IndexRoute name="test" component={HomePage} onEnter={requireNotLogin} />
      <Route name="test" path="auth/login" component={LoginPage} onEnter={requireNotLogin} />
      <Route name="test" path="auth/sign-up" component={SignUpPage} onEnter={requireNotLogin} />
      <Route name="test" path="documentation" component={DocumentationPage} />

      <Route name="test" onEnter={requireLogin}>
        <Route name="test" path="app" component={DashboardPage} />
        <Route name="test" path="app/my-account" component={MyAccountPage}/>

        <Route name="test" path="app/projects" component={ProjectListPage} />
        <Route name="test" path="app/projects/:projectId" component={ProjectDetailPage} />
        <Route name="test" path="app/projects/:projectId/layouts/:layoutId" component={LayoutDetailPage} />
        <Route name="test" path="app/projects/:projectId/templates/:templateId" component={TemplateDetailPage} />
      </Route>

      <Route name="test" path="*" component={NotFoundPage} status={404} />
    </Route>
  );
};
