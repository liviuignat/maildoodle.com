import co from 'co';
import { requiredAuthenticated } from './../../middleware';
import { sendHttpError } from './../../http';

import {
  getProjectById,
  updateProject
} from './../projects/projects';

import {getLayoutById, updateLayout} from './layouts';

export function setupRoutes(app, prefix = '/api/projects') {
  app.post(`${prefix}/:projectId/layouts`, requiredAuthenticated, (req, res) => {
    const userId = req.user.objectId;
    const projectId = req.params.projectId;
    const newLayout = req.body;

    co(function*() {
      const existingProject = yield getProjectById(userId, projectId);
      existingProject.layouts.push(newLayout);
      yield updateProject(existingProject.objectId, existingProject);

      const project = yield getProjectById(userId, projectId);
      const addedLayout = project.layouts.find((element) => element.name === newLayout.name);

      return addedLayout;
    }).then(layout => res.json(layout))
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });

  app.get(`${prefix}/:projectId/layouts`, requiredAuthenticated, (req, res) => {
    getProjectById(req.user.objectId, req.params.projectId)
      .then((project) => {
        return res.json(project.layouts);
      })
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });

  app.get(`${prefix}/:projectId/layouts/:layoutId`, requiredAuthenticated, (req, res) => {
    getProjectById(req.user.objectId, req.params.projectId)
    .then((project) => {
      const result = project.layouts.find((element) => {
        return element.objectId === req.params.layoutId;
      });

      if (!result) {
        return sendHttpError(res, { code: 404 });
      }

      return res.json(result);
    })
    .catch((err) => sendHttpError(res, { code: 400, err }));
  });

  app.put(`${prefix}/:projectId/layouts/:layoutId`, requiredAuthenticated, (req, res) => {
    const userId = req.user.objectId;
    const projectId = req.params.projectId;
    const layoutId = req.params.layoutId;
    const layout = req.body;

    updateLayout(userId, projectId, layoutId, layout)
      .then(() => getLayoutById(userId, projectId, layoutId))
      .then(lay => res.json(lay))
      .catch(err => sendHttpError(res, { code: 400, err }));
  });

  app.delete(`${prefix}/:projectId/layouts/:layoutId`, requiredAuthenticated, (req, res) => {
    getProjectById(req.user.objectId, req.params.projectId)
    .then((project) => {
      const indexOfLayout = project.layouts.findIndex((item) => {
        return item.objectId === req.params.layoutId;
      });

      if (indexOfLayout === -1) {
        throw new Error('Cannot delete the requested object. The object was not found.');
      }

      project.layouts.splice(indexOfLayout, 1);
      return updateProject(project.objectId, project);
    })
    .then(() => {
      return res.sendStatus(200);
    })
    .catch((err) => sendHttpError(res, { code: 400, err }));
  });
}
