import { login, signUp, resetPassword } from './auth';
import { sendHttpError } from './../../http';

export function setupRoutes(app, prefix = '') {
  app.post(`${prefix}/login`, (req, res) => {
    const { email, password } = req.body;

    login(email, password)
      .then((response) => res.json(response))
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });

  app.post(`${prefix}/signup`, (req, res) => {
    const {email, password} = req.body;

    signUp(email, password)
      .then((response) => res.json(response))
      .catch((err) => sendHttpError(res, { code: 400, err }));

  });

  app.post(`${prefix}/resetpassword`, (req, res) => {
    const {email} = req.body;

    resetPassword(email)
      .then((response) => res.json(response))
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });
}
