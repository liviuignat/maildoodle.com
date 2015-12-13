import mongoose from 'mongoose';
import config from './config';
import * as auth from './modules/auth';
import * as user from './modules/user';
import * as projects from './modules/projects';
import * as languages from './modules/languages';
import * as templates from './modules/templates';

console.log('MONGO_URI:', config.mongodb.url);
mongoose.connect(config.mongodb.url);

export function setupRoutes(app) {
  auth.setupRoutes(app, '/api/auth');
  user.setupRoutes(app, '/api/user');
  projects.setupRoutes(app, '/api/projects');
  languages.setupRoutes(app, '/api/projects');
  templates.setupRoutes(app, '/api/projects/:projectId/templates');
};
