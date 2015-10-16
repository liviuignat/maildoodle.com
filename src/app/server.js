import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import serveStatic from 'serve-static';
import path from 'path';

const app = express();

const PORT = process.env.PORT || 3000;
const DIR = __dirname;

class Server {

  constructor() { }

  start() {

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(serveStatic(path.join(DIR, 'public')));

    const server = app.listen(PORT, () => {
      const host = server.address().address;
      const port = server.address().port;

      console.log('Example app listening at http://%s:%s', host, port);
    });
  }
}

export default { Server };