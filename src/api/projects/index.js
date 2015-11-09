import { requiredAuthenticated } from './../middleware';
import {
  getProjects,
  getProjectById,
  insertProject,
  updateProject,
  deleteProject
} from './projects';

export function setupRoutes(app, prefix = '') {
  app.get(`${prefix}/`, requiredAuthenticated, (req, res) => {
    getProjects(req.user.id)
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json(err));
  });

  app.post(`${prefix}/`, requiredAuthenticated, (req, res) => {
    const project = req.body;
    const user = req.user;

    insertProject(user.id, project)
      .then((response) => response.objectId)
      .then(getProjectById)
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json(err));
  });
};