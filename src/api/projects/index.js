import { requiredAuthenticated } from './../middleware';
import { getProjects } from './projects';

export function setupRoutes(app, prefix = '') {
  app.get(`${prefix}/`, requiredAuthenticated, (req, res) => {
    const { email, password } = req.body;

    getProjects()
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json(err));
  });
};