import { requiredAuthenticated } from './../middleware';
import { sendHttpError } from './../http';
import {
  getTemplatesByProjectId
} from './templates';

export function setupRoutes(app, prefix = '') {
  app.get(`${prefix}/`, requiredAuthenticated, (req, res) => {
    const user = req.user;
    const projectId = req.params.projectId;

    getTemplatesByProjectId(user.id, projectId)
      .then((response) => res.json(response))
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });
};