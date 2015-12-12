import supertest from 'supertest';
import app from './../universal/expressApp';
import {getMongdb} from './mongodb';

export const request = supertest(app);

export function cleanup() {
  return deleteMongoDb();
}

export function deleteMongoDb() {
  return new Promise((resolve, reject) => {
    getMongdb().then(db => {
      db.dropDatabase((err) => {
        if(err) {
          return reject(err);
        }
        return resolve();
      });
    });
  });
}

export function createUser(user) {
  const newAccount = user || {
    email: 'liviu@emaileditor.com',
    password: 'newpassword'
  };

  return new Promise((resolve, reject) => {
    request.post('/api/auth/signup')
      .set('Content-type', 'application/json')
      .send(newAccount)
      .end(() => {

        request.post('/api/auth/login')
          .set('Content-type', 'application/json')
          .send(newAccount)
          .end((err, res) => {
            if(err) {
              return reject(err);
            }
            return resolve(res.body);
          });

      });
  });
}

export function createProject(currentUser, newProject) {
  return new Promise((resolve, reject) => {
    request.post('/api/projects')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${currentUser.sessionToken}`)
      .send(newProject)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        return resolve(res.body);
      });
  });
}

export function getTemplatesByProjectId(currentUser, projectId) {
  return new Promise((resolve, reject) => {
    request
      .get(`/api/projects/${projectId}/templates`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${currentUser.sessionToken}`)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        return resolve(res.body);
      });
  });
}
