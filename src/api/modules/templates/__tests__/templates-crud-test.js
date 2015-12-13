import {expect} from 'chai';
import {
  request,
  cleanup,
  createUser,
  createProject,
  getTemplatesByProjectId
} from './../../../supertest';

describe('given we want to modify templates', () => {
  let currentUser;
  let currentProject;

  const newProject = {
    name: 'new project',
    description: 'new project description'
  };

  const newTemplate = {
    name: 'new template',
    description: 'new template description'
  };

  const getTemplatesRequest = (projectId) => request
    .get(`/api/projects/${projectId}/templates`)
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${currentUser.sessionToken}`);

  const addTemplateRequest = (projectId, template) => request
    .post(`/api/projects/${projectId}/templates`)
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${currentUser.sessionToken}`)
    .send(newTemplate);

  const updateTemplateRequest = (projectId, templateId, template) => {
    return request
    .put(`/api/projects/${projectId}/templates/${templateId}`)
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${currentUser.sessionToken}`)
    .send(template); }

  const deleteTemplateRequest = (projectId, templateId) => request
    .delete(`/api/projects/${projectId}/templates/${templateId}`)
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${currentUser.sessionToken}`);

  beforeEach((done) => {
    cleanup()
      .then(() => createUser())
      .then((user) => { currentUser = user; })
      .then(() => createProject(currentUser, newProject))
      .then((project) => { currentProject = project })
      .then(() => { done(); })
      .catch((err) => { done(err); });
  });

  it('should not have any template',
    (done) => getTemplatesRequest(currentProject.objectId).expect(200).end(done));

  describe('when adding a new template', () => {
    it('should make the request with success',
      (done) => addTemplateRequest(currentProject.objectId, newTemplate)
        .expect(200).end(done));

    describe('when adding template is finished', () => {
      let firstAddedTemplate = null;
      beforeEach((done) => {
        addTemplateRequest(currentProject.objectId, newTemplate)
          .end((err, res) => {
            if (err) return done(err);
            firstAddedTemplate = res.body;
            done();
          });
      });

      it('templated should have the same name',
          () => expect(firstAddedTemplate.name).to.equal(newTemplate.name));

      describe('when getting the template by id', () => {
        beforeEach((done) => getTemplatesByProjectId(currentUser, currentProject.objectId)
          .then((templates) => { currentProject.templates = templates; })
          .then(done)
          .catch(done));

        it('should have one template',
          () => expect(currentProject.templates.length).to.equal(1));

        it('should have the name',
          () => expect(currentProject.templates[0].name).to.equal(newTemplate.name));

        it('should have the description',
          () => expect(currentProject.templates[0].description).to.equal(newTemplate.description));
      });

      describe('when updating the template', () => {
        const updatedTemplate = {
          name: 'updated template',
          description: 'updated template description'
        };

        it('should make the request with success',
          (done) => updateTemplateRequest(currentProject.objectId, firstAddedTemplate.objectId, updatedTemplate)
            .expect(200).end(done));

        describe('when getting the template by id', () => {
          beforeEach((done) => updateTemplateRequest(currentProject.objectId, firstAddedTemplate.objectId, updatedTemplate)
              .end(done));

          beforeEach((done) => getTemplatesByProjectId(currentUser, currentProject.objectId)
            .then((templates) => { currentProject.templates = templates; })
            .then(done)
            .catch(done));

          it('should have one template',
            () => expect(currentProject.templates.length).to.equal(1));

          it('should have the name',
            () => expect(currentProject.templates[0].name).to.equal(updatedTemplate.name));

          it('should have the description',
            () => expect(currentProject.templates[0].description).to.equal(updatedTemplate.description));
        });
      });

      describe('when deleting a template', () => {
        it('should make the request with success',
          (done) => deleteTemplateRequest(currentProject.objectId, firstAddedTemplate.objectId)
            .expect(200).end(done));

        describe('when request is complete', () => {
          beforeEach((done) => deleteTemplateRequest(currentProject.objectId, firstAddedTemplate.objectId)
            .end(done));

          it('should not have the template in the list anymore', (done) => {
            getTemplatesByProjectId(currentUser, currentProject.objectId)
              .then((templates) => {
                expect(templates.length).to.equal(0);
                done();
              })
              .catch(done);
          });
        });
      });
    });
  });
});
