import { login } from './auth';

export function setupRoutes(app, prefix = '') {
  app.post(`${prefix}/login`, (req, res) => {
    const { email, password } = req.body;

    login(email, password)
      .then((response) => res.json(response))
      .catch((err) => res.status(401).json(err));
  });
};