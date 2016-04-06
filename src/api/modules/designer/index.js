import superagent from 'superagent';
import config from 'api/config';
import {sendHttpError} from 'api/http';

const URL = config.componentsApiUrl;

export function setupRoutes(app, prefix = '/api/designer') {
  app.post(`${prefix}/component/render`, (req, res) => {
    const {component, data} = req.body;
    const url = `${URL}/component/render`;

    superagent.post(url)
      .set('Content-type', `application/json`)
      .send({component, data})
      .end((err, response = {}) => {
        const {status, body} = response;
        res.status(status);
        res.json(body);
      });
  });
}
