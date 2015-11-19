import { requiredAuthenticated } from './../middleware';
import { sendHttpError } from './../http';

import {
  getProjectById,
  updateProject
} from './../projects/projects'


app.post(`${prefix}/:projectId/language`, requiredAuthenticated, (req, res) => {

  getProjectById(req.user.objectId, req.params.projectId)
    .then((project) => project.languages.append(req.body))
    .then((project) => {
      languages = updateProject(req.user.objectId, )
    })
    .catch((err) => sendHttpError(res, { code: 400, err }));
});