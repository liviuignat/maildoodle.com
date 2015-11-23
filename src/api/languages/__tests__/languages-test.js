import {expect} from 'chai';
import {request, cleanup, createUser} from './../../supertest';

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
        request.post('/api/projects')
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

  describe('When interting a language', () => {
    let newLanguage = {
      name: 'Denglish',
      key: 'de-EN'
    };

    const createLanguageRequest = () => request
        .post(`/api/projects/${currentProject.objectId}/languages`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${currentUser.sessionToken}`)
        .send(newLanguage);

    it('Should create the language with success', (done) => {
      createLanguageRequest().expect(200).end(done);
    });

    describe('When language request is finished', () => {
      let createdLanguage;

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
        expect(createdLanguage.key).to.equal(newLanguage.key);
      });

      describe('When getting all languages', () => {
         let getAllLanguagesRequest = () => request
            .get(`/api/projects/${currentProject.objectId}/languages`)
            .set('Authorization', `Bearer ${currentUser.sessionToken}`);

        it('Should return success', (done) => {
          getAllLanguagesRequest().expect(200).end(done);
        });

        it('Should contain two languages', (done) => {
          getAllLanguagesRequest().end((err, response) => {
            if(err){
              return done(err);
            }
            expect(response.body.length).to.equal(2);
            return done();
          });
        });
      });
      describe('When getting the language by id', () => {
        const getLanguageByIdRequest = () => request
            .get(`/api/projects/${currentProject.objectId}/languages/${createdLanguage.objectId}`)
            .set('Authorization', `Bearer ${currentUser.sessionToken}`);

        it('Should return the language with success', (done) => {
           getLanguageByIdRequest().expect(200).end(done);
        });

        it('Should get the selected language with the right key', (done) => {
          getLanguageByIdRequest().end((err, response) => {
            if(err){
              return  done(err);
            }

            expect(response.body.key).to.equal(createdLanguage.key);
            return done();
          });

          describe('When the language does not exist', () => {
            const getBogusLanguageByIdRequest = () => request
              .get(`/api/projects/${currentProject.objectId}/languages/123`)
              .set('Authorization', `Bearer ${currentUser.sessionToken}`);

            it('Should return not found', (done) => {
              getBogusLanguageByIdRequest().expect(404).end(done);
            });
          });
        });
      });

      describe('When deleting a language', () => {
        const getDeletedLanguageRequest = () => request
            .get(`/api/projects/${currentProject.objectId}/languages/${createdLanguage.objectId}`)
            .set('Authorization', `Bearer ${currentUser.sessionToken}`);

        let deleteLanguageRequest = () => request
            .del(`/api/projects/${currentProject.objectId}/languages/${createdLanguage.objectId}`)
            .set('Authorization', `Bearer ${currentUser.sessionToken}`);

        it('Should return success', (done) => {
          deleteLanguageRequest().expect(200).end(done);
        });

        it('Should not find the language in the project', (done) => {
          deleteLanguageRequest().end(() => {
            getDeletedLanguageRequest().expect(404).end(done);
          });
        });
      });
    });
  });
});