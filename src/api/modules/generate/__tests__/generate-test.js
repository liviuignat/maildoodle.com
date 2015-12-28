import co from 'co';
import {expect} from 'chai';
import {
  request,
  cleanup,
  createUser,
  createProject,
  createTemplate
} from './../../../supertest';

describe('GIVEN we want generate a template from the API', () => {
  let that = {}, currentUser, currentProject, currentTemplate;
  const newProject = {
    name: 'new project',
    description: 'new project description'
  };
  const newTemplate = {
    name: 'new template',
    description: 'new template description'
  };

  const getHtmlRequest = (json) => {
    const url = `/api/generate/${currentProject.objectId}/${currentTemplate.objectId}/?json=${json}`;
    return request
    .get(url)
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${currentUser.sessionToken}`);
  };

  beforeEach((done) => {
    co(function*() {
      yield cleanup();
      currentUser = yield createUser();
      currentProject = yield createProject(currentUser, newProject);
      currentTemplate = yield createTemplate(currentUser, currentProject.objectId, newTemplate);
    }).then(done)
      .catch(done);
  });

  describe('WHEN making a request to generate the html template', () => {
    const json = JSON.stringify({title: 'Hello'});

    it('should make the request with success',
      (done) => getHtmlRequest(json).expect(200).end(done));

    describe('WHEN the request is done with success', () => {
      beforeEach((done) => getHtmlRequest(json)
        .end((err, res) => {
          if (err) return done(err);
          that.returnedHtml = res.body;
          return done();
        }));
      it('should have the expected html template',
        () => expect(that.returnedHtml).to.equal('<html> <head> </head> <body> <div>Hello<div> </body> </html>'));
    });
  });
});
