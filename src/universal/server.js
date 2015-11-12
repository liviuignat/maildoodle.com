import app from './expressApp';
import http from 'http';
import config from './../config';

const server = new http.Server(app);

server.listen(config.port, (err) => {
  if (err) {
    console.error(err);
  }

  console.info(`----\n==> ✅ ${config.app.title} is running`);
  console.info(`==> 💻  Open http://localhost:${config.port} in a browser to view the app.`);
});