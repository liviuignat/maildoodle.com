import { requiredAuthenticated } from './../../middleware';
import { sendHttpError } from './../../http';
import {
  getTemplatesByProjectId,
  getTemplateById,
  insertTemplate,
  updateTemplate,
  deleteTemplate
} from './templates';

export function setupRoutes(app, prefix = '/api/projects/:projectId/templates') {
  app.get(`${prefix}/`, requiredAuthenticated, (req, res) => {
    const user = req.user;
    const projectId = req.params.projectId;

    getTemplatesByProjectId(user.objectId, projectId)
      .then((response) => res.json(response))
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });

  app.get(`${prefix}/:templateId`, requiredAuthenticated, (req, res) => {
    const user = req.user;
    const projectId = req.params.projectId;
    const templateId = req.params.templateId;

    getTemplateById(user.objectId, projectId, templateId)
      .then((response) => res.json(response))
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });

  app.post(`${prefix}/`, requiredAuthenticated, (req, res) => {
    const user = req.user;
    const projectId = req.params.projectId;
    const template = req.body;

    insertTemplate(user.objectId, projectId, template)
      .then((response) => res.json(response))
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });

  app.put(`${prefix}/:templateId`, requiredAuthenticated, (req, res) => {
    const user = req.user;
    const projectId = req.params.projectId;
    const templateId = req.params.templateId;
    const template = req.body;

    updateTemplate(user.objectId, projectId, templateId, template)
      .then((response) => res.json(response))
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });

  app.delete(`${prefix}/:templateId`, requiredAuthenticated, (req, res) => {
    const user = req.user;
    const projectId = req.params.projectId;
    const templateId = req.params.templateId;

    deleteTemplate(user.objectId, projectId, templateId)
      .then((response) => res.json(response))
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });
};