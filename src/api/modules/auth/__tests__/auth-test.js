import {expect} from 'chai';
import {request, cleanup} from './../../../supertest';

describe('authModule tests', () => {
  beforeEach((done) => {
    cleanup()
      .then(() => done())
      .catch(done);
  });

  it('getting myself should not work', (done) => {
    request.get('/api/user/me')
      .expect(401)
      .end(done);
  });

  describe('WHEN signing up', () => {

    describe('WHEN using a inexisting account', () => {
      let newAccount;
      let signUpRequest;

      beforeEach(() => {
        newAccount = {
          email: 'alina@mail.com',
          password: 'password'
        };
        signUpRequest = request.post('/api/auth/signup')
          .set('Content-type', 'application/json')
          .send(newAccount);
      });

      it('SHOULD create a new account', (done) => {
        signUpRequest.expect(200).end(done);
      });

      describe('WHEN sign up of non-existing account is finished', () => {
        let newUser;
        beforeEach((done) => {
          request.post('/api/auth/signup')
            .set('Content-type', 'application/json')
            .send(newAccount)
            .end((err, res) => {
               if(err) return done(err);

               newUser = res.body;
               done();
            });
        });


        it('SHOULD create an initial API key', () => {
          expect(newUser.apiAccessToken).not.to.be.undefined;
        });

        describe('WHEN trying to login', () => {
          it('SHOULD login successfully', (done) => {
            request.post('/api/auth/login')
              .set('Content-type', 'application/json')
              .send(newAccount)
              .expect(200)
              .end(done);
          });
        });

        describe('WHEN the account already exists', () => {
          let secondSignUpRequest;
          beforeEach(() => {
            secondSignUpRequest = request.post('/api/auth/signup')
              .set('Content-type', 'application/json')
              .send(newAccount);
          });

          it('SHOULD NOT create a new account', (done) => {
            secondSignUpRequest.expect(400).end(done);
          });
        });
      });
    });
  });
});




