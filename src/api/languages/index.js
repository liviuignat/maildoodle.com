import { requiredAuthenticated } from './../middleware';
import { sendHttpError } from './../http';

import {
  getProjectById,
  updateProject
} from './../projects/projects';

import {getLanguageById, updateLanguage} from './languages';

export function setupRoutes(app, prefix=''){
  app.post(`${prefix}/:projectId/languages`, requiredAuthenticated, (req, res) => {
    getProjectById(req.user.objectId, req.params.projectId)
      .then((project) => {
       project.languages.push(req.body)
        return updateProject(project.objectId, project);
      })
      .then(() => getProjectById(req.user.objectId, req.params.projectId))
      .then((project) => {
        const newLanguageKey = req.body.key;
        const addedLanguage = project.languages.find((element) => {
          return element.key === newLanguageKey;
        });

        return res.json(addedLanguage);
      })
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });

  app.get(`${prefix}/:projectId/languages`, requiredAuthenticated, (req, res) => {
    getProjectById(req.user.objectId, req.params.projectId)
      .then((project) => {
          return res.json(project.languages);
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
      .then(language => res.json(language))
      .catch(err => sendHttpError(res, { code: 400, err }));
  });

  app.get(`${prefix}/:projectId/languages/:languageId`, requiredAuthenticated, (req, res) => {
    getProjectById(req.user.objectId, req.params.projectId)
    .then((project) => {
      const result = project.languages.find((element) => {
       return element.objectId === req.params.languageId;
      });

      if (!result) {
        sendHttpError(res, {code: 404});
      }

      return res.json(result);
    })
    .catch((err) => sendHttpError(res, { code: 400, err }));
  });

  app.del(`${prefix}/:projectId/languages/:languageId`, requiredAuthenticated, (req, res) => {
    getProjectById(req.user.objectId, req.params.projectId)
    .then((project) => {
      const indexOfLanguage = project.languages.findIndex((item) => {
        return item.objectId === req.params.languageId;
      });

      project.languages.splice(indexOfLanguage, 1);
      return updateProject(project.objectId, project);
    })
    .then(() => {
      return res.sendStatus(200);
    })
    .catch((err) => sendHttpError(res, { code: 400, err }));
  });
}