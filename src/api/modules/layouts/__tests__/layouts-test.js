import {expect} from 'chai';
import {request, cleanup, createUser} from './../../../supertest';

describe('GIVEN layoutModule tests', () => {
  let currentUser;
  let currentProject = {name: 'New Project'};

  beforeEach((done) => {
    cleanup()
      .then(() => createUser())
      .then((user) => {
        currentUser = user
      })
      .then(() => {
        request
          .post('/api/projects')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${currentUser.sessionToken}`)
          .send(currentProject)
          .end((err, response) => {
            if (err) {
              return done(err)
            }
            currentProject = response.body;
            return done();
        })
      })
      .catch((err) => done(err));
  });

  describe('WHEN interting a layout', () => {
    let newLayout = {
      name: 'New Layout',
      value: '<html></html>'
    };

    const createLayoutRequest = () => request
      .post(`/api/projects/${currentProject.objectId}/layouts`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${currentUser.sessionToken}`)
      .send(newLayout);

    it('SHOULD create the layout with success', (done) => {
      createLayoutRequest().expect(200).end(done);
    });

    describe('WHEN layout request is finished', () => {
      let createdLayout;

      const getLayoutByIdRequest = () => request
        .get(`/api/projects/${currentProject.objectId}/layouts/${createdLayout.objectId}`)
        .set('Authorization', `Bearer ${currentUser.sessionToken}`);

      beforeEach((done) => {
        createLayoutRequest().end((err, response) => {
          if(err){
            return done(err);
          }

          createdLayout = response.body;
          return done();
        });
      });

      it('SHOULD contain the new layout', () => {
        expect(createdLayout.name).to.equal(newLayout.name);
      });

      describe('WHEN updating the layout', () => {
        let layoutUpdate = {
          name: "updated layout",
          value: "updated by me"
        };

        let updateLayoutRequest = (layoutId) => request
          .put(`/api/projects/${currentProject.objectId}/layouts/${layoutId}`)
          .set('Authorization', `Bearer ${currentUser.sessionToken}`)
          .set('Content-type', 'application/json')
          .send(layoutUpdate);

        it('SHOULD return success', (done) => {
          updateLayoutRequest(createdLayout.objectId).expect(200).end(done);
        });

        describe('WHEN update request is finished', () => {
          beforeEach((done) => updateLayoutRequest(createdLayout.objectId).end(done));

          it('SHOULD have the layout updated', (done) => {
            getLayoutByIdRequest().end((err, res) => {
              expect(res.body.name).to.equal(layoutUpdate.name);
              done(err);
            });
          })
        });
      });

      describe('WHEN getting all layouts', () => {
        let getAllLayoutsRequest = () => request
          .get(`/api/projects/${currentProject.objectId}/layouts`)
          .set('Authorization', `Bearer ${currentUser.sessionToken}`);

        it('SHOULD return success', (done) => {
          getAllLayoutsRequest().expect(200).end(done);
        });

        it('SHOULD contain two layouts', (done) => {
          getAllLayoutsRequest().end((err, response) => {
            if(err){
              return done(err);
            }
            expect(response.body.length).to.equal(2);
            return done();
          });
        });
      });
      describe('WHEN getting the layout by id', () => {
        it('SHOULD return the layout with success', (done) => {
           getLayoutByIdRequest().expect(200).end(done);
        });

        it('SHOULD get the selected layout with the right name', (done) => {
          getLayoutByIdRequest().end((err, response) => {
            if(err){
              return  done(err);
            }

            expect(response.body.name).to.equal(createdLayout.name);
            return done();
          });
        });

        describe('WHEN the layout does not exist', () => {
          const getBogusLayoutByIdRequest = () => request
            .get(`/api/projects/${currentProject.objectId}/layouts/123`)
            .set('Authorization', `Bearer ${currentUser.sessionToken}`);

          it('SHOULD return not found', (done) => {
            getBogusLayoutByIdRequest().expect(404).end(done);
          });
        });
      });

      describe('WHEN deleting a layout', () => {
        const getDeletedLayoutRequest = () => request
            .get(`/api/projects/${currentProject.objectId}/layouts/${createdLayout.objectId}`)
            .set('Authorization', `Bearer ${currentUser.sessionToken}`);

        let deleteLayoutRequest = () => request
            .del(`/api/projects/${currentProject.objectId}/layouts/${createdLayout.objectId}`)
            .set('Authorization', `Bearer ${currentUser.sessionToken}`);

        it('SHOULD return success', (done) => {
          deleteLayoutRequest().expect(200).end(done);
        });

        it('SHOULD not find the layout in the project', (done) => {
          deleteLayoutRequest().end(() => {
            getDeletedLayoutRequest().expect(404).end(done);
          });
        });
      });
    });
  });
});