import co from 'co';
import { requiredAuthenticated } from './../../middleware';
import { sendHttpError } from './../../http';

import {getProjectById} from './../projects/projects';

import {
  getLayoutById,
  insertLayout,
  updateLayout,
  deleteLayout
} from './layouts';

export function setupRoutes(app, prefix = '/api/projects') {
  app.post(`${prefix}/:projectId/layouts`, requiredAuthenticated, (req, res) => {
    const userId = req.user.objectId;
    const projectId = req.params.projectId;
    const newLayout = req.body;

    co(function*() {
      return yield insertLayout(userId, projectId, newLayout);
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
    const userId = req.user.objectId;
    const projectId = req.params.projectId;
    const layoutId = req.params.layoutId;

    deleteLayout(userId, projectId, layoutId)
      .then(() => res.sendStatus(200))
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });
}
