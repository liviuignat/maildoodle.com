import Express from 'express';
import http from 'http';
import path from 'path';
import favicon from 'serve-favicon';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import PrettyError from 'pretty-error';

import React from 'react';
import ReactDOM from 'react-dom/server';
import {ReduxRouter} from 'redux-router';
import createHistory from 'history/lib/createMemoryHistory';
import {reduxReactRouter, match} from 'redux-router/server';
import {Provider} from 'react-redux';
import qs from 'query-string';

import createStore from './redux/create';
import routes from './routes';
import ApiClient from './helpers/ApiClient';
import Html from './helpers/Html';
import getStatusFromRoutes from './helpers/getStatusFromRoutes';
import config from './../config';
import * as middleware from './../api/middleware';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));
app.use(require('serve-static')(path.join(__dirname, '..', 'static')));

app.use((req, res, next) => {
  if(req.url.indexOf('/api/') === 0) {
    return next();
  }

  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  const client = new ApiClient(req);
  const store = createStore(reduxReactRouter, routes, createHistory, client);

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  store.dispatch(match(req.originalUrl, (error, redirectLocation, routerState) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (!routerState) {
      res.status(500);
      hydrateOnClient();
    } else {
      // Workaround redux-router query string issue:
      // https://github.com/rackt/redux-router/issues/106
      if (routerState.location.search && !routerState.location.query) {
        routerState.location.query = qs.parse(routerState.location.search);
      }

      store.getState().router.then(() => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxRouter/>
          </Provider>
        );

        const status = getStatusFromRoutes(routerState.routes);
        if (status) {
          res.status(status);
        }
        res.send('<!doctype html>\n' +
          ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
      }).catch((err) => {
        console.error('DATA FETCHING ERROR:', pretty.render(err));
        res.status(500);
        hydrateOnClient();
      });
    }
  }));
});

app.use(middleware.requestAuthToken);
app.use(middleware.userFromParse);
require('./../api').setupRoutes(app);

server.listen(config.port, (err) => {
  if (err) {
    console.error(err);
  }

  console.info(`----\n==> ✅ ${config.app.title} is running`);
  console.info(`==> 💻  Open http://localhost:${config.port} in a browser to view the app.`);
});