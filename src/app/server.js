import url from 'url';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
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
    app.use(serveStatic(path.join(DIR, '..', '..', '.dist')));

    app.use(session({
      secret: 'secretify',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60 * 60 * 1000,
        httpOnly: false
      }
    }));

    app.use(requestAuthTokenMiddleware);
    app.use(userFromParseMiddleware);

    app.get('*', (req, res) => {
      const theUrl = url.parse(req.url).pathname.replace(/\.+/g, '');

      res.render(theUrl, {
        isLoggedIn: !!req.user,
        user: req.user
      });
    });

    const server = app.listen(PORT, () => {
      const host = server.address().address;
      const port = server.address().port;

      console.log('server listening at http://%s:%s', host, port);
    });
  }
}

export default { Server };
