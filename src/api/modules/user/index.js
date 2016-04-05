import {requiredAuthenticated} from './../../middleware';
import {getUserById, updateApiAccessToken, updateUserPersonalData, updateUserPassword} from './userRepository';
import {sendHttpError} from './../../http';

export function setupRoutes(app, prefix = '/api/user') {
  app.get(`${prefix}/me`, requiredAuthenticated, (req, res) => {
    res.json(req.user);
  });

  app.put(`${prefix}/me/apiaccesstoken`, requiredAuthenticated, (req, res) => {
    updateApiAccessToken(req.user.objectId)
      .then(() => getUserById(req.user.objectId))
      .then((updatedUser) => res.json(updatedUser))
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });

  app.put(`${prefix}/me`, requiredAuthenticated, (req, res) => {
    const userId = req.user.objectId;
    const payload = req.body;

    updateUserPersonalData(userId, payload)
      .then(() => getUserById(userId))
      .then((updatedUser) => res.json(updatedUser))
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });

  app.put(`${prefix}/me/password`, requiredAuthenticated, (req, res) => {
    const {user} = req;
    const {password} = req.body;
    const userId = user.objectId;

    updateUserPassword(userId, password)
      .then(() => getUserById(userId))
      .then((updatedUser) => res.json(updatedUser))
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });
}
