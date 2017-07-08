import co from 'co';
import {request, cleanup, createUser, createTemplate} from './../../../supertest';

describe('projectModule tests', () => {
  let currentUser;
  let addedProject;
  let newProject = {
    name: 'new project',
    description: 'new project description'
  };

  const createProjectRequest = () => request.post('/api/projects')
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${currentUser.authToken}`)
    .send(newProject);

  const getProjectByIdRequest = () => request.get(`/api/projects/${addedProject.objectId}`)
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${currentUser.authToken}`);

  beforeEach((done) => {
    co(function*() {
      yield cleanup();
      currentUser = yield createUser();
    }).then(done)
      .catch(done);
  });

  describe('WHEN inserting a project', () => {
    beforeEach((done) => {
      addedProject = undefined;
      createProjectRequest().end((err, res) => {
        if (err) {
          return done(err);
        }
        addedProject = res.body;
        return done();
      });
    });

    it('SHOULD make the request with success', () => {
      expect(addedProject).toBeDefined();
    });

    describe('WHEN getting the project by id', () => {
      let project;
      beforeEach((done) => {
        getProjectByIdRequest().end((err, res) => {
          if (err) {
            return done(err);
          }
          project = res.body;
          return done();
        });
      });

      it('SHOULD make the request with success', () => {
        expect(project).toBeDefined();
      });

      it('SHOULD contain the same name', () => {
        expect(project.name).toEqual(newProject.name);
      });

      it('SHOULD contain an empty email templates list', () => {
        expect(project.templates).toEqual([]);
      });

      it('SHOULD contain item in languages list', () => {
        expect(project.languages.length).toEqual(1);
      });

      it('SHOULD contain one item layouts list', () => {
        expect(project.layouts.length).toEqual(1);
      });
    });

    describe('WHEN getting the project by id with templates and layouts html', () => {
      let project = null;

      beforeEach((done) => createTemplate(currentUser, addedProject.objectId, {
        name: 'new template',
        description: 'new template description'
      }).then(() => done())
        .catch(done));

      beforeEach((done) => {
        request.get(`/api/projects/${addedProject.objectId}?with_template_html=true&with_layout_html=true`)
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${currentUser.authToken}`)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            project = res.body;
            return done();
          });
      });

      it('SHOULD have the template html on the developmentVersion property', () => {
        expect(project.templates[0].developmentVersion).toBeDefined();
      });

      it('SHOULD contain the layout html', () => {
        expect(project.layouts[0].value).toBeDefined();
      });
    });
  });
});