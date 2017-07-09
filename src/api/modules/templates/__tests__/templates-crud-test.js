import {
  request,
  cleanup,
  createUser,
  createProject,
  getTemplatesByProjectId
} from './../../../supertest';

describe('given we want to CRUD templates', () => {
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
    .set('Authorization', `Bearer ${currentUser.authToken}`);

  const getTemplateByIdRequest = (projectId, templateId) => request
      .get(`/api/projects/${projectId}/templates/${templateId}`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${currentUser.authToken}`);

  const addTemplateRequest = (projectId, template) => request
    .post(`/api/projects/${projectId}/templates`)
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${currentUser.authToken}`)
    .send(newTemplate);

  const updateTemplateRequest = (projectId, templateId, template) => {
    return request
    .put(`/api/projects/${projectId}/templates/${templateId}`)
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${currentUser.authToken}`)
    .send(template); }

  const deleteTemplateRequest = (projectId, templateId) => request
    .delete(`/api/projects/${projectId}/templates/${templateId}`)
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${currentUser.authToken}`);

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

  describe('WHEN adding a new template', () => {
    it('should make the request with success',
      (done) => addTemplateRequest(currentProject.objectId, newTemplate)
        .expect(200).end(done));

    describe('WHEN adding template is finished', () => {
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
        () => expect(firstAddedTemplate.name).toEqual(newTemplate.name));

      describe('WHEN getting the template by id', () => {
        it('should make the request with success',
          (done) => getTemplateByIdRequest(currentProject.objectId, firstAddedTemplate.objectId)
            .expect(200).end(done));

        describe('WHEN get template by id request is finished', () => {
          let retreivedTemplate = null;
          beforeEach((done) => getTemplateByIdRequest(currentProject.objectId, firstAddedTemplate.objectId).end((err, res) => {
            if (err) return done(err);
            retreivedTemplate = res.body;
            done();
          }));

          it('should have an object id',
            () => expect(retreivedTemplate.objectId).toBeDefined());

          it('should have the correct name',
            () => expect(retreivedTemplate.name).toEqual(newTemplate.name));

          it('should have the correct description',
            () => expect(retreivedTemplate.description).toEqual(newTemplate.description));

          it('templated should have a version',
            () => expect(retreivedTemplate.versions.length).toEqual(1));

          describe('WHEN adding a layout', () => {
            let layout = {
              name: 'New Layout',
              value: '<html></html>'
            };

            const createLayoutRequest = () => request
              .post(`/api/projects/${currentProject.objectId}/layouts`)
              .set('Content-type', 'application/json')
              .set('Authorization', `Bearer ${currentUser.authToken}`)
              .send(layout);

            let updateLayoutRequest = (objectId) => request
              .put(`/api/projects/${currentProject.objectId}/layouts/${objectId}`)
              .set('Authorization', `Bearer ${currentUser.authToken}`)
              .set('Content-type', 'application/json')
              .send(layout);

            let deleteLayoutRequest = (objectId) => request
              .del(`/api/projects/${currentProject.objectId}/layouts/${objectId}`)
              .set('Authorization', `Bearer ${currentUser.authToken}`);

            beforeEach((done) => {
              createLayoutRequest().end((err, response) => {
                if(err) return done(err);
                layout = response.body;
                return done();
              });
            });

            describe('WHEN the layout is updated', () => {
              beforeEach(done => updateLayoutRequest(layout.objectId).end(done));
              beforeEach((done) => getTemplateByIdRequest(currentProject.objectId, firstAddedTemplate.objectId).end((err, res) => {
                if (err) return done(err);
                retreivedTemplate = res.body;
                done();
              }));

              it('SHOULD have a version in the versions list',
                () => expect(retreivedTemplate.versions.length).toEqual(1));
            });

            describe('WHEN the layout is deleted', () => {
              beforeEach(done => deleteLayoutRequest(layout.objectId).end(done));
              beforeEach((done) => getTemplateByIdRequest(currentProject.objectId, firstAddedTemplate.objectId).end((err, res) => {
                if (err) return done(err);
                retreivedTemplate = res.body;
                done();
              }));

              it('SHOULD have a version in the versions list',
                () => expect(retreivedTemplate.versions.length).toEqual(1));
            });
          });

          describe('WHEN adding a language', () => {
            let language = {
              name: 'Denglish',
              key: 'de-EN'
            };

            const createLanguageRequest = () => request
              .post(`/api/projects/${currentProject.objectId}/languages`)
              .set('Content-type', 'application/json')
              .set('Authorization', `Bearer ${currentUser.authToken}`)
              .send(language);

            let updateLanguageRequest = (objectId) => request
              .put(`/api/projects/${currentProject.objectId}/languages/${objectId}`)
              .set('Authorization', `Bearer ${currentUser.authToken}`)
              .set('Content-type', 'application/json')
              .send(language);

            let deleteLanguageRequest = (objectId) => request
              .del(`/api/projects/${currentProject.objectId}/languages/${objectId}`)
              .set('Authorization', `Bearer ${currentUser.authToken}`);

            beforeEach((done) => {
              createLanguageRequest().end((err, response) => {
                if(err) return done(err);
                language = response.body;
                return done();
              });
            });

            describe('WHEN the language is updated', () => {
              beforeEach(done => updateLanguageRequest(language.objectId).end(done));
              beforeEach((done) => getTemplateByIdRequest(currentProject.objectId, firstAddedTemplate.objectId).end((err, res) => {
                if (err) return done(err);
                retreivedTemplate = res.body;
                done();
              }));

              it('SHOULD have a version in the versions list',
                () => expect(retreivedTemplate.versions.length).toEqual(1));
            });

            describe('WHEN the language is deleted', () => {
              beforeEach(done => deleteLanguageRequest(language.objectId).end(done));
              beforeEach((done) => getTemplateByIdRequest(currentProject.objectId, firstAddedTemplate.objectId).end((err, res) => {
                if (err) return done(err);
                retreivedTemplate = res.body;
                done();
              }));

              it('SHOULD have a version in the versions list',
                () => expect(retreivedTemplate.versions.length).toEqual(1));
            });
          });
        });
      });

      describe('WHEN getting all the templates', () => {
        beforeEach((done) => getTemplatesByProjectId(currentUser, currentProject.objectId)
          .then((templates) => { currentProject.templates = templates; })
          .then(done)
          .catch(done));

        it('should have one template',
          () => expect(currentProject.templates.length).toEqual(1));

        it('should have the name',
          () => expect(currentProject.templates[0].name).toEqual(newTemplate.name));

        it('should have the description',
          () => expect(currentProject.templates[0].description).toEqual(newTemplate.description));
      });

      describe('WHEN updating the template', () => {
        const updatedTemplate = {
          name: 'updated template',
          description: 'updated template description'
        };

        it('should make the request with success',
          (done) => updateTemplateRequest(currentProject.objectId, firstAddedTemplate.objectId, updatedTemplate)
            .expect(200).end(done));

        describe('WHEN getting all the templates', () => {
          beforeEach((done) => updateTemplateRequest(currentProject.objectId, firstAddedTemplate.objectId, updatedTemplate)
              .end(done));

          beforeEach((done) => getTemplatesByProjectId(currentUser, currentProject.objectId)
            .then((templates) => { currentProject.templates = templates; })
            .then(done)
            .catch(done));

          it('should have one template',
            () => expect(currentProject.templates.length).toEqual(1));

          it('should have the name',
            () => expect(currentProject.templates[0].name).toEqual(updatedTemplate.name));

          it('should have the description',
            () => expect(currentProject.templates[0].description).toEqual(updatedTemplate.description));
        });
      });

      describe('WHEN deleting a template', () => {
        it('should make the request with success',
          (done) => deleteTemplateRequest(currentProject.objectId, firstAddedTemplate.objectId)
            .expect(200).end(done));

        describe('WHEN request is complete', () => {
          beforeEach((done) => deleteTemplateRequest(currentProject.objectId, firstAddedTemplate.objectId)
            .end(done));

          it('should not have the template in the list anymore', (done) => {
            getTemplatesByProjectId(currentUser, currentProject.objectId)
              .then((templates) => {
                expect(templates.length).toEqual(0);
                done();
              })
              .catch(done);
          });
        });
      });
    });
  });
});
