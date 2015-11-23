import mongoose from 'mongoose';
import config from './config';
import * as auth from './auth';
import * as user from './user';
import * as projects from './projects';
import * as languages from './languages';

console.log('MONGO_URI:', config.mongodb.url);
mongoose.connect(config.mongodb.url);

export function setupRoutes(app) {
  auth.setupRoutes(app, '/api/auth');
  user.setupRoutes(app, '/api/user');
  projects.setupRoutes(app, '/api/projects');
  languages.setupRoutes(app, '/api/projects');
};
