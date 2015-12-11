import {expect} from 'chai';
import {
  request,
  cleanup,
  createUser,
  createProject
} from './../../supertest';

describe('templateModule tests', () => {
  let currentUser;
  let currentProject;

  const newProject = {
    name: 'new project',
    description: 'new project description'
  };

  beforeEach((done) => {
    cleanup()
      .then(() => createUser())
      .then((user) => { currentUser = user; })
      .then(() => createProject(currentUser, newProject))
      .then((project) => { currentProject = project })
      .then(() => { done(); })
      .catch((err) => { done(err); });
  });

  const getTemplatesRequest = (projectId) => request
    .get(`/api/projects/${projectId}/templates`)
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${currentUser.sessionToken}`);


  it('should not have any template',
    (done) => getTemplatesRequest(currentProject.objectId).expect(200).end(done));
});
