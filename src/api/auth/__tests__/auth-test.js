import {expect} from 'chai';
import {request, cleanup} from './../../supertest';

describe('authModule tests', () => {
  beforeEach((done) => {
    cleanup().then(() => done());
  });

  it('getting myself should not work', (done) => {
    request.get('/api/user/me')
      .expect(401)
      .end(done);
  });

  describe('When signing up', () => {

    describe('with a non-existing account', () => {
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

      it('should create a new account', (done) => {
        signUpRequest.expect(200).end(done);
      });

      describe('When trying to login', () => {
        it('should login successfully', (done) => {
          request.post('/api/auth/login')
            .set('Content-type', 'application/json')
            .send(newAccount)
            .expect(200)
            .end(done);
        });
      });

      describe('When the account already exists', () => {
        let secondSignUpRequest;
        beforeEach((done) => {
          secondSignUpRequest = request.post('/api/auth/signup')
            .set('Content-type', 'application/json')
            .send(newAccount);

          request.post('/api/auth/signup')
            .set('Content-type', 'application/json')
            .send(newAccount)
            .end(done);
        });

        it('should NOT create a new account', (done) => {
          secondSignUpRequest.expect(400).end(done);
        });
      });
    });
  });

});




