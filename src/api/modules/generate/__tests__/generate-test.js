import co from 'co';
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
    const url = `/api/projects/${currentProject.objectId}/templates/${currentTemplate.objectId}/generate?json=${json}`;
    return request
      .get(url)
      .set('Content-type', 'text/html')
      .set('Authorization', `Bearer ${currentUser.authToken}`);
  };

  const postHtmlRequest = (json) => {
    const url = `/api/projects/${currentProject.objectId}/templates/${currentTemplate.objectId}/generate`;
    const payload = {json};
    return request
      .post(url)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${currentUser.authToken}`)
      .send(payload);
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

  describe('WHEN making a GET request to generate the html template preview', () => {
    const json = JSON.stringify({title: 'Hello'});

    it('should make the request with success',
      (done) => getHtmlRequest(json).expect(200).end(done));

    describe('WHEN the request is done with success', () => {
      beforeEach((done) => getHtmlRequest(json)
        .end((err, res) => {
          if (err) return done(err);
          that.returnedHtml = res.text;
          return done();
        }));
      it('should have the expected html template',
        () => expect(that.returnedHtml).toEqual('<html> <head> </head> <body> <div>Hello<div> </body> </html>'));
    });
  });

  describe('WHEN making a POST request to generate the html template from the API', () => {
    const json = {title: 'Hello'};

    it('should make the request with success',
      (done) => postHtmlRequest(json).expect(200).end(done));

    describe('WHEN the request is done with success', () => {
      beforeEach((done) => postHtmlRequest(json)
        .end((err, res) => {
          if (err) return done(err);
          that.returnedHtml = res.text;
          return done();
        }));
      it('should have the expected html template',
        () => expect(that.returnedHtml).toEqual('<html> <head> </head> <body> <div>Hello<div> </body> </html>'));
    });
  });
});
