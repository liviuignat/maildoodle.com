import co from 'co';
import {
  request,
  cleanup,
  createUser,
  loginRequest
} from './../../../supertest';

describe('userModule tests', () => {
  const that = {};
  const email = 'liviu@ignat.email';
  const password = 'password';
  that.getUserDataRequest = (user) => request
      .get('/api/user/me')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${user.authToken}`);

  that.updateUserDataRequest = (user) => request
    .put('/api/user/me')
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${user.authToken}`)
    .send(user);

  that.updateUserPasswordRequest = (user, password) => request
    .put('/api/user/me/password')
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${user.authToken}`)
    .send({password});

  beforeEach((done) => {
    co(function*() {
      yield cleanup();
      that.currentUser = yield createUser({email, password});
    }).then(done)
      .catch(done);
  });

  describe('WHEN requesting an update on the user\'s personal data', () => {
    it('SHOULD return status okay (200)',
      (done) => that.updateUserDataRequest(that.currentUser).expect(200).end(done));

    describe('WHEN update user request is finished', () => {
      beforeEach((done) => {
        that.currentUser.firstName = 'Alina';
        that.currentUser.lastName = 'Ignat';
        that.currentUser.companyName = 'gogule';

        that.updateUserDataRequest(that.currentUser).end((err,res) => {
          if(err) return done(err);
          that.updatedUser = res.body;
          done();
        });
      });

      it('SHOULD contain objectId',
        () => expect(that.updatedUser.objectId).toBeDefined());

      it('SHOULD update the user first name',
        () => expect(that.updatedUser.firstName).toEqual('Alina'));

      it('SHOULD update the user last name',
        () => expect(that.updatedUser.lastName).toEqual('Ignat'));

      it('SHOULD update the user company name',
        () => expect(that.updatedUser.companyName).toEqual('gogule'));

      describe('WHEN getting the user by id', () => {
        beforeEach(done => {
          that.getUserDataRequest(that.currentUser).end((err,res) => {
            if(err) return done(err);
            that.updatedUserGet = res.body;
            done();
          });
        });

        it('SHOULD have the same user as the update response',
          () => expect(that.updatedUserGet).toEqual(that.updatedUserGet));
      });
    });
  });

  describe('WHEN requesting an update on the user\'s password', () => {
    const newPassword = 'newUserPassword';

    it('SHOULD return status okay (200)',
      done => that.updateUserPasswordRequest(that.currentUser, newPassword).expect(200).end(done));

    describe('WHEN the update password request is finished', () => {
      beforeEach(done => that.updateUserPasswordRequest(that.currentUser, newPassword).end(done));

      it('SHOULD not be able to login with the old password',
        done => loginRequest(email, password).expect(400).end(done))

      it('SHOULD be able to login with the new password',
        done => loginRequest(email, newPassword).expect(200).end(done))
    });
  });

  describe('WHEN requesting a new api access token', () => {
    const newApiAccessTokenRequest = (user) => request
      .put('/api/user/me/apiaccesstoken')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${user.authToken}`);

    it('SHOULD return status okay (200)',
      (done) => newApiAccessTokenRequest(that.currentUser).expect(200).end(done));

    describe('WHEN update api token request is finished', () => {
      beforeEach((done) => newApiAccessTokenRequest(that.currentUser).end((err, res) => {
        if(err) return done(err);
        that.updatedUser = res.body;
        done();
      }));

      it('SHOULD have a user in the update response', () => {
        expect(that.updatedUser).toBeDefined();
        expect(that.updatedUser).not.toEqual(null);
      });

      it('SHOULD have an existing access token',
        () => expect(that.updatedUser.apiAccessToken).toBeDefined());

      it('SHOULD have a new api access',
        () => expect(that.updatedUser.apiAccessToken).not.toEqual(that.currentUser.apiAccessToken));
    });
  });
});
