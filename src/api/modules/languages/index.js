import co from 'co';
import { requiredAuthenticated } from './../../middleware';
import { sendHttpError } from './../../http';

import {getProjectById} from './../projects/projects';

import {
  insertLanguage,
  getLanguageById,
  updateLanguage,
  deleteLanguage
} from './languages';

export function setupRoutes(app, prefix = '') {
  app.post(`${prefix}/:projectId/languages`, requiredAuthenticated, (req, res) => {
    const userId = req.user.objectId;
    const projectId = req.params.projectId;
    const newLanguage = req.body;

    co(function*() {
      return yield insertLanguage(userId, projectId, newLanguage);
    }).then(language => res.json(language))
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });

  app.get(`${prefix}/:projectId/languages`, requiredAuthenticated, (req, res) => {
    getProjectById(req.user.objectId, req.params.projectId)
      .then((project) => {
        return res.json(project.languages);
      })
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });

  app.get(`${prefix}/:projectId/languages/:languageId`, requiredAuthenticated, (req, res) => {
    getProjectById(req.user.objectId, req.params.projectId)
      .then((project) => {
        const result = project.languages.find((element) => {
          return element.objectId === req.params.languageId;
        });

        if (!result) {
          return sendHttpError(res, { code: 404 });
        }

        return res.json(result);
      })
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });

  app.put(`${prefix}/:projectId/languages/:languageId`, requiredAuthenticated, (req, res) => {
    const userId = req.user.objectId;
    const projectId = req.params.projectId;
    const languageId = req.params.languageId;
    const language = req.body;

    updateLanguage(userId, projectId, languageId, language)
      .then(() => getLanguageById(userId, projectId, languageId))
      .then(lang => res.json(lang))
      .catch(err => sendHttpError(res, { code: 400, err }));
  });

  app.delete(`${prefix}/:projectId/languages/:languageId`, requiredAuthenticated, (req, res) => {
    const userId = req.user.objectId;
    const projectId = req.params.projectId;
    const languageId = req.params.languageId;

    deleteLanguage(userId, projectId, languageId)
      .then(() => res.sendStatus(200))
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });
}
