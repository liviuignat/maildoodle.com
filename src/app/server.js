import url from 'url';
import config from 'config';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import serveStatic from 'serve-static';
import ReactEngine from 'react-engine';
import { routes } from './components/routes';

import {
  userFromParseMiddleware,
  requestAuthTokenMiddleware
} from './_server/auth';

const app = express();

const PORT = process.env.PORT || 3000;
const DIR = __dirname;

class Server {

  constructor() { }

  start() {
    const engine = ReactEngine.server.create({
      routes: routes
    });
    app.engine('.jsx', engine);
    app.set('views', path.join(DIR, 'components'));
    app.set('view engine', 'jsx');
    app.set('view', ReactEngine.expressView);

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(serveStatic(path.join(DIR, config.publicFolder)));

    app.use(requestAuthTokenMiddleware);
    app.use(userFromParseMiddleware);

    const render = (req, res, data) => {
      const obj = data || {};
      obj.isLoggedIn = !!req.user;
      obj.user = req.user;

      const theUrl = url.parse(req.url).pathname.replace(/\.+/g, '');
      res.render(theUrl, obj);
    };

    const shouldBeAuthenticated = (req, res, next) => {
      if (!req.user) {
        return res.redirect('/auth/login');
      }

      next();
    };

    const shouldNoBeAuthenticated = (req, res, next) => {
      if (req.user) {
        return res.redirect('/app');
      }

      next();
    };

    app.get('/app', shouldBeAuthenticated, (req, res) => {
      render(req, res);
    });

    app.get('/app/*', shouldBeAuthenticated, (req, res) => {
      render(req, res);
    });

    app.get('/*', shouldNoBeAuthenticated, (req, res) => {
      render(req, res);
    });

    const server = app.listen(PORT, () => {
      const host = server.address().address;
      const port = server.address().port;

      console.log('server listening at http://%s:%s', host, port);
    });
  }
}

export default { Server };
