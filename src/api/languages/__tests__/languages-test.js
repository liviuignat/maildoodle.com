import {expect} from 'chai';
import {request, cleanup, createUser} from './../../supertest';

describe('languageModule tests', () => {
  let currentUser;
  let currentProject;

  beforeEach(() => {
    cleanup()
      .then(() => createUser())
      .then((user) => {
        currentUser = user
      })
      .then((done) => {
        request.post('/api/projects')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${currentUser.sessionToken}`)
          .send(newProject)
          .end((err, response) => {
            if (err) {
              return done(err)
            }
            currentProject = response.body;
            return done();
        })
      })
      .catch((err) => {done(err)});
  });

  describe('When interting a language', () => {
    let newLanguage = {
      name: 'Denglish',
      key: 'de-EN'
    };

    let createLanguageRequest;
    let createdLanguage;

    beforeEach(() => {
      createLanguageRequest = () => request
        .post(`/api/projects/${currentProject.objectId}/languages`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${currentUser.sessionToken}`)
        .send(newLanguage);

    });

    it('Should create the language with success', (done) => {
      createLanguageRequest.expect(200).end(done);
    });

    it('Should contain the new language', (done) => {
      createLanguageRequest.end((err, response) => {
        if(err){
          return done(err);
        }

        createdLanguage = response.body;
        return done();
      });

      expect(createdLanguage.key).to.equal(newLanguage.key);
    });
  });
});