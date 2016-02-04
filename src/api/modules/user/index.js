import { requiredAuthenticated } from './../../middleware';
import { getUserById, updateApiAccessToken } from './userRepository';
import { sendHttpError } from './../../http';

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
}
