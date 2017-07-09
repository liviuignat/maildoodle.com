import {request, cleanup, createUser} from './../../../supertest';

describe('languageModule tests', () => {
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
          .set('Authorization', `Bearer ${currentUser.authToken}`)
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

  describe('When interting a language', () => {
    let newLanguage = {
      name: 'Denglish',
      key: 'de-EN'
    };

    const createLanguageRequest = () => request
        .post(`/api/projects/${currentProject.objectId}/languages`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${currentUser.authToken}`)
        .send(newLanguage);

    it('Should create the language with success', (done) => {
      createLanguageRequest().expect(200).end(done);
    });

    describe('When language request is finished', () => {
      let createdLanguage;

      const getLanguageByIdRequest = () => request
        .get(`/api/projects/${currentProject.objectId}/languages/${createdLanguage.objectId}`)
        .set('Authorization', `Bearer ${currentUser.authToken}`);

      beforeEach((done) => {
        createLanguageRequest().end((err, response) => {
          if(err){
            return done(err);
          }

          createdLanguage = response.body;
          return done();
        });
      });

      it('Should contain the new language', () => {
        expect(createdLanguage.key).toEqual(newLanguage.key);
      });

      describe('When updating the language', () => {
        let languageUpdate = {
          key: "updated language",
          name: "updated by me"
        };

        let updateLanguageRequest = (languageId) => request
          .put(`/api/projects/${currentProject.objectId}/languages/${languageId}`)
          .set('Authorization', `Bearer ${currentUser.authToken}`)
          .set('Content-type', 'application/json')
          .send(languageUpdate);

        it('Should return success', (done) => {
          updateLanguageRequest(createdLanguage.objectId).expect(200).end(done);
        });

        describe('When update request is finished', () => {
          beforeEach((done) => updateLanguageRequest(createdLanguage.objectId).end(done));

          it('Should have the language updated', (done) => {
            getLanguageByIdRequest().end((err, res) => {
              expect(res.body.key).toEqual(languageUpdate.key);
              done(err);
            });
          })
        });
      });

      describe('When getting all languages', () => {
        let getAllLanguagesRequest = () => request
          .get(`/api/projects/${currentProject.objectId}/languages`)
          .set('Authorization', `Bearer ${currentUser.authToken}`);

        it('Should return success', (done) => {
          getAllLanguagesRequest().expect(200).end(done);
        });

        it('Should contain two languages', (done) => {
          getAllLanguagesRequest().end((err, response) => {
            if(err){
              return done(err);
            }
            expect(response.body.length).toEqual(2);
            return done();
          });
        });
      });
      describe('When getting the language by id', () => {
        it('Should return the language with success', (done) => {
           getLanguageByIdRequest().expect(200).end(done);
        });

        it('Should get the selected language with the right key', (done) => {
          getLanguageByIdRequest().end((err, response) => {
            if(err){
              return  done(err);
            }

            expect(response.body.key).toEqual(createdLanguage.key);
            return done();
          });
        });

        describe('When the language does not exist', () => {
          const getBogusLanguageByIdRequest = () => request
            .get(`/api/projects/${currentProject.objectId}/languages/123`)
            .set('Authorization', `Bearer ${currentUser.authToken}`);

          it('Should return not found', (done) => {
            getBogusLanguageByIdRequest().expect(404).end(done);
          });
        });
      });

      describe('When deleting a language', () => {
        const getDeletedLanguageRequest = () => request
            .get(`/api/projects/${currentProject.objectId}/languages/${createdLanguage.objectId}`)
            .set('Authorization', `Bearer ${currentUser.authToken}`);

        let deleteLanguageRequest = (objectId) => request
            .del(`/api/projects/${currentProject.objectId}/languages/${objectId}`)
            .set('Authorization', `Bearer ${currentUser.authToken}`);

        it('Should return success', (done) => {
          deleteLanguageRequest(createdLanguage.objectId).expect(200).end(done);
        });

        it('Should not find the language in the project', (done) => {
          deleteLanguageRequest(createdLanguage.objectId).end(() => {
            getDeletedLanguageRequest().expect(404).end(done);
          });
        });

        describe('WHEN the language does not exist', () => {
          it('SHOULD return an error', (done) => {
            deleteLanguageRequest(123).expect(400).end(done);
          });
        });

      });
    });
  });
});