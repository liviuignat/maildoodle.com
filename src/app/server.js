import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import serveStatic from 'serve-static';
import path from 'path';
import ReactEngine from 'react-engine';
import { routes } from './components/routes';

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

    app.get('*', (req, res) => {
      res.render(req.url, {
      });
    });

    const server = app.listen(PORT, () => {
      const host = server.address().address;
      const port = server.address().port;

      console.log('Example app listening at http://%s:%s', host, port);
    });
  }
}

export default { Server };