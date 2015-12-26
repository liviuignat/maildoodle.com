import {expect} from 'chai';
import co from 'co';
import {
  request,
  cleanup,
  createUser,
  createProject,
  getTemplatesByProjectId
} from './../../../supertest';
import {getTemplateVersionsByTemplateId} from './../templateVersions';

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

  const getTemplateByIdRequest = (projectId, templateId) => request
      .get(`/api/projects/${projectId}/templates/${templateId}`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${currentUser.sessionToken}`);

  const addTemplateRequest = (projectId, template) => request
    .post(`/api/projects/${projectId}/templates`)
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${currentUser.sessionToken}`)
    .send(newTemplate);

  const deleteTemplateRequest = (projectId, templateId) => request
    .delete(`/api/projects/${projectId}/templates/${templateId}`)
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${currentUser.sessionToken}`);

  const updateTemplateDevVersionRequest = (projectId, templateId, data) => {
    const url = `/api/projects/${projectId}/templates/${templateId}/versions/development`;
    return request
      .post(url)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${currentUser.sessionToken}`)
      .send(data);
  }

  const addVersionToProdRequest = (projectId, templateId, data) => {
    const url = `/api/projects/${projectId}/templates/${templateId}/versions/production`;
    return request
      .post(url)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${currentUser.sessionToken}`)
      .send(data);
  }

  const getVersionRequest = (projectId, templateId, versionId) => {
    const url = `/api/projects/${projectId}/templates/${templateId}/versions/${versionId}`;
    return request
      .get(url)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${currentUser.sessionToken}`);
  }

  const updateVersionToProdRequest = (projectId, templateId, versionId) => {
    const url = `/api/projects/${projectId}/templates/${templateId}/versions/${versionId}`;
    return request
      .put(url)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${currentUser.sessionToken}`);
  }

  beforeEach((done) => {
    co(function*() {
      yield cleanup();
      currentUser = yield createUser();
      currentProject = yield createProject(currentUser, newProject);
    }).then(() => { done(); })
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
        () => expect(firstAddedTemplate.name).to.equal(newTemplate.name));

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
            () => expect(retreivedTemplate.objectId).not.to.be.undefined);

          it('should have the correct name',
            () => expect(retreivedTemplate.name).to.equal(newTemplate.name));

          it('should have the correct description',
            () => expect(retreivedTemplate.description).to.equal(newTemplate.description));

          it('should have the one development version property`',
            () => expect(retreivedTemplate.developmentVersion).not.to.be.undefined);

          it('should have the default html development version `<div><%= model.title %><div>`',
            () => expect(retreivedTemplate.developmentVersion.html).to.equal('<div><%= model.title %><div>'));

          it('should have the sample json development version `{title: \'Welcome!\'}`',
            () => expect(retreivedTemplate.developmentVersion.sampleJson).to.equal('{title: \'Welcome\'}'));

          it('should have the one template version in versions array`',
            () => expect(retreivedTemplate.versions.length).to.equal(1));

          it('should have the default html in the first version `<div><%= model.title %><div>`',
            () => expect(retreivedTemplate.versions[0].html).to.equal('<div><%= model.title %><div>'));

          it('should have the sample json in the first version `{title: \'Welcome!\'}`',
            () => expect(retreivedTemplate.versions[0].sampleJson).to.equal('{title: \'Welcome\'}'));
        });
      });

      describe('WHEN updating development template', () => {
        const devVersion = {
          html: 'new html',
          sampleJson: 'new sample json'
        };

        it('Should return 200',
          (done) => updateTemplateDevVersionRequest(currentProject.objectId, firstAddedTemplate.objectId, devVersion)
            .expect(200).end(done));

        describe('WHEN getting the template by id', () => {
          let retreivedTemplate = null;
          beforeEach((done) => updateTemplateDevVersionRequest(currentProject.objectId, firstAddedTemplate.objectId, devVersion)
            .end(done));

          beforeEach((done) => getTemplateByIdRequest(currentProject.objectId, firstAddedTemplate.objectId).end((err, res) => {
            if (err) return done(err);
            retreivedTemplate = res.body;
            done();
          }));

          it('should have the updated dev version html',
            () => expect(retreivedTemplate.developmentVersion.html).to.equal(devVersion.html));

          it('should have the updated dev version sample json',
            () => expect(retreivedTemplate.developmentVersion.sampleJson).to.equal(devVersion.sampleJson));
        });
      });

      describe('WHEN commiting a version to production', () => {
        const prodVersion = {
          html: 'new version of html',
          sampleJson: 'new version json',
          commitMessage: 'new update to production'
        };

        it('Should return 200',
          (done) => addVersionToProdRequest(currentProject.objectId, firstAddedTemplate.objectId, prodVersion)
            .expect(200).end(done));

        describe('WHEN getting the template by id', () => {
          let retreivedTemplate = null;
          beforeEach((done) => addVersionToProdRequest(currentProject.objectId, firstAddedTemplate.objectId, prodVersion)
            .end(done));

          beforeEach((done) => getTemplateByIdRequest(currentProject.objectId, firstAddedTemplate.objectId).end((err, res) => {
            if (err) return done(err);
            retreivedTemplate = res.body;
            done();
          }));

          it('should have 2 versions',
            () => expect(retreivedTemplate.versions.length).to.equal(2));

          it('should have initial html in first version',
            () => expect(retreivedTemplate.versions[0].html).to.equal('<div><%= model.title %><div>'));

          it('should have `new version of html` in second version html',
            () => expect(retreivedTemplate.versions[1].html).to.equal('new version of html'));

          it('should have `new version json` in second version sample json',
            () => expect(retreivedTemplate.versions[1].sampleJson).to.equal('new version json'));

          it('should have `new update to production` in second version commit message',
            () => expect(retreivedTemplate.versions[1].commitMessage).to.equal('new update to production'));
        });
      });

      describe('WHEN commiting 5 new versions to production', () => {
        let retreivedTemplate = null;
        const prodVersion = (index) => {
          return {
            html: 'new version of html' + index,
            sampleJson: 'new version json' + index,
            commitMessage: 'new update to production' + index
          };
        };

        beforeEach((done) => addVersionToProdRequest(currentProject.objectId, firstAddedTemplate.objectId, prodVersion(1))
          .end(done));
        beforeEach((done) => addVersionToProdRequest(currentProject.objectId, firstAddedTemplate.objectId, prodVersion(2))
          .end(done));
        beforeEach((done) => addVersionToProdRequest(currentProject.objectId, firstAddedTemplate.objectId, prodVersion(3))
          .end(done));
        beforeEach((done) => addVersionToProdRequest(currentProject.objectId, firstAddedTemplate.objectId, prodVersion(4))
          .end(done));
        beforeEach((done) => addVersionToProdRequest(currentProject.objectId, firstAddedTemplate.objectId, prodVersion(5))
          .end(done));

        beforeEach((done) => getTemplateByIdRequest(currentProject.objectId, firstAddedTemplate.objectId).end((err, res) => {
          if (err) return done(err);
          retreivedTemplate = res.body;
          done();
        }));

        it('should have 6 versions',
          () => expect(retreivedTemplate.versions.length).to.equal(6));

        describe('WHEN deleting the template', () => {
          let existingTemplateVersions = [];
          beforeEach((done) => deleteTemplateRequest(currentProject.objectId, firstAddedTemplate.objectId)
            .end(done));

          beforeEach((done) => getTemplateVersionsByTemplateId(retreivedTemplate.objectId)
            .then((versions) => {
              existingTemplateVersions = versions;
              done();
            }).catch(done));

          it('should not have the template in the list anymore', (done) => {
            getTemplatesByProjectId(currentUser, currentProject.objectId)
              .then((templates) => {
                expect(templates.length).to.equal(0);
                done();
              })
              .catch(done);
          });

          it('should not have any template version anymore',
            () => expect(existingTemplateVersions.length).to.equal(0));
        });

        describe('WHEN getting the 3d version', () => {
          let version;
          beforeEach(() => version = retreivedTemplate.versions[2]);

          it('should return a 200 status code',
            (done) => getVersionRequest(currentProject.objectId, firstAddedTemplate.objectId, version.objectId)
              .expect(200).end(done));

          describe('WHEN getting the version is finished', () => {
            let requestTemplate;
            beforeEach((done) => getVersionRequest(currentProject.objectId, firstAddedTemplate.objectId, version.objectId)
              .end((err, res) => {
                if (err) return done(err);
                requestTemplate = res.body;
                done();
              }));

            it('should have correct html',
              () => expect(requestTemplate.html).to.equal(version.html));

            it('should have correct sampleJson',
              () => expect(requestTemplate.sampleJson).to.equal(version.sampleJson));
          });
        });

        describe('WHEN the 3d version is promoted to production', () => {
          let version;
          beforeEach(() => version = retreivedTemplate.versions[2]);

          it('should return a 200 status code',
            (done) => updateVersionToProdRequest(currentProject.objectId, firstAddedTemplate.objectId, version.objectId)
              .expect(200).end(done));

          describe('WHEN the promote request is finished', () => {
            let template;
            beforeEach((done) => updateVersionToProdRequest(currentProject.objectId, firstAddedTemplate.objectId, version.objectId)
              .end(done));

            beforeEach((done) => getTemplateByIdRequest(currentProject.objectId, firstAddedTemplate.objectId).end((err, res) => {
              if (err) return done(err);
              template = res.body;
              done();
            }));

            it('should have production set to true',
              () => expect(template.versions[2].isProduction).to.equal(true));

            describe('WHEN the 4d version is promoted to production', () => {
              let version;
              let template;
              beforeEach(() => version = retreivedTemplate.versions[3]);

              beforeEach((done) => updateVersionToProdRequest(currentProject.objectId, firstAddedTemplate.objectId, version.objectId)
                  .end(done));

              beforeEach((done) => getTemplateByIdRequest(currentProject.objectId, firstAddedTemplate.objectId).end((err, res) => {
                if (err) return done(err);
                template = res.body;
                done();
              }));

              it('should have the 3d version is production set to false',
                () => expect(template.versions[2].isProduction).to.equal(false));

              it('should have production set to true',
                () => expect(template.versions[3].isProduction).to.equal(true));
            });
          });
        });
      });
    });
  });
});
