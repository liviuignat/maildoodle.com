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

    describe('When getting the project', () => {
      let getProjectRequest;
      let addedProject;

      beforeEach ((done) => {
        getProjectRequest = request.get('/api/projects')
          .set('Authorization', `Bearer ${currentUser.sessionToken}`)

        createProjectRequest.end((err, response) => {
          if (err) return done(err);
          addedProject = response.body;
          return done();
        });
      });

      it('Should make the create project request with success', (done) =>  {
        getProjectRequest.expect(200).end(done);
      });

      it('Should contain the newly created project', (done) =>  {
        getProjectRequest.end((err, response) => {
          if(err){
            return done(err);
          }
          expect(response.body.length).to.equal(1);
          done();
        });
      });

      describe('When getting the project by id', () => {
        let getProjectByIdRequest;

        beforeEach(() => {
          getProjectByIdRequest = request.get('/api/projects/' + addedProject.objectId)
            .set('Authorization', `Bearer ${currentUser.sessionToken}`)
        });

        it('Should get the project with success', (done) => {
          getProjectByIdRequest.expect(200).end(done);
        });

        describe('When get by id request finished', () => {
          let loadedProject;

          beforeEach((done) => {
            getProjectByIdRequest.end((err, response) => {
              if(err){
                return done(err);
              }
              loadedProject = response.body;

              return done();
            });
          });

          it('Should have the same name', () => {
            expect(loadedProject.name).to.equal(addedProject.name);
          });

          it('Should have the same description', () => {
            expect(loadedProject.description).to.equal(addedProject.description);
          });
        });
      });

      describe('When delete a project',() => {
        let deleteProjectRequest;

        beforeEach(() => {
          deleteProjectRequest = request
            .del('/api/projects/' + addedProject.objectId)
            .set('Authorization', `Bearer ${currentUser.sessionToken}`);
        });

        it('Should delete the project with success', (done) =>  {
          deleteProjectRequest.expect(200).end(done);
        });

        it('Should delete the newly created project', (done) => {
          deleteProjectRequest.end((err, response) => {
            getProjectRequest.end((err, response) => {
              if(err){
                return done(err);
              }
              expect(response.body.length).to.equal(0);
              done();
            });
          });
        });
      });

      describe('When updating a project', () => {
        let updateProjectRequest;
        const updateValues = {
          name: 'updated name',
          description: 'updated description'
        }

        beforeEach(() => {
          updateProjectRequest = request
            .put('/api/projects/' + addedProject.objectId)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${currentUser.sessionToken}`)
            .send(updateValues);
        });

        it('Should update the project with success', (done) => {
          updateProjectRequest.expect(200).end(done);
        });

        describe('When update request finished', () => {
          let actualUpdatedProject;

          beforeEach((done) => {
            updateProjectRequest.end((err,response) => {
              getProjectRequest.end((err,response) => {
                if(err){
                  return done(err);
                }
                actualUpdatedProject = response.body[0];
                done();
              });
            });
          });

          it('Should update the project description', () => {
            expect(actualUpdatedProject.description).to.equal(updateValues.description);
          });

          it('Should update the project name', () => {
            expect(actualUpdatedProject.name).to.equal(updateValues.name);
          });
        });
      });
    });
  });
});