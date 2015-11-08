import { requiredAuthenticated } from './../middleware';

export function setupRoutes(app, prefix = '') {
  app.get(`${prefix}/me`, requiredAuthenticated, (req, res) => {
    res.json(req.user);
  });
};