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
    });
  });
});