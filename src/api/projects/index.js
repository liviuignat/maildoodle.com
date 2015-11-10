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
    getProjects(req.user.objectId)
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json(err));
  });

  app.post(`${prefix}/`, requiredAuthenticated, (req, res) => {
    insertProject(req.user.objectId, req.body)
      .then((response) => getProjectById(req.user.objectId, response.objectId))
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json(err));
  });

  app.put(`${prefix}/:projectId`, requiredAuthenticated, (req, res) => {
    updateProject(req.params.projectId, req.body)
      .then((response) => getProjectById(req.user.objectId, req.params.projectId))
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json(err));
  });

  app.del(`${prefix}/:projectId`, requiredAuthenticated, (req, res) => {
    deleteProject(req.params.projectId)
      .then((response) => res.json({ response: 'success' }))
      .catch((err) => res.status(400).json(err));
  });
};