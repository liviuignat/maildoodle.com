import {expect} from 'chai';
import {request, cleanup, createUser} from './../../supertest';

describe('projectModule tests', () => {
  let currentUser;

  beforeEach((done) => {
    cleanup()
      .then(() => createUser())
      .then((user) => {
        currentUser = user
      })
      .then(() => done())
      .catch((err) => done(err));
  });

  describe('When inserting a project', () => {
    let newProject = {
      name: 'new project',
      description: 'new project description'
    };
    let createProjectRequest;
    beforeEach(() => {
      createProjectRequest = request.post('/api/projects')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${currentUser.sessionToken}`)
        .send(newProject);
    });

    it('Should create the project with success', (done) => {
      createProjectRequest.expect(200).end(done);
    });
  });
});