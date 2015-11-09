import { requiredAuthenticated } from './../middleware';
import { getProjects } from './projects';

export function setupRoutes(app, prefix = '') {
  app.get(`${prefix}/`, requiredAuthenticated, (req, res) => {
    getProjects()
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json(err));
  });

  app.post(`${prefix}/`, requiredAuthenticated, (req, res) => {
    const { project } = req.body;

    insertProject()
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json(err));
  });
};