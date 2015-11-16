import * as auth from './auth';
import * as user from './user';
import * as projects from './projects';

export function setupRoutes(app) {
  auth.setupRoutes(app, '/api/auth');
  user.setupRoutes(app, '/api/user');
  projects.setupRoutes(app, '/api/projects');
};