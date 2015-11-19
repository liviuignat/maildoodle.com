import {expect} from 'chai';
import {request, cleanup, createUser} from './../../supertest';

describe('templateModule tests', () => {
  let currentUser;
  let currentProject;

  beforeEach(() => {
    cleanup()
      .then(() => createUser())
      .then((user) => {
        currentUser = user
      })
      .then((done) => {
        request.post('/api/projects')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${currentUser.sessionToken}`)
          .send(newProject)
          .end((err, response) => {
            if (err) {
              return done(err)
            }
            currentProject = response.body;
            return done();
        })
      })
      .catch((err) => {done(err)});
  });
});