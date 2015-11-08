import * as auth from './auth';
import * as user from './user';

export function setupRoutes(app) {
  auth.setupRoutes(app, '/api/auth');
  user.setupRoutes(app, '/api/user');
};